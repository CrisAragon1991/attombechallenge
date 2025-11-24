"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
class TodoController {
    constructor(createUseCase, getUseCase) {
        this.createUseCase = createUseCase;
        this.getUseCase = getUseCase;
    }
    async createTodo(input) {
        return this.createUseCase.execute(input);
    }
    async listTodos() {
        return this.getUseCase.execute();
    }
}
exports.TodoController = TodoController;
