
import { ITodoRepository } from '../../domain/todo/ITodoRepository';
import { Todo } from '../../domain/todo/Todo';
import { injectable, inject } from 'tsyringe';
import { IGetTodosUseCase } from './interfaces/IGetTodosUseCase';
import { INTERFACETOKENS } from '../../shared/InterfaceTokens';

@injectable()
export class GetTodosUseCase implements IGetTodosUseCase {
  constructor(@inject(INTERFACETOKENS.ITodoRepository) private repo: ITodoRepository) {}

  async execute(userId: string): Promise<Todo[]> {
    return this.repo.findAllByUserId(userId);
  }
}
