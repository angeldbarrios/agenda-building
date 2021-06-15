import { AppContext } from '../../../domain/types/appContext';
import validator from '../../../domain/validators/validator';

export default async (appContext: AppContext, inputUserData: any) => {
  const properties = ['username', 'first_name', 'last_name', 'email', 'password'];
  const userData = validator('user', inputUserData, { properties });

  const { authRepository } = appContext.repositories;
  const registedUser = await authRepository.registration(userData);
  return registedUser;
};
