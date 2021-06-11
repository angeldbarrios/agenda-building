import { Sequelize } from 'sequelize';

export default async () => {
  const sequelize = new Sequelize('db_agenda', 'engek', '123456', {
    host: 'localhost',
    dialect: 'postgres',
  });

  await sequelize.authenticate();
  return sequelize;
};
