import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  return sequelize.define('Subsidiary', {
    subsidiary_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    subsidiary_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },

    subsidiary_address: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    
    enterprise_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: sequelize.models.Enterprise,
        key: 'enterprise_id'
      }
    }
  });
};