import Joi from 'joi';
import { AppContext } from '../../../domain/types/appContext';
import validateSchemaOrFail from '../../helpers/schemaValidator';

const TOKEN_DURATION = 1000 * 60 * 60 * 10;

const schema = Joi.object({
  username: Joi.string().alphanum().max(50).required(),
  password: Joi.string().required()
});

export default async (appContext: AppContext, inputData: any) => {
  const { username, password } = validateSchemaOrFail(schema, inputData);

  const { authRepository } = appContext.repositories;
  // const { accessTokenManager } = appContext;

  const user = await authRepository.login(username, password);
  
  const now = new Date();
  const sessionData = {
    userId: user.user_id,
    isAuth: true,
    authTime: now,
    lastTimeAt: now,
    username: user.username,
    fullName: `${user.first_name} ${user.last_name}`,
    email: user.email
  };

  // user.accessToken = await accessTokenManager.generate({
  //   sessionId: uuidv4(),
  //   username: user.username,
  //   userId: user._id,
  //   exp: Date.now() + TOKEN_DURATION
  // });

  return { user, sessionData };
};
