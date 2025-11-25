export interface IFindUserByEmailUseCase {
  execute(email: string): Promise<string>; // returns token
}
