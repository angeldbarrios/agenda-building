import IAuthRepository from '../repositories/IAuthRepository';
import IBaseRepository from '../repositories/IBaseRepository';
import IPatientRepository from '../repositories/IPatientRepository';
import IAccessTokenManager from '../security/IAccessTokenManager';

export type Repositories = {
  authRepository?: IAuthRepository;
  patientRepository?: IPatientRepository & IBaseRepository;
  scheduleRepository?: any;
};

export type AppContext = {
  accessTokenManager: IAccessTokenManager;
  repositories: Repositories;
  errors: any;
  databaseInstance?: any;
};
