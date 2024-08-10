import express from 'express';
import { validate } from '../middleware/validate.middleware.js';
import { addUserSchema } from '../validators/user.validator.js';
import { addUser } from '../controllers/user.controller.js';
import { verifyJwt } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/add-user').post(verifyJwt, validate(addUserSchema), addUser);

export { router as userRoutes};
