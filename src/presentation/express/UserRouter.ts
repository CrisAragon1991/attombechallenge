import express from 'express';
import { UserController } from '../UserController';
import { GeneralResponse } from '../../shared/GeneralResponse';
import { generateToken } from '../../shared/GenerateJwt';
import { asyncHandler } from '../../shared/asyncHandler';
import { validationMiddleware } from '../../shared/validationMiddleware';
import { val } from '../../shared/validations';

export function createUserRouter(controller: UserController) {
  const router = express.Router();

  router.post(
    '/',
    validationMiddleware(val.validacionesUsuario),
    asyncHandler(async (req, res) => {
      const { email } = req.requestObjectData;
      const user = await controller.register(email);
      const response: GeneralResponse<any> = { success: true, data: user };
      res.status(201).json(response);
    })
  );

  router.post(
    '/search',
    validationMiddleware(val.validacionesUsuario),
    asyncHandler(async (req, res) => {
      const { email } = req.requestObjectData;
      const user = await controller.login(email);
      const token = generateToken(user); 
      const refreshToken = generateToken(user, '24h'); 
      const response: GeneralResponse<{ token: string, refreshToken: string, email: string }> = { success: true, data: { token, refreshToken, email } };
      res.json(response);
    })
  );

  router.post(
    '/refresh-token',
    validationMiddleware(val.validacionesUsuarioRefresh),
    asyncHandler(async (req, res) => {
      let { refreshToken } = req.requestObjectData;
      const user = await controller.refreshToken(refreshToken);
      const token = generateToken(user); 
      refreshToken = generateToken(user, '24h'); 
      const response: GeneralResponse<{ token: string, refreshToken: string, email: string }> = { success: true, data: { token, refreshToken, email: user.email } };
      res.json(response);
    })
  );

  return router;
}
