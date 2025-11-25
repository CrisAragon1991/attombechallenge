import { body, param } from 'express-validator';

export const val = {
  validacionesUsuario: [
    body('email').isString().notEmpty().isEmail()
  ],
  validacionesUsuarioRefresh: [
    body('refreshToken').isString().notEmpty()
  ],
  validacionesTodoCreate: [
    body('name').isString().notEmpty(),
    body('stateId').isString().notEmpty(),
    body('description').optional().isString()
  ],
  validacionesTodoUpdate: [
    param('id').isUUID(),
    body('name').optional().isString(),
    body('stateId').optional().isString(),
    body('description').optional().isString()
  ],
  validacionesId: [
    param('id').isUUID()
  ]
};
