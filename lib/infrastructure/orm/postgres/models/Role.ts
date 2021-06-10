import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  return sequelize.define('Role', {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    role_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    }
  });
};


/**
 * INSERT INTO public.roles (role_name) VALUES('admin')
 * INSERT INTO public.roles (role_name) VALUES('readonly')
 * INSERT INTO public.roles (role_name) VALUES('standard')
 */