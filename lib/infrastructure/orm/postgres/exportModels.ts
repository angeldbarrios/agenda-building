import { Sequelize } from "sequelize/types";

import getEnterpriseModel from './models/Enterprise';
import getSubsidiary from './models/Subsidiary';
import getUserModel from './models/User';
import getProductModel from './models/Product';
import getPatientModel from './models/Patient';
import getStatusModel from './models/Status';
import getKardexModel from './models/Kardex';
import getRoleModel from './models/Role';
import getScheduleModel from './models/Schedule';
import getStockModel from './models/Stock';

export default (sequealize: Sequelize) => {
  return {
    Enterprise: getEnterpriseModel(sequealize),
    Subsidiary: getSubsidiary(sequealize),
    User: getUserModel(sequealize),
    Product: getProductModel(sequealize),
    Patient: getPatientModel(sequealize),
    Status: getStatusModel(sequealize),
    Schedule: getScheduleModel(sequealize),
    Stock: getStockModel(sequealize),
    Kardex: getKardexModel(sequealize),
    Role: getRoleModel(sequealize),
  }
};