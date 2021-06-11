import crypto from 'crypto';
import { Model, ModelCtor } from 'sequelize/types';
import IAuthRepository from '../../../domain/repositories/IAuthRepository';

const config = {
  // size of the generated hash
  hashBytes: 32,
  // larger salt means hashed passwords are more resistant to rainbow table, but
  // you get diminishing returns pretty fast
  saltBytes: 16,
  // more iterations means an attacker has to take longer to brute force an
  // individual password, so larger is better. however, larger also means longer
  // to hash the password. tune so that hashing the password takes about a
  // second
  iterations: 872791,
};

export default class AuthRepository implements IAuthRepository {
  constructor(private User: ModelCtor<Model<any, any>>) {}

  private verifyPassword(storedHash: string, inputPassword: string): Promise<boolean> {
    return new Promise(function (resolve, reject) {
      try {
        const [salt, originalHash] = storedHash.split('$');
        crypto.pbkdf2(
          inputPassword,
          salt,
          config.iterations,
          config.hashBytes,
          'sha512',
          (err: Error, hash: Buffer) => {
            if (err) {
              reject(err);
            }

            resolve(hash.toString('hex') === originalHash);
          },
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  private hashPassword(password: string) {
    return new Promise(function (resolve, reject) {
      try {
        const salt = crypto.randomBytes(config.saltBytes).toString('hex');
        crypto.pbkdf2(
          password,
          salt,
          config.iterations,
          config.hashBytes,
          'sha512',
          (err: Error, derivedKey: Buffer) => {
            if (err) reject(err);
            resolve([salt, derivedKey.toString('hex')].join('$'));
          },
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  async login(username: string, password: string) {
    try {
      const user = await this.User.findOne({
        where: { username: username },
        attributes: ['user_id', 'username', 'first_name', 'last_name', 'email', 'password'],
        raw: true,
      });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isVerified = await this.verifyPassword(user['password'], password);
      if (!isVerified) {
        throw new Error('Invalid credentials');
      }

      delete user['password'];
      return user;
    } catch (error) {
      throw error;
    }
  }

  async registration(userData) {
    try {
      userData.password = await this.hashPassword(userData.password);
      return await this.User.create(userData);
    } catch (error) {
      throw error;
    }
  }
}
