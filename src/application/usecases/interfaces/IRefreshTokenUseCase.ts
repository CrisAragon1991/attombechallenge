import { User } from '../../../domain/user/User';

export interface IRefreshTokenUseCase {
  execute(refreshToken: string): Promise<User>;
}
