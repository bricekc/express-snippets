import { Request, Response, NextFunction } from 'express';
import { prisma } from '../services/prisma';
                
export function sessionUser(req: Request, res: Response, next: NextFunction): void {
    res.locals.user = req.session.user;
    next();
}

export function isConnected(req: Request, res: Response, next: NextFunction): void {
    if (req.session.user) {
        next();
    }
    else {
        res.redirect('/auth');
    }
}

export async function isAuthorConnected(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = req.session.user;
    const author = await prisma.snippet.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            User: true
        }
    }); 
    if (user && author?.User?.name === user.name) {
        next();
    }
    else {
        res.redirect('/');
    }
}