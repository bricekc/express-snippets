import express from 'express';
import { LanguagesController } from './languages.controller';
import expressAsyncHandler from 'express-async-handler';

export const languagesRouter = express.Router();

languagesRouter.get('/', expressAsyncHandler(LanguagesController.list));
