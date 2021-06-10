import express, { NextFunction, Request, Response } from 'express';
import { AppContext } from '../../../domain/types/appContext';

import loginUseCase from '../../../application/use_cases/segurity/loginUseCase';
import signupUseCase from '../../../application/use_cases/segurity/signupUseCase';

export default (appContext: AppContext) => {
  const router = express.Router();
  
  router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const { user, sessionData } = await loginUseCase(appContext, { username, password });

      req.session.regenerate(function(err) {
        if(err) {
          next(err);
          return;
        }

        req.session.data = sessionData;
        res.json({ error: false, data: user });
      });

    } catch (error) {
      next(error);
    }
  });

  router.post('/signup', async(req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const user = await signupUseCase(appContext, userData);
      res.json({ error: false, data: user });
    } catch (error) {
      next(error);
    }
  });

  return router;
}