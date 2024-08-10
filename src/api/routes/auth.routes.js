import express from 'express';
import { validate } from '../middleware/validate.middleware.js';
import { loginSchema } from '../validators/user.validator.js';
import { login } from '../controllers/user.controller.js';



const router = express.Router();

router.route('/login').post(validate(loginSchema), login)


export {router as authRoutes};