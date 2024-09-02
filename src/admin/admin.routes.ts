import express, { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { AdminController } from './admin.controller';

export const adminRouter = Router();

adminRouter.get('/', expressAsyncHandler(AdminController.index));
adminRouter.get('/users', expressAsyncHandler(AdminController.users));
adminRouter.get('/users/delete/:name', expressAsyncHandler(AdminController.deleteUser));

adminRouter.get('/users/new', expressAsyncHandler(AdminController.newForm));
adminRouter.post('/users/new', express.urlencoded({extended : true}), expressAsyncHandler(AdminController.newUser));

adminRouter.get('/users/edit/:name', expressAsyncHandler(AdminController.editUserForm));
adminRouter.post('/users/edit/:name', express.urlencoded({extended : true}), expressAsyncHandler(AdminController.editUser));
