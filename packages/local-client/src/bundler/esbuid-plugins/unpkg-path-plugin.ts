import * as esbuild from "esbuild-wasm";

// eslint-disable-next-line import/prefer-default-export
export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // Handle root index.js file
      build.onResolve({ filter: /^index\.js$/ }, (args: any) => {
        return {
          path: args.path,
          namespace: "a",
        };
      });

      // Handle relatives paths in a module
      build.onResolve({ filter: /^\.+\// }, async (args: any) => {
        return {
          path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
          namespace: "a",
        };
      });

      // Handle root module file of a index.js file
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: "a",
        };
      });
    },
  };
};
