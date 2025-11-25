import { Request, Response, NextFunction } from 'express';
// Extensión de la interfaz Request para requestObjectData
declare global {
  namespace Express {
    interface Request {
      requestObjectData?: any;
    }
  }
}

import { validationResult, ValidationChain } from 'express-validator';
import { GeneralResponse } from './GeneralResponse';

export function validationMiddleware(schema: ValidationChain[]) {
  return [
    ...schema,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const response: GeneralResponse<any> = {
          success: false,
          error: 'Validation error',
          data: errors.array()
        };
        return res.status(400).json(response);
      }

      req.requestObjectData = { ...req.body };
      next();
    }
  ];
}