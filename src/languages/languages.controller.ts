import { Request, Response, NextFunction } from "express";
import { prisma } from "../services/prisma";

export class LanguagesController {
    static async list(req: Request, res: Response, next: NextFunction) {
        const _languages = await prisma.language.findMany({
            orderBy: {
                name: 'asc',
            },
            include: {
                _count: {
                    select: {
                        snippets: true,
                    }
                }
            }
        });
        console.log('first', _languages)
        res.render('languages/languages_list', {
            title: 'Languages',
            languages: _languages,
        });
    }
}