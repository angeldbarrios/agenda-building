import { AppContext } from '../../domain/types/appContext';
import BaseUseCase from './baseUseCase';
import Joi from 'joi';

const schemaProps = {
  firstName: Joi.string()
    .regex(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]+$/)
    .max(50)
    .required(),
  lastName: Joi.string()
    .regex(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]+$/)
    .max(50)
    .required(),
  phoneNumber: Joi.string().max(50).required(),
  email: Joi.string().max(100).email().required(),
  address: Joi.string().max(255).required(),
};

// const schema = Joi.object(schemaProps);

const selectableFields = ['firstName', 'lastName', 'phoneNumber', 'email', 'address'];
const editableFields = ['phoneNumber'];

export default class PatientUseCases extends BaseUseCase {
  constructor(private appContext: AppContext) {
    super(appContext.repositories.patientRepository, schemaProps);
  }

  checkPermissionsOnAction(action: string, userData: any): Promise<void> {
    return Promise.resolve();
  }

  checkPermissionOnRecord(record: any, userData: any): Promise<void> {
    return Promise.resolve();
  }
}
