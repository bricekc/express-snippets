import { Request, Response, NextFunction } from "express";
import { prisma } from "../services/prisma";
import bcrypt from 'bcrypt';
export class AuthController {
    static loginForm(req: Request, res: Response, next: NextFunction) {
        res.render('auth/login', {
            title: 'Login',
        });
    }
    static async login(req: Request, res: Response, next: NextFunction) {
        let name = req.body.name;
        let password = req.body.password;
        const user = await prisma.user.findUnique({
            where: {
                name: name
            }
        });
        if (user)
        {
            const match = await bcrypt.compare(password, user.hashedPassword);
            if (!match) {
                throw new Error('Mot de passe incorrect');
            }
            req.session.regenerate(() => {
                req.session.user = user;
                res.redirect('/');
            });
        } 
        else {
            throw new Error('Utilisateur inconnu');
        }
    };

    static async logout(req: Request, res: Response, next: NextFunction) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    }
}