import { Model, ModelCtor } from 'sequelize/types';
import IBaseRepository from '../../../domain/repositories/IBaseRepository';

export default class PostgresBaseRepository implements IBaseRepository {
  constructor(protected model: ModelCtor<Model<any, any>>, protected equalityTable: object) {}

  // private equalizeConds(cond: any) {
  //   const condKeys = Object.keys(cond).filter(key => cond[key]);
  //   const equalizedConds = {};

  //   /**
  //    *
  //    * const cond = {
  //    *  user: {
  //    *    username: 'username',
  //    *    fullName: 'full_name'
  //    *  }
  //    * }
  //    */

  //   condKeys.forEach(key => {
  //     const equalityTableKey = this.equalityTable[key];
  //     const isCondObj = typeof cond[key] === 'object';

  //     if(!isCondObj) {
  //       if(equalityTableKey) {
  //         equalizedConds[equalityTableKey] = cond[key];
  //       } else {
  //         equalizedConds[key] = cond[key];
  //       }
  //     }

  //     else {
  //       if(equalityTableKey) {
  //         const condObjKeys = Object.keys(cond[key]);

  //       }
  //     }

  //     // if(condKeys.length === 0) {
  //     //   delete cond[key];
  //     // } else if (condKeys.length === 1) {

  //     // }

  //     // if(!this.equalityTable[key]) {
  //     //   newConds[this.equalityTable[key]]
  //     // }
  //     // else {
  //     //   const condRefSubDocuments = cond[key].split('.');
  //     //   if(condRefSubDocuments.length === 1) {

  //     //   } else if(condRefSubDocuments.length > 1) {

  //     //   }
  //     // }
  //   });
  // }

  find(cond: any, fields: string[]) {
    return this.model.findAll({
      attributes: fields || undefined,
      where: cond,
    });
  }

  findOne(cond: any, fields: string[]) {
    return this.model.findOne({
      attributes: fields || undefined,
      where: cond,
    });
  }

  findById(id: string, fields: string[]) {
    return this.model.findByPk(id, {
      attributes: fields || undefined,
    });
  }

  destroy(recordPrimaryKey: string) {
    return this.model.destroy({
      where: {
        [this.model.primaryKeyAttribute]: recordPrimaryKey,
      },
      limit: 1,
    });
  }

  create(data: any, insertableFields: string[]) {
    return this.model.create(data, {
      raw: true,
      fields: insertableFields,
    });
  }

  update(cond: any, values: any) {
    return this.model.update(values, {
      where: cond,
    });
  }
}
