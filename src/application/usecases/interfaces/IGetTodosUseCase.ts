import { Todo } from '../../../domain/todo/Todo';

export interface IGetTodosUseCase {
  execute(): Promise<Todo[]>;
}
