import Joi from 'joi';
import { SchemaName, ValidationConfig } from '../types/config';
import schemaMapping from './schemaMapping';

export default function (schemaName: SchemaName, data: any, config?: ValidationConfig) {
  // TODO: take into account required and not required fields
  const schemaMap: Joi.SchemaMap = schemaMapping[schemaName];
  if (!schemaMap) {
    throw new Error('Schema not found');
  }

  let finalSchema: Joi.SchemaMap<any> = schemaMap;

  // Building sub-schema for specific properties
  if (config.properties) {
    finalSchema = config.properties.reduce(function (accum, property) {
      if (schemaMap[property]) {
        accum[property] = finalSchema[property];
      }
      return accum;
    }, {} as Joi.SchemaMap);
  }

  const objectSchema = Joi.object(finalSchema);

  const { value, error } = objectSchema.validate(data);
  if (error !== undefined) {
    // TODO: format response
    throw error;
  }

  return value;
}
