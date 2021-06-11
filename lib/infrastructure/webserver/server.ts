import { AppContext } from '../../domain/types/appContext';
import environment from '../config/environment';

import getApp from './app';
import { createServer, onServerReadyHandler } from './utils/server';

async function initServer(appContext: AppContext) {
  // appContext.errors = {
  //   exceptions: { PublicError },
  //   constants: serverConstants,
  // };

  const app = getApp(appContext);
  const port = environment.server.PORT || 3000;
  const server = await createServer(app);
  server.listen(port, function () {
    onServerReadyHandler(port);
  });
}

export default initServer;
