import express from 'express';
import { UserController } from '../UserController';
import { GeneralResponse } from '../../shared/GeneralResponse';

export function createUserRouter(controller: UserController) {
  const router = express.Router();

  router.post('/', async (req, res) => {
    try {
      const email = String(req.body.email);
      const user = await controller.register(email);
      const response: GeneralResponse<any> = { success: true, data: user };
      res.status(201).json(response);
    } catch (err) {
      res.status(500).json({ success: false, error: String(err) });
    }
  });

  router.post('/user-search', async (req, res) => {
    try {
      const email = String(req.body.email);
      const token = await controller.login(email);
      const response: GeneralResponse<{ token: string }> = { success: true, data: { token } };
      res.json(response);
    } catch (err) {
      res.status(404).json({ success: false, error: String(err) });
    }
  });

  return router;
}
