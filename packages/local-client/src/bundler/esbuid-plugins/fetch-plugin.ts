import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "fileCache",
});

// eslint-disable-next-line import/prefer-default-export
export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      // eslint-disable-next-line consistent-return
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedFile = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cachedFile) return cachedFile;
      });

      // eslint-disable-next-line consistent-return
      build.onLoad({ filter: /^index\.js$/ }, async (args: any) => {
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: inputCode,
          };
        }
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const {
          data,
          request: { responseURL },
        } = await axios.get(args.path);

        const requestedFile: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", responseURL).pathname,
        };

        await fileCache.setItem(args.path, requestedFile);

        return requestedFile;
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const {
          data,
          request: { responseURL },
        } = await axios.get(args.path);

        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
        `;

        const requestedFile: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", responseURL).pathname,
        };

        await fileCache.setItem(args.path, requestedFile);

        return requestedFile;
      });
    },
  };
};
