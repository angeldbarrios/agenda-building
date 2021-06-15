import { AppContext } from '../../../domain/types/appContext';
import validator from '../../../domain/validators/validator';

export default async (appContext: AppContext, inputData: any) => {
  const { username, password } = validator('user', inputData, { properties: ['username', 'password'] });

  const { authRepository } = appContext.repositories;

  const user = await authRepository.login(username, password);

  const now = new Date();
  const sessionData = {
    userId: user.user_id,
    isAuth: true,
    authTime: now,
    lastTimeAt: now,
    username: user.username,
    fullName: `${user.first_name} ${user.last_name}`,
    email: user.email,
  };

  return { user, sessionData };
};
