import { Todo } from './Todo';

export interface ITodoRepository {
  save(todo: Todo): Promise<void>;
  findById(id: string): Promise<Todo | null>;
  findAllByUserId(userId: string): Promise<Todo[]>;
  update(todo: Todo): Promise<void>;
  deleteByUserId(id: string, userId: string): Promise<void>;
}

