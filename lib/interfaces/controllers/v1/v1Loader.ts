import express from 'express';
import { AppContext } from '../../../domain/types/appContext';
import authController from './authController';
import patientController from './patientController';
import verifyAuthentication from '../../middlewares/verifySessionAuthentication';

export default (appContext: AppContext) => {
  const router = express.Router();
  router.use('/auth', authController(appContext));
  router.use('/patient', verifyAuthentication(), patientController(appContext));
  return router;
};
