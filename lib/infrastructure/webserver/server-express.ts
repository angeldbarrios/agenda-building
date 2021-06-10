import { AppContext } from "../../domain/types/appContext";

import express from "express";
import environment from '../config/environment';

// Middlewares
import hpp from 'hpp';
import helmet from "helmet";
import nocache from 'nocache';
import bodyParser from 'body-parser';
import cors from "cors";
import session from 'express-session';

import requestLimiter from './middlewares/requestLimiterMiddleware';
import routesLoader from "./routes-loader";

// import helmetSegurityPolicyHeaderConf from './utils/getHelmetSegurityPolicy';
import createServer from './utils/createServer';

import appErrorManager from './errors/appErrorManager';
import error404Manager from './errors/404ErrorManager';

import { PublicError } from './errors/exceptions';
import serverConstants from './server-constants';

import onServerListening from './utils/onServerListening';


async function initServer(appContext: AppContext) {
  // Agregar error y constantes del servidor
  // al contexto
  appContext.errors = {
    exceptions: { PublicError },
    constants: serverConstants
  };

  const app = express();
  const port = environment.server.PORT || 3000;
  const server = await createServer(app);

  /** Global Middlewares */
  app.use(helmet({
    frameguard: { action: 'deny' },
  }));
  app.use(nocache());
  app.use(hpp());
  app.use(cors());
  app.use(requestLimiter()); // Limitar peticiones
  
  // app.use(bodyParser.raw({ limit: 0, type: '*/*' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(session({
    name: 'sss_id',
    secret: 'environment.SESSION_SECRET_KEY',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: environment.server.HTTPS, httpOnly: true, maxAge: 3600000, sameSite: true },
  }));
  
  /** Routes */
  app.use("/api", routesLoader(appContext));

  /** 404 errors */
  app.use(error404Manager);

  /** Manejo de errores */
  app.use(appErrorManager);

  server.listen(port, onServerListening(port));
  return server;
}

export default initServer;
