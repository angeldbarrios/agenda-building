export default interface IAccessTokenManager {
  generate(payload: any): Promise<string>;
  decode(accessToken: string): Promise<any>;
};