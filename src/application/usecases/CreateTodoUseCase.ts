import { ITodoRepository } from '../../domain/todo/ITodoRepository';
import { Todo, TodoProps, CreateTodoInput } from '../../domain/todo/Todo';
import { generateId } from '../../shared/id';
import { injectable, inject } from 'tsyringe';
import { ICreateTodoUseCase } from './interfaces/ICreateTodoUseCase';
import { INTERFACETOKENS } from '../../shared/InterfaceTokens';

@injectable()
export class CreateTodoUseCase implements ICreateTodoUseCase {
  constructor(@inject(INTERFACETOKENS.ITodoRepository) private repo: ITodoRepository) {}

  async execute(input: CreateTodoInput): Promise<Todo> {
    const now = new Date();
    const props: TodoProps = {
      id: generateId(),
      name: input.name,
      description: input.description,
      createdAt: now,
      updatedAt: now,
      stateId: input.stateId,
    };

    const todo = new Todo(props);
    await this.repo.save(todo);
    return todo;
  }
}
