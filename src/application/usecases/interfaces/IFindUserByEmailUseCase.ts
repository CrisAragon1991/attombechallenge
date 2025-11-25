import { User } from "../../../domain/user/User";

export interface IFindUserByEmailUseCase {
  execute(email: string): Promise<User>;
}
