import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createCellsRouter } from './routes';

export const serve = (port: number, filename: string, dir: string, isUseProxy: boolean) => {
  const app = express();

  app.use(createCellsRouter(filename, dir));

  if (isUseProxy) {
    app.use(createProxyMiddleware({
      target: 'http://localhost:3000',
      ws: true,
      logLevel: "silent"
    }))
  } else {
    const staticPathName = require.resolve('@js-run-in-browser/local-client/build/index.html')
    app.use(express.static(path.join(path.dirname(staticPathName))))
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  })
}