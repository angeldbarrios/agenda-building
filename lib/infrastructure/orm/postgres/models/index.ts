import { Sequelize } from 'sequelize';
import UserModel from './User';
import PatientModel from './Patient';

export default async (sequelize: Sequelize) => {
  const models = {
    User: UserModel(sequelize),
    Patient: PatientModel(sequelize),
  };
  return models;
};
