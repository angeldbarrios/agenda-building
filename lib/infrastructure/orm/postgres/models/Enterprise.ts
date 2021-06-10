import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  return sequelize.define('Enterprise', {
    enterprise_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    enterprise_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },

    enterprise_address: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    

  });
};