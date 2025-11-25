import { User } from '../../../domain/user/User';

export interface CreateUserInput {
  email: string;
}

export interface ICreateUserUseCase {
  execute(input: CreateUserInput): Promise<User>;
}
