import express, { NextFunction, Request, Response } from 'express';
import { AppContext } from '../../../domain/types/appContext';
import controllerCRUD from '../../helpers/controllerCRUDSetter';
import PatientUseCases from '../../../application/use_cases/patientUseCases';

export default (appContext: AppContext) => {
  const patientUseCases = new PatientUseCases(appContext);
  const router = express.Router();

  controllerCRUD({
    create: true,
    delete: true,
    getById: true
  }, router, patientUseCases);

  return router;
}