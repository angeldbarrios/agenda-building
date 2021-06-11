import express from 'express';
import session from 'express-session';

import cors from 'cors';
import helmet from 'helmet';
import nocache from 'nocache';
import hpp from 'hpp';

import environment from '../config/environment';
import { AppContext } from '../../domain/types/appContext';

// Middlewares
import requestLimiter from './middlewares/requestLimiterMiddleware';
import routesLoader from './routes-loader';

import error404Manager from './errors/404ErrorManager';
import appErrorManager from './errors/appErrorManager';

function getApp(appContext: AppContext) {
  const app = express();

  // GLobal middlewares
  app.use(
    helmet({
      frameguard: { action: 'deny' },
    }),
  );

  app.use(nocache());
  app.use(hpp());
  app.use(cors());
  app.use(requestLimiter()); // Limitar peticiones

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    session({
      name: 'sss_id',
      secret: 'environment.SESSION_SECRET_KEY',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: environment.server.HTTPS, httpOnly: true, maxAge: 3600000, sameSite: true },
    }),
  );

  // Routes
  app.use('/api', routesLoader(appContext));

  // 404 errors
  app.use(error404Manager);

  // Error handling
  app.use(appErrorManager);

  return app;
}

export default getApp;
