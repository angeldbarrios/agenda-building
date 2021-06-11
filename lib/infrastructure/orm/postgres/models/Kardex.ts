import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  return sequelize.define('Kardex', {
    kardex_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: sequelize.models.Product,
        key: 'product_id',
      },
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    observations: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },

    registered_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: sequelize.models.User,
        key: 'user_id',
      },
    },
  });
};
