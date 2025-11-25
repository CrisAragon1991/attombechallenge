import { IUserRepository } from '../../domain/user/IUserRepository';
import { User } from '../../domain/user/User';
import { generateId } from '../../shared/id';
import { injectable, inject } from 'tsyringe';
import { ICreateUserUseCase, CreateUserInput } from './interfaces/ICreateUserUseCase';
import { INTERFACETOKENS } from '../../shared/InterfaceTokens';

@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(@inject(INTERFACETOKENS.IUserRepository) private repo: IUserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    const user = new User({ id: generateId(), email: input.email, createdAt: new Date() });
    await this.repo.save(user);
    return user;
  }
}
