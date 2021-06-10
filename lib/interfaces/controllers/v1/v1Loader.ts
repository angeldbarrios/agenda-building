
import express from 'express';
import { AppContext } from '../../../domain/types/appContext';
import authController from './authController';

export default (appContext: AppContext) =>  {
  const router = express.Router();
  router.use('/auth', authController(appContext))

  return router;
}
