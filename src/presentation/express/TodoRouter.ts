import express from 'express';
import { TodoController } from '../TodoController';
import { CreateTodoInput } from '../../domain/todo/Todo';

export function createTodoRouter(controller: TodoController) {
  const router = express.Router();

  router.post('/', async (req, res) => {
    // Map and validate incoming body into domain CreateTodoInput
    const body = req.body;
    
    const input: CreateTodoInput = {
      name: String(body.name),
      description: body.description === undefined ? undefined : String(body.description),
      stateId: String(body.stateId),
    };

    try {
      const todo = await controller.createTodo(input);
      res.status(201).json(todo.toJSON());
    } catch (err) {
      res.status(500).json({ error: String(err) });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const todos = await controller.listTodos();
      res.json(todos.map(t => t.toJSON()));
    } catch (err) {
      res.status(500).json({ error: String(err) });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const id = String(req.params.id);
      const todo = await controller.getById(id);
      if (!todo) return res.status(404).json({ error: 'Not found' });
      res.json(todo.toJSON());
    } catch (err) {
      res.status(500).json({ error: String(err) });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const id = String(req.params.id);
      const body = req.body;
      const input = {
        id,
        name: body.name === undefined ? undefined : String(body.name),
        description: body.description === undefined ? undefined : String(body.description),
        stateId: body.stateId === undefined ? undefined : String(body.stateId),
      };

      const updated = await controller.updateById(input);
      res.json(updated.toJSON());
    } catch (err) {
      if (String(err).includes('not found')) return res.status(404).json({ error: 'Not found' });
      res.status(500).json({ error: String(err) });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const id = String(req.params.id);
      await controller.deleteById(id);
      res.status(204).send();
    } catch (err) {
      if (String(err).includes('not found')) return res.status(404).json({ error: 'Not found' });
      res.status(500).json({ error: String(err) });
    }
  });

  return router;
}
