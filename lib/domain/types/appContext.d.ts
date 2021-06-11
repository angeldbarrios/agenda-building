import IAuthRepository from '../repositories/IAuthRepository';
import IAccessTokenManager from '../security/IAccessTokenManager';

export type Repositories = {
  authRepository?: IAuthRepository;
  patientRepository?: any;
  scheduleRepository?: any;
};

export type AppContext = {
  accessTokenManager: IAccessTokenManager;
  repositories: Repositories;
  errors: any;
  databaseInstance?: any;
};
