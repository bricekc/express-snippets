import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { AuthController } from './auth.controller';
import { isConnected } from './auth.middleware';

export const authRouter = express.Router();

authRouter.get('/', expressAsyncHandler(AuthController.loginForm));

authRouter.post('/login',express.urlencoded({extended : true}), expressAsyncHandler(AuthController.login));

authRouter.get('/logout', isConnected, expressAsyncHandler(AuthController.logout));