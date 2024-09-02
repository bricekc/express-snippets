import { Request, Response, NextFunction } from "express";
import { prisma } from "../services/prisma";
import { languageValidator } from "../languages/languages.middlewares";
import { validationResult } from "express-validator";

export class SnippetsController {
    static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        const langId = req.query.lang;
        let _snippets;
        if (langId !== undefined) {
            const isValid = await languageValidator(langId);
            if (!isValid) {
                const error = new Error('Invalid language parameter');
                error.name = 'BadRequestError';
                return next(error);
            }
            _snippets = await prisma.snippet.findMany({
                orderBy: {
                    creationDate: 'desc',
                },
                include: {
                    Language: true,
                    User: true
                },
                where: {
                    Language: {
                        id: Number(langId)
                    }
                }
            });
        }
        else {
            _snippets = await prisma.snippet.findMany({
                orderBy: {
                    creationDate: 'desc',
                },
                include: {
                    Language: true,
                    User: true
                },
            });
        }

        res.render('snippets/snippets_list', { 
            title: "Snippets", 
            snippets: _snippets 
        });
    }

    static async newForm(req: Request, res: Response): Promise<void> {
        const _snippet = {
            title: '',
            lang: 1,
            code: '',
            description: ''
        }
        const languages = await prisma.language.findMany();
        const btnText = "Créer";
        res.render('snippets/snippets_form', { title: "New Snippet", _snippet, languages, btnText });
    }

    static newSnippet(req: Request, res: Response, next: NextFunction): void {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            throw new Error('Invalid form data');
        }

        const { title, code, description, lang } = req.body;
        const username = req.session!.user?.name;
        prisma.snippet.create({
            data: {
                title,
                code,
                description,
                creationDate: new Date(),
                Language: {
                    connect: {
                        id: Number(lang)
                    }
                },
                User: {
                    connect: {
                        name: username
                    }
                }
            }
        }).then(() => {
            res.redirect('/');
        }).catch((err) => {
            next(err);
        });
    }


    static async editForm(req: Request, res: Response): Promise<void> {
        const languages = await prisma.language.findMany();
        const _snippet = await prisma.snippet.findUnique({
            where: {
                id: Number(req.params.id)
            },
            include: {
                Language: true,
                User: true
            }
        });
        const btnText = "Modifier";
        res.render('snippets/snippets_form', { title: "Edit Snippet", _snippet, languages, btnText });
    }

    static editSnippet(req: Request, res: Response, next: NextFunction): void {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            throw new Error('Invalid form data');
        }

        const { title, code, description, lang } = req.body;
        const username = req.session!.user?.name;
        prisma.snippet.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                title,
                code,
                description,
                Language: {
                    connect: {
                        id: Number(lang)
                    }
                },
                User: {
                    connect: {
                        name: username
                    }
                }
            }
        }).then(() => {
            res.redirect('/');
        }).catch((err) => {
            next(err);
        });
    }

    static deleteSnippet(req: Request, res: Response, next: NextFunction): void {
        prisma.snippet.delete({
            where: {
                id: Number(req.params.id)
            }
        }).then(() => {
            res.redirect('/');
        }).catch((err) => {
            next(err);
        });
    }
}
