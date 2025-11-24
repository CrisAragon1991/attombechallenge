import 'reflect-metadata';
import express from 'express';
import { container } from 'tsyringe';
import { FireStoreRepository } from './infra/repositories/FireStoreRepository';
import { CreateTodoUseCase } from './application/usecases/CreateTodoUseCase';
import { GetTodosUseCase } from './application/usecases/GetTodosUseCase';
import { TodoController } from './presentation/TodoController';
import { createTodoRouter } from './presentation/express/TodoRouter';
import { TOKENS } from './shared/diTokens';
import { UpdateTodoUseCase } from './application/usecases/UpdateTodoUseCase';
import { DeleteTodoUseCase } from './application/usecases/DeleteTodoUseCase';

async function main() {
  
  const app = express();
  app.use(express.json());

  // Register dependencies in the DI container (use Firestore-backed repository)
  container.registerSingleton(TOKENS.ITodoRepository, FireStoreRepository);
  container.register(TOKENS.ICreateTodoUseCase, { useClass: CreateTodoUseCase });
  container.register(TOKENS.IGetTodosUseCase, { useClass: GetTodosUseCase });
  container.register(TOKENS.IUpdateTodoUseCase, { useClass: UpdateTodoUseCase });
  container.register(TOKENS.IDeleteTodoUseCase, { useClass: DeleteTodoUseCase });
  container.register('TodoController', { useClass: TodoController });

  const controller = container.resolve(TodoController);

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
