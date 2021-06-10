import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  return sequelize.define('Status', {
    status_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    status_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    }
  });
};