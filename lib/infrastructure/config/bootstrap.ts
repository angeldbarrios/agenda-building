import dotenv from 'dotenv';
dotenv.config();

import constants from './constants';
import environment from './environment';
import * as errors from './errors';
import { AppContext } from '../../domain/types/appContext';
import JwtAccessTokenManager from '../security/JwtAccessTokenManager';

import repositories from '../repositories/';
import sequealize from '../orm/postgres/sequealize';

export default {
  async init() {
    const appContext: AppContext = {
      accessTokenManager: new JwtAccessTokenManager(),
      repositories: undefined,
      errors
    };

    if (environment.database.dialect === constants.SUPPORTED_DATABASE.POSTGRES) {
      const sequealizeInstace = await sequealize();
      appContext.repositories = await repositories.postgres(sequealizeInstace);
      await sequealizeInstace.sync();
    }

    else {
      throw new Error('No valid database dialect');
    }

    return appContext;
  }
};
