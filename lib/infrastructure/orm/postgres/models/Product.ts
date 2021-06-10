import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  return sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },

    // product_metric: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'Metric',
    //     key: 'metric_id'
    //   }
    // },

    product_price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },

    product_description: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },

    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: sequelize.models.User,
        key: 'user_id'
      }
    }
  });
};