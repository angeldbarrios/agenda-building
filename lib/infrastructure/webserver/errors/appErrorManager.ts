import { NextFunction, Request, Response } from "express";

import { PublicError } from './exceptions';
import logger from '../logger';

export default (err: Error, req: Request, res: Response, _next: NextFunction) => {
  try {
    let status = 500;
    let message = "Internal error";
    
    if (err instanceof PublicError) {
      status = err.status || 500;
      message = err.message || "Internal server error";
    }
  
    logger.error(`IP:[${req.ip}] URL:[${req.url}] - ${err.stack}`);
  
    res.setHeader('content-type', 'application/json');
    res.status(status);
    res.json({
      error: true,
      message: err.stack
    });
  } catch (error) {
    logger.error(`IP:[${req.ip}] URL:[${req.url}] - ${err.stack}`);
    res.status(500).json({
      error: true,
      message: 'Internal server error'
    });
  }
}
