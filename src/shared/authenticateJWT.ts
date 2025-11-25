import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { GeneralResponse } from './GeneralResponse';

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const response: GeneralResponse<null> = { success: false, error: 'No token provided' };
    return res.status(401).json(response);
  }
  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET ?? 'dev-local-secret-do-not-use-in-production';
  try {
    const decoded = jwt.verify(token, secret);
    (req as any).user = decoded;
    next();
  } catch (err) {
    const response: GeneralResponse<null> = { success: false, error: 'Invalid or expired token' };
    return res.status(401).json(response);
  }
}
