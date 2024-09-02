import { ValidationChain, body } from "express-validator";
import { languageValidator } from "../languages/languages.middlewares";

export function snippetsValidator(): ValidationChain[] {
    return [
        body('title').isLength({ min: 5, max: 50 }).withMessage('Le titre doit comporter entre 5 et 50 caractères'),
        body('lang').isInt().withMessage('L\'ID de langage n\'est pas valide'),
        body('code').isLength({ min: 1, max: 1000 }).withMessage('Le code doit comporter entre 1 et 1000 caractères'),
        body('description').isLength({ max: 1000 }).withMessage('La description doit comporter moins de 1000 caractères'),
    ];
}
