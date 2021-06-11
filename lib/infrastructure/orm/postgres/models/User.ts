import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  return sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    salt: {
      type: DataTypes.STRING,
    },

    role: {
      type: DataTypes.INTEGER,
    },
  });
};
