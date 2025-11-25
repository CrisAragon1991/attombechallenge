import express from 'express';
import { UserController } from '../UserController';
import { GeneralResponse } from '../../shared/GeneralResponse';
import { generateToken } from '../../shared/GenerateJwt';
import { asyncHandler } from '../../shared/asyncHandler';

export function createUserRouter(controller: UserController) {
  const router = express.Router();

  router.post('/', asyncHandler(async (req, res) => {
    const email = String(req.body.email);
    const user = await controller.register(email);
    const response: GeneralResponse<any> = { success: true, data: user };
    res.status(201).json(response);
  }));

  router.post('/search', asyncHandler(async (req, res) => {
    const email = String(req.body.email);
    const user = await controller.login(email);
    const token = generateToken(user); 
    const refreshToken = generateToken(user, '24h'); 
    const response: GeneralResponse<{ token: string, refreshToken: string, email: string }> = { success: true, data: { token, refreshToken, email } };
    res.json(response);
  }));

  router.post('/refresh-token', asyncHandler(async (req, res) => {
    var { refreshToken } = req.body;
    const user = await controller.refreshToken(refreshToken);
    const token = generateToken(user); 
    refreshToken = generateToken(user, '24h'); 
    const response: GeneralResponse<{ token: string, refreshToken: string, email: string }> = { success: true, data: { token, refreshToken, email: user.email } };
    res.json(response);
  }));

  return router;
}
