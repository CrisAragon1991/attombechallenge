"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodoRouter = createTodoRouter;
const express_1 = __importDefault(require("express"));
function createTodoRouter(controller) {
    const router = express_1.default.Router();
    router.post('/', async (req, res) => {
        // Map and validate incoming body into domain CreateTodoInput
        const body = req.body;
        const input = {
            name: String(body.name),
            description: body.description === undefined ? undefined : String(body.description),
            stateId: String(body.stateId),
        };
        try {
            const todo = await controller.createTodo(input);
            res.status(201).json(todo.toJSON());
        }
        catch (err) {
            res.status(500).json({ error: String(err) });
        }
    });
    router.get('/', async (req, res) => {
        try {
            const todos = await controller.listTodos();
            res.json(todos.map(t => t.toJSON()));
        }
        catch (err) {
            res.status(500).json({ error: String(err) });
        }
    });
    return router;
}
