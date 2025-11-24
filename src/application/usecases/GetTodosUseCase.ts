import { ITodoRepository } from '../../domain/todo/ITodoRepository';
import { Todo } from '../../domain/todo/Todo';
import { injectable, inject } from 'tsyringe';
import { IGetTodosUseCase } from './interfaces/IGetTodosUseCase';
import { TOKENS } from '../../shared/diTokens';

@injectable()
export class GetTodosUseCase implements IGetTodosUseCase {
  constructor(@inject(TOKENS.ITodoRepository) private repo: ITodoRepository) {}

  async execute(): Promise<Todo[]> {
    return this.repo.findAll();
  }
}
