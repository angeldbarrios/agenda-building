import Joi from 'joi';
import { AppContext } from '../../../domain/types/appContext';
import validateSchemaOrFail from '../../helpers/schemaValidator';

const schema = Joi.object({
  username: Joi.string().alphanum().max(50).required(),
  first_name: Joi.string().regex(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]+$/).max(50).required(),
  last_name: Joi.string().regex(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]+$/).max(50).required(),
  email: Joi.string().max(100).email().required(),
  password: Joi.string().max(60).required()
});

export default async (appContext: AppContext, inputUserData: any) => {
  const userData = validateSchemaOrFail(schema, inputUserData);

  const { authRepository } = appContext.repositories;
  const registedUser = await authRepository.registration(userData);
  return registedUser;
};
