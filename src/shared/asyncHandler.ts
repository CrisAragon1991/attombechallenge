import { Request, Response, NextFunction } from 'express';
import { GeneralResponse } from './GeneralResponse';

export function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.log(err);
      const response: GeneralResponse<any> = { success: false, error: String(err) };
      // Not found error
      if (String(err).toLowerCase().includes('not found')) {
        return res.status(404).json(response);
      }
      res.status(500).json(response);
    });
  };
}
