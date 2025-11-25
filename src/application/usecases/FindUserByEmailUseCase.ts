import { IUserRepository } from '../../domain/user/IUserRepository';
import { injectable, inject } from 'tsyringe';
import { IFindUserByEmailUseCase } from './interfaces/IFindUserByEmailUseCase';
import { INTERFACETOKENS } from '../../shared/InterfaceTokens';
import { User } from '../../domain/user/User';

@injectable()
export class FindUserByEmailUseCase implements IFindUserByEmailUseCase {
  constructor(@inject(INTERFACETOKENS.IUserRepository) private repo: IUserRepository) {}

  async execute(email: string): Promise<User> {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new Error('User not found');
    return user;
  }
}
