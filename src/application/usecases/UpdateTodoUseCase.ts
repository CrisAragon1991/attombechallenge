import { ITodoRepository } from '../..//domain/todo/ITodoRepository';
import { Todo, UpdateTodoInput } from '../../domain/todo/Todo';
import { injectable, inject } from 'tsyringe';
import { IUpdateTodoUseCase } from './interfaces/IUpdateTodoUseCase';
import { INTERFACETOKENS } from '../../shared/InterfaceTokens';

@injectable()
export class UpdateTodoUseCase implements IUpdateTodoUseCase {
  constructor(@inject(INTERFACETOKENS.ITodoRepository) private repo: ITodoRepository) {}

  async execute(input: UpdateTodoInput): Promise<Todo> {
    const existing = await this.repo.findById(input.id);
    if (!existing) throw new Error('Todo not found');
    if (existing.userId !== input.userId) throw new Error('Unauthorized');

    existing.update({
      name: input.name,
      description: input.description,
      stateId: input.stateId,
      userId: input.userId,
    });

    await this.repo.update(existing);
    return existing;
  }
}
