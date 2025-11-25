"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const ToDoFireStoreRepository_1 = require("./infra/repositories/ToDoFireStoreRepository");
const CreateTodoUseCase_1 = require("./application/usecases/CreateTodoUseCase");
const GetTodosUseCase_1 = require("./application/usecases/GetTodosUseCase");
const TodoController_1 = require("./presentation/TodoController");
const TodoRouter_1 = require("./presentation/express/TodoRouter");
const diTokens_1 = require("./shared/diTokens");
const UpdateTodoUseCase_1 = require("./application/usecases/UpdateTodoUseCase");
const DeleteTodoUseCase_1 = require("./application/usecases/DeleteTodoUseCase");
const UserFireStoreRepository_1 = require("./infra/repositories/UserFireStoreRepository");
const CreateUserUseCase_1 = require("./application/usecases/CreateUserUseCase");
const UserController_1 = require("./presentation/UserController");
const UserRouter_1 = require("./presentation/express/UserRouter");
const FindUserByEmailUseCase_1 = require("./application/usecases/FindUserByEmailUseCase");
async function main() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    // Register dependencies in the DI container (use Firestore-backed repository)
    tsyringe_1.container.registerSingleton(diTokens_1.TOKENS.ITodoRepository, ToDoFireStoreRepository_1.ToDoFireStoreRepository);
    tsyringe_1.container.register(diTokens_1.TOKENS.ICreateTodoUseCase, { useClass: CreateTodoUseCase_1.CreateTodoUseCase });
    tsyringe_1.container.register(diTokens_1.TOKENS.IGetTodosUseCase, { useClass: GetTodosUseCase_1.GetTodosUseCase });
    tsyringe_1.container.register(diTokens_1.TOKENS.IUpdateTodoUseCase, { useClass: UpdateTodoUseCase_1.UpdateTodoUseCase });
    tsyringe_1.container.register(diTokens_1.TOKENS.IDeleteTodoUseCase, { useClass: DeleteTodoUseCase_1.DeleteTodoUseCase });
    tsyringe_1.container.registerSingleton(diTokens_1.TOKENS.IUserRepository, UserFireStoreRepository_1.UserFireStoreRepository);
    tsyringe_1.container.register(diTokens_1.TOKENS.ICreateUserUseCase, { useClass: CreateUserUseCase_1.CreateUserUseCase });
    tsyringe_1.container.register(diTokens_1.TOKENS.IFindUserByEmailUseCase, { useClass: FindUserByEmailUseCase_1.FindUserByEmailUseCase });
    tsyringe_1.container.register('TodoController', { useClass: TodoController_1.TodoController });
    tsyringe_1.container.register('UserController', { useClass: UserController_1.UserController });
    const controller = tsyringe_1.container.resolve(TodoController_1.TodoController);
    const userController = tsyringe_1.container.resolve(UserController_1.UserController);
    app.use('/users', (0, UserRouter_1.createUserRouter)(userController));
    app.use('/todos', (0, TodoRouter_1.createTodoRouter)(controller));
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`);
    });
}
main().catch(err => {
    console.error(err);
    process.exit(1);
});
