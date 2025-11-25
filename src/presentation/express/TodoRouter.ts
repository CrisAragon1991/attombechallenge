import express from 'express';
import { TodoController } from '../TodoController';
import { CreateTodoInput } from '../../domain/todo/Todo';
import { authenticateJWT } from '../../shared/authenticateJWT';
import { GeneralResponse } from '../../shared/GeneralResponse';
import { asyncHandler } from '../../shared/asyncHandler';

export function createTodoRouter(controller: TodoController) {
  const router = express.Router();

  router.use(authenticateJWT);

  router.post('/', asyncHandler(async (req, res) => {
    const body = req.body;
    const input: CreateTodoInput = {
      name: String(body.name),
      description: body.description === undefined ? undefined : String(body.description),
      stateId: String(body.stateId),
    };
    const todo = await controller.createTodo(input);
    const response: GeneralResponse<any> = { success: true, data: todo };
    res.status(201).json(response);
  }));

  router.get('/', asyncHandler(async (req, res) => {
    const todos = await controller.listTodos();
    const response: GeneralResponse<any> = { success: true, data: todos };
    res.json(response);
  }));

  router.get('/:id', asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const todo = await controller.getById(id);
    if (!todo) {
      throw new Error('Not found');
    }
    const response: GeneralResponse<any> = { success: true, data: todo };
    res.json(response);
  }));

  router.put('/:id', asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const body = req.body;
    const input = {
      id,
      name: body.name === undefined ? undefined : String(body.name),
      description: body.description === undefined ? undefined : String(body.description),
      stateId: body.stateId === undefined ? undefined : String(body.stateId),
    };
    const updated = await controller.updateById(input);
    const response: GeneralResponse<any> = { success: true, data: updated };
    res.json(response);
  }));

  router.delete('/:id', asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    await controller.deleteById(id);
    const response: GeneralResponse<any> = { success: true, data: null };
    res.json(response);
  }));

  return router;
}
