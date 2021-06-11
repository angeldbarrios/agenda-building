import constants from './constants';

export default (() => {
  const environment: any = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,

    database: {
      dialect: process.env.DATABASE_DIALECT || constants.SUPPORTED_DATABASE.POSTGRES,
      url: process.env.DATABASE_URI || '',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      cert: process.env.DATABASE_CERT || '',
    },

    server: {
      PORT: process.env.PORT || 3000,
      HTTPS: process.env.HTTPS === 'true',
      KEY: process.env.KEY,
      CERT: process.env.CERT,
    },
  };

  if (process.env.NODE_ENV === 'test') {
    environment.database = {
      driver: constants.SUPPORTED_DATABASE.IN_MEMORY,
    };
  }
  return environment;
})();
