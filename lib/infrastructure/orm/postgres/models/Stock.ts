import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  return sequelize.define('Stock', {
    stock_id: {
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

    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
