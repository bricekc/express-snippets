import express from 'express';
import 'dotenv/config';
import session from 'express-session';
import { snippetsRouter } from './snippets/snippets.routes';
import { Request, Response, NextFunction } from 'express';
import { languagesRouter } from './languages/languages.routes';
import { authRouter } from './auth/auth.routes';
import { User } from './types/session';
import { sessionUser } from './auth/auth.middleware';
import { adminRouter } from './admin/admin.routes';
import { isAdmin } from './admin/admin.middleware';

const port = process.env.port;
const app = express();
app.use(session({
    secret: process.env.session_secret!,
    saveUninitialized: false,
    resave: false
}));

declare module "express-session" {
    interface SessionData {
        user: User;
    }
}



app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/', sessionUser, snippetsRouter);
app.use('/languages', sessionUser, languagesRouter);
app.use('/auth', sessionUser, authRouter);
app.use('/admin',
    isAdmin,
    adminRouter
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`ERREUR : ${err.message}`);
    res.render('error', { err });
});

app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});
