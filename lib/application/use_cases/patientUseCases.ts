import { AppContext } from '../../domain/types/appContext';
import BaseUseCase from './baseUseCase';
import IPatientRepository from '../../domain/repositories/IPatientRepository';

export default class PatientUseCases extends BaseUseCase implements IPatientRepository {
  constructor(private appContext: AppContext) {
    super(
      appContext.repositories.patientRepository,
      'patient',
      {
        tenureId: 'patientId',
        filterProperties: [],
        selectableFields: ['firstName', 'lastName', 'phoneNumber', 'email', 'address'],
        editableFields: ['phoneNumber'],
        insertableFields: [],
        sortableFields: []
      }
    );
  }

  checkPermissionsOnAction(action: string, userData: any): Promise<void> {
    return Promise.resolve();
  }

  checkPermissionOnRecord(record: any, userData: any): Promise<void> {
    return Promise.resolve();
  }
}
