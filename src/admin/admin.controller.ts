import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from "express";
import { prisma } from "../services/prisma";

export class AdminController {
    static index(req: Request, res: Response, next: NextFunction) {
        res.render('admin/index', {
            title: 'Admin',
        });
    }

    static async users(req: Request, res: Response, next: NextFunction) {
        const users = await prisma.user.findMany();
        res.render('admin/users', {
            title: 'Admin - Users',
            users
        });
    }

    static deleteUser(req: Request, res: Response, next: NextFunction) {
        prisma.user.delete({
            where: {
                name : req.params.name
            }
        }).then(() => {
            res.redirect('/admin/users');
        }).catch((error) => {
            next(error);
        });
    }

    static newForm(req: Request, res: Response, next: NextFunction) {
        res.render('admin/users_form', {
            title: 'Admin - New User',
            btnText: 'Create'
        });
    }

    static async newUser(req: Request, res: Response, next: NextFunction) {
        await prisma.user.create({
            data: {
                name: req.body.name,
                hashedPassword: bcrypt.hashSync(req.body.password, 10),
            }
        }).then(() => {
            res.redirect('/admin/users');
        }).catch((error) => {
            next(`test: ${error}`);
        });
    }

    static async editUserForm(req: Request, res: Response, next: NextFunction) {
        const user = await prisma.user.findUnique({
            where: {
                name: req.params.name
            }
        });
        res.render('admin/users_form', {
            title: 'Admin - Edit User',
            btnText: 'Edit',
            user
        });
    }

    static async editUser(req: Request, res: Response, next: NextFunction) {
        const user = await prisma.user.findUnique({
            where: {
                name: req.params.name
            }
        });
    
        const { password } = req.body;
    
        let hashedPassword = user?.hashedPassword;
        if (user && user.hashedPassword !== password) {
            hashedPassword = bcrypt.hashSync(password, 10);
        }
    
        await prisma.user.update({
            where: {
                name: req.params.name
            },
            data: {
                name: req.body.name,
                hashedPassword: hashedPassword,
            }
        }).then(() => {
            res.redirect('/admin/users');
        }).catch((error) => {
            next(`test: ${error}`);
        });
    }
}
