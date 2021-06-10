export default interface IAuthRepository {
  login(username: string, password: string): Promise<any>;
  registration(userData: any): Promise<any>;  
};