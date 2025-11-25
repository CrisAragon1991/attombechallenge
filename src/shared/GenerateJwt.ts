import * as jwt from 'jsonwebtoken';
import { User } from '../domain/user/User';

const DEFAULT_TTL = '1h';

export function generateToken(user: User, ttl: string = DEFAULT_TTL): string {
  const secret: string = process.env.JWT_SECRET ?? 'dev-local-secret-do-not-use-in-production';
  const payload = {...user } ;

  const token = jwt.sign(payload, secret, { expiresIn: ttl } as jwt.SignOptions) as string;
  return token;
}
