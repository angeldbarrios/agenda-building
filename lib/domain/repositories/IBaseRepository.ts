// TODO: afinar más los tipos de retorno

export default interface IBaseRepository {
  find(cond: any, fields: string[], paginationParams: any): Promise<Array<any>>;
  findOne(cond: any, fields: string[]): Promise<any>;
  destroy(recordPrimaryKey: string): Promise<any>;
  create(data: any, insertableFields: string[]): Promise<any>;
  update(cond: any, values: any): Promise<any>;
  findById(id: string, fields: string[]): Promise<any>;
}
