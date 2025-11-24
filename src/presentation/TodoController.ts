import { CreateTodoInput, UpdateTodoInput } from '../domain/todo/Todo';
import { injectable, inject } from 'tsyringe';
import { ICreateTodoUseCase } from '../application/usecases/interfaces/ICreateTodoUseCase';
import { IGetTodosUseCase } from '../application/usecases/interfaces/IGetTodosUseCase';
import { IUpdateTodoUseCase } from '../application/usecases/interfaces/IUpdateTodoUseCase';
import { IDeleteTodoUseCase } from '../application/usecases/interfaces/IDeleteTodoUseCase';
import { TOKENS } from '../shared/diTokens';

@injectable()
export class TodoController {
  constructor(
    @inject(TOKENS.ICreateTodoUseCase) private createUseCase: ICreateTodoUseCase,
    @inject(TOKENS.IGetTodosUseCase) private getUseCase: IGetTodosUseCase,
    @inject(TOKENS.IUpdateTodoUseCase) private updateUseCase: IUpdateTodoUseCase,
    @inject(TOKENS.IDeleteTodoUseCase) private deleteUseCase: IDeleteTodoUseCase,
  ) {}

  async createTodo(input: CreateTodoInput) {
    return this.createUseCase.execute(input);
  }

  async listTodos() {
    return this.getUseCase.execute();
  }

  async getById(id: string) {
    return this.getUseCase.execute().then(list => list.find(t => t.id === id) ?? null);
  }

  async updateById(input: UpdateTodoInput) {
    return this.updateUseCase.execute(input);
  }

  async deleteById(id: string) {
    return this.deleteUseCase.execute(id);
  }
}
