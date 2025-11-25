import { injectable, inject } from 'tsyringe';
import { ICreateUserUseCase } from '../application/usecases/interfaces/ICreateUserUseCase';
import { IFindUserByEmailUseCase } from '../application/usecases/interfaces/IFindUserByEmailUseCase';
import { TOKENS } from '../shared/diTokens';

@injectable()
export class UserController {
  constructor(
    @inject(TOKENS.ICreateUserUseCase) private createUser: ICreateUserUseCase,
    @inject(TOKENS.IFindUserByEmailUseCase) private findByEmail: IFindUserByEmailUseCase,
  ) {}

  async register(email: string) {
    const input = { email };
    return this.createUser.execute(input);
  }

  async login(email: string) {
    return this.findByEmail.execute(email);
  }
}
