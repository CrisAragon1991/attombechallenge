"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const FireStoreRepository_1 = require("./infra/repositories/FireStoreRepository");
const CreateTodoUseCase_1 = require("./application/usecases/CreateTodoUseCase");
const GetTodosUseCase_1 = require("./application/usecases/GetTodosUseCase");
const TodoController_1 = require("./presentation/TodoController");
const TodoRouter_1 = require("./presentation/express/TodoRouter");
const diTokens_1 = require("./shared/diTokens");
const UpdateTodoUseCase_1 = require("./application/usecases/UpdateTodoUseCase");
const DeleteTodoUseCase_1 = require("./application/usecases/DeleteTodoUseCase");
async function main() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    // Register dependencies in the DI container (use Firestore-backed repository)
    tsyringe_1.container.registerSingleton(diTokens_1.TOKENS.ITodoRepository, FireStoreRepository_1.FireStoreRepository);
    tsyringe_1.container.register(diTokens_1.TOKENS.ICreateTodoUseCase, { useClass: CreateTodoUseCase_1.CreateTodoUseCase });
    tsyringe_1.container.register(diTokens_1.TOKENS.IGetTodosUseCase, { useClass: GetTodosUseCase_1.GetTodosUseCase });
    tsyringe_1.container.register(diTokens_1.TOKENS.IUpdateTodoUseCase, { useClass: UpdateTodoUseCase_1.UpdateTodoUseCase });
    tsyringe_1.container.register(diTokens_1.TOKENS.IDeleteTodoUseCase, { useClass: DeleteTodoUseCase_1.DeleteTodoUseCase });
    tsyringe_1.container.register('TodoController', { useClass: TodoController_1.TodoController });
    const controller = tsyringe_1.container.resolve(TodoController_1.TodoController);
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
