export interface IDeleteTodoUseCase {
  execute(id: string): Promise<void>;
}
