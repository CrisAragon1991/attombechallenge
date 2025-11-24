import { CreateTodoInput, Todo } from '../../../domain/todo/Todo';

export interface ICreateTodoUseCase {
  execute(input: CreateTodoInput): Promise<Todo>;
}
