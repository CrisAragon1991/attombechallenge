import { Todo } from './Todo';

export interface ITodoRepository {
  save(todo: Todo): Promise<void>;
  findById(id: string): Promise<Todo | null>;
  findAll(): Promise<Todo[]>;
  update(todo: Todo): Promise<void>;
  delete(id: string): Promise<void>;
}

