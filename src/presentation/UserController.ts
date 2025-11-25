import { injectable, inject } from 'tsyringe';
import { ICreateUserUseCase } from '../application/usecases/interfaces/ICreateUserUseCase';
import { IFindUserByEmailUseCase } from '../application/usecases/interfaces/IFindUserByEmailUseCase';
import { INTERFACETOKENS } from '../shared/InterfaceTokens';
import { IRefreshTokenUseCase } from '../application/usecases/interfaces/IRefreshTokenUseCase';

@injectable()
export class UserController {
  constructor(
    @inject(INTERFACETOKENS.ICreateUserUseCase) private createUser: ICreateUserUseCase,
    @inject(INTERFACETOKENS.IFindUserByEmailUseCase) private findByEmail: IFindUserByEmailUseCase,
    @inject(INTERFACETOKENS.IRefreshTokenUseCase) private refreshTokenUseCase: IRefreshTokenUseCase,
  ) {}

  async register(email: string) {
    const input = { email };
    return this.createUser.execute(input);
  }

  async login(email: string) {
    return this.findByEmail.execute(email);
  }

  async refreshToken(refreshToken: string) {
    return this.refreshTokenUseCase.execute(refreshToken);
  }
}
