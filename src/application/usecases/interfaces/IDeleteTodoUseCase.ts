export interface IDeleteTodoUseCase {
  execute(id: string, userId: string): Promise<void>;
}
