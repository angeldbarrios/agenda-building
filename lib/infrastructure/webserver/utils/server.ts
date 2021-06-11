import { Express } from 'express';
import { Server } from 'net';
import environment from '../../config/environment';

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export async function createServer(app: Express) {
  let server: Server;

  if (environment.server.HTTPS === true) {
    const https = await import('https');
    server = https.createServer(
      {
        key: fs.readFileSync(path.join(environment.server.KEY)),
        cert: fs.readFileSync(path.join(environment.server.CERT)),
      },
      app,
    );
  } else {
    const http = await import('http');
    server = http.createServer(app);
  }

  return server;
}

export async function onServerReadyHandler(port: Number | String) {
  const protocol = environment.server.HTTPS === true ? 'HTTPS' : 'HTTP';
  const message1 = `Server in ${environment.NODE_ENV} mode over ${protocol}`;
  const message2 =
    `################################################ \n` +
    `🛡️  Server listening on port: ${port} 🛡️ \n` +
    `################################################`;

  console.log(chalk.bold.yellow(message1));
  console.log(chalk.bold.green(message2));
}
