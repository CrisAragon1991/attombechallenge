import { ITodoRepository } from '../../domain/todo/ITodoRepository';
import { injectable, inject } from 'tsyringe';
import { IDeleteTodoUseCase } from './interfaces/IDeleteTodoUseCase';
import { INTERFACETOKENS } from '../../shared/InterfaceTokens';

@injectable()
export class DeleteTodoUseCase implements IDeleteTodoUseCase {
  constructor(@inject(INTERFACETOKENS.ITodoRepository) private repo: ITodoRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repo.findById(id);
    if (!existing) throw new Error('Todo not found');
    await this.repo.delete(id);
  }
}
