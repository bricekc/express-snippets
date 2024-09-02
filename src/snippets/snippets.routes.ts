import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { body } from 'express-validator';
import { isAuthorConnected, isConnected } from '../auth/auth.middleware';
import { languageValidator } from '../languages/languages.middlewares';
import { SnippetsController } from './snippets.controller';
import { snippetsValidator } from './snippets.middleware';

export const snippetsRouter = express.Router();

snippetsRouter.get('/', 
    body('lang').custom((async (value) => {
        if (value !== undefined) {
            const isValid = await languageValidator(value);
            if (!isValid) {
                throw new Error('Invalid language parameter');
            }
        }
        return true;
    })),
    async (req: { query: { lang: string; }; }, res, next) => {
        const langId = req.query.lang;
        if (langId !== undefined) {
            const isValid = await languageValidator(langId);
            if (!isValid) {
                const error = new Error('Invalid language parameter');
                error.name = 'BadRequestError';
                return next(error);
            }
        }
        return next();
    },
    expressAsyncHandler(SnippetsController.list)
);

snippetsRouter.get('/new', isConnected, SnippetsController.newForm);
snippetsRouter.post('/new', 
    express.urlencoded({ extended: true }),
    snippetsValidator(),
    SnippetsController.newSnippet
);

snippetsRouter.get('/edit/:id', isConnected, isAuthorConnected, SnippetsController.editForm);
snippetsRouter.post('/edit/:id',
    express.urlencoded({ extended: true }),
    snippetsValidator(),
    SnippetsController.editSnippet
);

snippetsRouter.get('/delete/:id', isConnected, isAuthorConnected, SnippetsController.deleteSnippet);