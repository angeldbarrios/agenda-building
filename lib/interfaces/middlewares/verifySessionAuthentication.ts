import { NextFunction, Request, Response } from 'express';
import verifySession from '../../application/use_cases/segurity/verifySession';

export default () => {
  return async function (req: Request, _res: Response, next: NextFunction) {
    try {
      if (!req.session || !req.session.id || !req.session['data'] || req.session['data'].isAuth !== true) {
        return next(new Error('Not authenticated'));
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
