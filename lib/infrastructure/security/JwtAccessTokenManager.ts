import jwt from 'jsonwebtoken';
import enviroment from '../config/environment';
import IAccessTokenManager from '../../domain/security/IAccessTokenManager';

export default class implements IAccessTokenManager {
  generate(payload: any): Promise<string> {
    return new Promise(function (resolve, reject) {
      jwt.sign(payload, enviroment.JWT_SECRET_KEY, function (err: Error, token: string) {
        if (err) return reject(err);
        resolve(token);
      });
    });
  }

  decode(accessToken: string): Promise<any> {
    return new Promise(function (resolve, reject) {
      jwt.verify(accessToken, enviroment.JWT_SECRET_KEY, function (err: Error, decoded: any) {
        if (err) return reject(err);
        resolve(decoded);
      });
    })
  }
};