import { prisma } from "../services/prisma";

export async function languageValidator(languageId: any): Promise<boolean> {
    // lance une erreur si le paramètre ne correspond à aucun langage de la base. Sinon, retourne true.
    const _language = await prisma.language.findUnique({
        where: {
            id: Number(languageId)
        }
    });
    if (_language === null) {
        throw new Error('Invalid language parameter');
    }
    return true;
    
}