import express from 'express';
import { TodoController } from '../TodoController';
import { CreateTodoInput } from '../../domain/todo/Todo';
import { authenticateJWT } from '../../shared/authenticateJWT';
import { GeneralResponse } from '../../shared/GeneralResponse';
import { asyncHandler } from '../../shared/asyncHandler';
import { validationMiddleware } from '../../shared/validationMiddleware';
import { val } from '../../shared/validations';

export function createTodoRouter(controller: TodoController) {
  const router = express.Router();

  router.use(authenticateJWT);

  router.post(
    '/',
    validationMiddleware(val.validacionesTodoCreate),
    asyncHandler(async (req, res) => {
      const input: CreateTodoInput = req.requestObjectData;
      const todo = await controller.createTodo(input);
      const response: GeneralResponse<any> = { success: true, data: todo };
      res.status(201).json(response);
    })
  );

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      const todos = await controller.listTodos();
      const response: GeneralResponse<any> = { success: true, data: todos };
      res.json(response);
    })
  );

  router.get(
    '/:id',
    validationMiddleware(val.validacionesId),
    asyncHandler(async (req, res) => {
      const id = req.requestObjectData.id ?? req.params.id;
      const todo = await controller.getById(id);
      if (!todo) {
        throw new Error('Not found');
      }
      const response: GeneralResponse<any> = { success: true, data: todo };
      res.json(response);
    })
  );

  router.put(
    '/:id',
    validationMiddleware(val.validacionesTodoUpdate),
    asyncHandler(async (req, res) => {
      const input = { ...req.requestObjectData, id: req.params.id };
      const updated = await controller.updateById(input);
      const response: GeneralResponse<any> = { success: true, data: updated };
      res.json(response);
    })
  );

  router.delete(
    '/:id',
    validationMiddleware(val.validacionesId),
    asyncHandler(async (req, res) => {
      const id = req.requestObjectData.id ?? req.params.id;
      await controller.deleteById(id);
      const response: GeneralResponse<any> = { success: true, data: null };
      res.json(response);
    })
  );

  return router;
}
