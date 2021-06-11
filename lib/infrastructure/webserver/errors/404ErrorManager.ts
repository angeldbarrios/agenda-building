import { NextFunction, Request, Response } from 'express';
import { PublicError } from './exceptions';

export default (_req: Request, _res: Response, next: NextFunction) => {
  try {
    const err = new PublicError('Not Found', 404);
    next(err);
  } catch (error) {
    next(error);
  }
};
