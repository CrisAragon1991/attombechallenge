import { Todo } from '../../../domain/todo/Todo';

export interface IGetTodosUseCase {
  execute(userId: string): Promise<Todo[]>;
}
