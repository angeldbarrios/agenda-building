import { Sequelize } from 'sequelize';

import AuthRepository from './postgres/authRespository';
import exportModels from '../orm/postgres/exportModels';
import { Repositories } from '../../domain/types/appContext';

export default {
  postgres: async (sequalize: Sequelize) => {
    const { User } = exportModels(sequalize);

    const repositories: Repositories = {
      authRepository: new AuthRepository(User)
    };

    return repositories;
  }
}
