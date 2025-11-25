import { inject, injectable } from 'tsyringe';
import { IFindUserByEmailUseCase } from './interfaces/IFindUserByEmailUseCase';
import { IRefreshTokenUseCase } from './interfaces/IRefreshTokenUseCase';
import { INTERFACETOKENS } from '../../shared/InterfaceTokens';
import { generateToken } from '../../shared/GenerateJwt';
import * as jwt from 'jsonwebtoken';
import { User } from '../../domain/user/User';

@injectable()
export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(
    @inject(INTERFACETOKENS.IFindUserByEmailUseCase) private findByEmail: IFindUserByEmailUseCase
  ) {}

  async execute(refreshToken: string): Promise<User> {
    const secret = process.env.JWT_SECRET ?? 'dev-local-secret-do-not-use-in-production';
    let decoded: any;
    try {
      decoded = jwt.verify(refreshToken, secret);
    } catch (err) {
      throw new Error('Invalid or expired refresh token');
    }
    const email = decoded.email;
    if (!email) throw new Error('Invalid token payload');
    const user = await this.findByEmail.execute(email);
    if (!user) throw new Error('User not found');
    return user;
  }
}
