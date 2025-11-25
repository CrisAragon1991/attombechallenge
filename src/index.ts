import 'reflect-metadata';
import express from 'express';
import { container } from 'tsyringe';
import { ToDoFireStoreRepository } from './infra/repositories/ToDoFireStoreRepository';
import { CreateTodoUseCase } from './application/usecases/CreateTodoUseCase';
import { GetTodosUseCase } from './application/usecases/GetTodosUseCase';
import { TodoController } from './presentation/TodoController';
import { createTodoRouter } from './presentation/express/TodoRouter';
import { INTERFACETOKENS } from './shared/InterfaceTokens';
import { UpdateTodoUseCase } from './application/usecases/UpdateTodoUseCase';
import { DeleteTodoUseCase } from './application/usecases/DeleteTodoUseCase';
import { UserFireStoreRepository } from './infra/repositories/UserFireStoreRepository';
import { CreateUserUseCase } from './application/usecases/CreateUserUseCase';
import { UserController } from './presentation/UserController';
import { createUserRouter } from './presentation/express/UserRouter';
import { FindUserByEmailUseCase } from './application/usecases/FindUserByEmailUseCase';
import { InitFireStore } from './infra/InitFireStore';

async function main() {

  const app = express();
  app.use(express.json());
  new InitFireStore();

  // Register dependencies in the DI container (use Firestore-backed repository)
  container.registerSingleton(INTERFACETOKENS.ITodoRepository, ToDoFireStoreRepository);
  container.register(INTERFACETOKENS.ICreateTodoUseCase, { useClass: CreateTodoUseCase });
  container.register(INTERFACETOKENS.IGetTodosUseCase, { useClass: GetTodosUseCase });
  container.register(INTERFACETOKENS.IUpdateTodoUseCase, { useClass: UpdateTodoUseCase });
  container.register(INTERFACETOKENS.IDeleteTodoUseCase, { useClass: DeleteTodoUseCase });
  container.registerSingleton(INTERFACETOKENS.IUserRepository, UserFireStoreRepository);
  container.register(INTERFACETOKENS.ICreateUserUseCase, { useClass: CreateUserUseCase });
  container.register(INTERFACETOKENS.IFindUserByEmailUseCase, { useClass: FindUserByEmailUseCase });
  
  container.register('TodoController', { useClass: TodoController });
  container.register('UserController', { useClass: UserController });
  

  const controller = container.resolve(TodoController);
  const userController = container.resolve(UserController);

  app.use('/users', createUserRouter(userController));

  app.use('/todos', createTodoRouter(controller));

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
