import { IUserRepository } from '../../domain/user/IUserRepository';
import { injectable, inject } from 'tsyringe';
import { IFindUserByEmailUseCase } from './interfaces/IFindUserByEmailUseCase';
import { INTERFACETOKENS } from '../../shared/InterfaceTokens';
import { generateToken } from '../../shared/GenerateJwt';

@injectable()
export class FindUserByEmailUseCase implements IFindUserByEmailUseCase {
  constructor(@inject(INTERFACETOKENS.IUserRepository) private repo: IUserRepository) {}

  async execute(email: string): Promise<string> {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new Error('User not found');

    const token = generateToken(user.email);
    return token;
  }
}
