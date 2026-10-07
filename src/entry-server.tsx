import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// @ts-ignore
import { Writable } from 'stream';
import App from './App';

export function render(url: string, context: any): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    const stream = renderToPipeableStream(
      <React.StrictMode>
        <HelmetProvider context={context}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </React.StrictMode>,
      {
        onAllReady() {
          const writable = new Writable({
            write(chunk: any, _encoding: any, callback: any) {
              body += chunk.toString();
              callback();
            },
          });
          writable.on('finish', () => resolve(body));
          stream.pipe(writable as any);
        },
        onError(err) {
          console.error(err);
          reject(err);
        }
      }
    );
  });
}
