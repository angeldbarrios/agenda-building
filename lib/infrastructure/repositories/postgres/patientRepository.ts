import { Model, ModelCtor } from 'sequelize/types';
import PostgresBaseRepository from './postgresBaseRepository';

export default class PatientRepository extends PostgresBaseRepository {
  constructor(private Patient: ModelCtor<Model<any, any>>) {
    super(Patient, {});
  }

  async verifyPermissions(patientId: string, userId: string) {
    // Implementación puede cambiar en el futuro
    const patient = await this.Patient.findOne({
      where: {
        patient_id: patientId,
        created_by: userId,
      },
      attributes: ['patient_id'],
    });
    return !!patient;
  }
}
