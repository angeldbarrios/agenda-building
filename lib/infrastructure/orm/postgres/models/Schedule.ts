import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  return sequelize.define('Schedule', {
    schedule_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: sequelize.models.Patient,
        key: 'patient_id'
      }
    },

    attented_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: sequelize.models.User,
        key: 'user_id'
      }
    },

    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: sequelize.models.User,
        key: 'user_id'
      }
    },

    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: sequelize.models.Status,
        key: 'status_id'
      }
    },

    appointment_date: {
      type: DataTypes.DATE,
    },

    observations: {
      type: DataTypes.STRING(1024)
    },

    cancelled_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: sequelize.models.User,
        key: 'user_id'
      }
    },

    cancelled_at: {
      type: DataTypes.DATE,
    }
  });
};