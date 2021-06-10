
import { Server } from 'net';
import environment from '../../config/environment';

async function getServer(app) {
  let server: Server;
  if (environment.server.HTTPS === true) {
    /** Servidor inicia con https */
    const fs = await import('fs');
    const https = await import('https');
    const path = await import('path');
    
    server = https.createServer(
      {
        key: fs.readFileSync(path.join(environment.server.KEY)),
        cert: fs.readFileSync(path.join(environment.server.CERT)),
      },
      app
    );
  } else {
    const http = await import("http");
    server = http.createServer(app);
  }
  return server;
}

export default getServer;