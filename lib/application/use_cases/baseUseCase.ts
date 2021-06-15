import Joi from 'joi';
import IBaseRepository from '../../domain/repositories/IBaseRepository';
import { SchemaName } from '../../domain/types/config';
import validator from '../../domain/validators/validator';
import validateSchemaOrFail from '../helpers/schemaValidator';

type UseCaseConfig = {
  tenureId: string;
  filterProperties: string[];
  selectableFields: string[];
  editableFields: string[];
  insertableFields: string[];
  sortableFields: string[];
};

type SortInfo = {
  field: string;
  order: string;
};

type PaginationParams = {
  lastId?: string;
  limit?: string | number;
  sort?: SortInfo;
  query?: string;
};

export default abstract class BaseUseCase {
  constructor(
    protected baseRepository: IBaseRepository,
    protected schemaName: SchemaName,
    protected config?: UseCaseConfig,
  ) {}
  

  abstract checkPermissionsOnAction(action: string, userData: any): Promise<any>;
  abstract checkPermissionOnRecord(record: any, userData: any): Promise<any>;

  private getSortInfo(sort: string): SortInfo {
    let sortInfo: SortInfo = undefined;
    if (sort) {
      if (sort[0] === '-') {
        sortInfo.field = sort.substring(1);
        sortInfo.order = 'DESC';
      }
      if (!this.config.sortableFields.includes(sortInfo.field)) {
        return undefined;
      }
      return sortInfo;
    }
  }

  private validateAndGetPaginationParams(params: any) {
    const { sort, q: query, lastId, limit } = params;
    const sortInfo = this.getSortInfo(sort);
    const schemaMap = {
      query: Joi.string()
        .regex(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]+$/)
        .max(50),
      lastId: Joi.number(),
      limit: Joi.number().valid(10, 20, 50),
    };
    validateSchemaOrFail(Joi.object(schemaMap), { query, lastId, limit });
    return { sortInfo, query, lastId, limit };
  }

  private serializeFilters(params: any) {
    return this.config.filterProperties.reduce((accumulator: any, currentValue: string) => {
      const filter = params[currentValue];
      if (filter) {
        accumulator[currentValue] = filter;
      }
      return accumulator;
    }, {});
  }

  private filterResult(result: object) {
    const filteredResult = Object.keys(result)
      .filter((key) => this.config.selectableFields.includes(key))
      .reduce((accumulator: any, key: string) => {
        accumulator[key] = result[key];
        return accumulator;
      }, {});
    return filteredResult;
  }

  async create(session: any, input: any) {
    await this.checkPermissionsOnAction('create', session);
    validator(this.schemaName, input);

    const result = await this.baseRepository.create(
      {
        createdBy: session,
        input: input,
      },
      this.config.insertableFields,
    );

    const filteredResult = this.filterResult(result);
    return filteredResult;
  }

  async find(session: any, params: any) {
    await this.checkPermissionsOnAction('find', session);
    const filters = this.serializeFilters(params);
    const paginationParams = this.validateAndGetPaginationParams(params);

    filters[this.config.tenureId] = session.userId;

    const results = await this.baseRepository.find(filters, this.config.selectableFields, paginationParams);

    const filteredResults = results.map((result) => {
      return this.filterResult(result);
    });

    return filteredResults;
  }

  async findById(session: any, id: string) {
    const result = await this.baseRepository.findById(id, this.config.selectableFields);
  }

  destroy(session: any, recordPrimaryKey: string) {
    return this.baseRepository.destroy(recordPrimaryKey);
  }
}
