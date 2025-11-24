import { Todo, UpdateTodoInput } from '../../../domain/todo/Todo';

export interface IUpdateTodoUseCase {
  execute(input: UpdateTodoInput): Promise<Todo>;
}
