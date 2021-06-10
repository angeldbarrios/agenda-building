import { Request, Response, NextFunction, Router } from 'express';
import BaseUseCase from '../../application/use_cases/baseUseCase';

type ControllerCRUDConfig = {
  create?: boolean,
  update?: boolean,
  delete?: boolean,
  getById?: boolean,
  getListPaginated?: boolean
};

/**
 * TODO: manejar a través de la configuración las propiedades que se envían al cliente
 */

export default (config: ControllerCRUDConfig, router: Router, baseUseCase: BaseUseCase) => {
  if(config.create) {
    router.post('/create', async (req: Request, res: Response, next: NextFunction)  => {
      try {
        const result = await baseUseCase.create(req.session.data, req.body);
        res.status(201).json({ error: false, data: result });
      } catch (error) {
        next(error);
      }
    });
  }

  if(config.delete) {
    router.delete('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
      try {
        await baseUseCase.destroy(req.session.data, req.params.id);
        res.json({ error: false });
      } catch (error) {
        next(error);
      }
    });
  }

  if(config.getById) {
    router.get('/find/:id', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = baseUseCase.findById(req.session.data, req.params.id);
        res.json({ error: false, data: result });
      } catch (error) {
        next(error);
      }
    });
  }

  if(config.getListPaginated) {
    router.get('/find', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await baseUseCase.find(req.session.data, req.query);
        res.json({ error: false, data: result });
      } catch (error) {
        next(error);
      }
    });
  }
};