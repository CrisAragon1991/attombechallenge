import { ITodoRepository } from '../..//domain/todo/ITodoRepository';
import { Todo, UpdateTodoInput } from '../../domain/todo/Todo';
import { injectable, inject } from 'tsyringe';
import { IUpdateTodoUseCase } from './interfaces/IUpdateTodoUseCase';
import { TOKENS } from '../../shared/diTokens';

@injectable()
export class UpdateTodoUseCase implements IUpdateTodoUseCase {
  constructor(@inject(TOKENS.ITodoRepository) private repo: ITodoRepository) {}

  async execute(input: UpdateTodoInput): Promise<Todo> {
    const existing = await this.repo.findById(input.id);
    if (!existing) throw new Error('Todo not found');

    existing.update({
      name: input.name,
      description: input.description,
      stateId: input.stateId,
    });

    await this.repo.update(existing);
    return existing;
  }
}
