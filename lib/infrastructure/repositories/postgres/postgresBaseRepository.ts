import { Model, ModelCtor } from 'sequelize/types';
import IBaseRepository from '../../../domain/repositories/IBaseRepository';

export default class PostgresBaseRepository implements IBaseRepository {
  constructor(
    protected model: ModelCtor<Model<any, any>>,
    protected equalityTable: object
  ) { }

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
