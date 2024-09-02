import { Request, Response, NextFunction } from 'express';
import { prisma } from '../services/prisma';

export function isAdmin(req: Request, res: Response, next: NextFunction): void {
    if (req.session.user && req.session.user.role === 'ADMIN') {
        next();
    }
    else {
        throw new Error('Vous n\'êtes pas administrateur');
    }
}