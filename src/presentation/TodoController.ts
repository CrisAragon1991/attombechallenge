import { CreateTodoInput, UpdateTodoInput } from '../domain/todo/Todo';
import { injectable, inject } from 'tsyringe';
import { ICreateTodoUseCase } from '../application/usecases/interfaces/ICreateTodoUseCase';
import { IGetTodosUseCase } from '../application/usecases/interfaces/IGetTodosUseCase';
import { IUpdateTodoUseCase } from '../application/usecases/interfaces/IUpdateTodoUseCase';
import { IDeleteTodoUseCase } from '../application/usecases/interfaces/IDeleteTodoUseCase';
import { INTERFACETOKENS } from '../shared/InterfaceTokens';

@injectable()
export class TodoController {
  constructor(
    @inject(INTERFACETOKENS.ICreateTodoUseCase) private createTodoUseCase: ICreateTodoUseCase,
    @inject(INTERFACETOKENS.IGetTodosUseCase) private getUseCase: IGetTodosUseCase,
    @inject(INTERFACETOKENS.IUpdateTodoUseCase) private updateUseCase: IUpdateTodoUseCase,
    @inject(INTERFACETOKENS.IDeleteTodoUseCase) private deleteUseCase: IDeleteTodoUseCase,
  ) {}

  async createTodo(input: CreateTodoInput, userId: string) {
    return this.createTodoUseCase.execute({ ...input, userId });
  }

  async listTodos(userId: string) {
    return this.getUseCase.execute(userId);
  }

  async getById(id: string, userId: string) {
    return this.getUseCase.execute(userId).then(list => list.find(t => t.id === id) ?? null);
  }

  async updateById(input: UpdateTodoInput, userId: string) {
    return this.updateUseCase.execute({ ...input, userId });
  }

  async deleteById(id: string, userId: string) {
    return this.deleteUseCase.execute(id, userId);
  }
}
