import verifyAcessToken from '../../application/use_cases/segurity/VerifyAccessToken';
import { AppContext } from '../../domain/types/appContext';

export default (appContext: AppContext) => {
  return async function (req, _res, next) {
    try {
      const accessToken = req.headers['authorization'];
      const decoded = await verifyAcessToken(appContext, accessToken);
      req.accessTokenDecoded = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};
