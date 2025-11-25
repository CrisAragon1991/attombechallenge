import express from 'express';
import { UserController } from '../UserController';
import { GeneralResponse } from '../../shared/GeneralResponse';
import { generateToken } from '../../shared/GenerateJwt';

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

  router.post('/search', async (req, res) => {
    try {
      const email = String(req.body.email);
      const user = await controller.login(email);
      const token = generateToken(user); 
      const refreshToken = generateToken(user, '24h'); 
      const response: GeneralResponse<{ token: string, refreshToken: string, email: string }> = { success: true, data: { token, refreshToken, email } };
      res.json(response);
    } catch (err) {
      res.status(404).json({ success: false, error: String(err) });
    }
  });

  router.post('/refresh-token', async (req, res) => {
    try {
      var { refreshToken } = req.body;
      const user = await controller.refreshToken(refreshToken);
      const token = generateToken(user); 
      refreshToken = generateToken(user, '24h'); 
      const response: GeneralResponse<{ token: string, refreshToken: string, email: string }> = { success: true, data: { token, refreshToken, email: user.email } };
      res.json(response);
    } catch (err) {
      res.status(401).json({ success: false, error: String(err) });
    }
  });

  return router;
}
