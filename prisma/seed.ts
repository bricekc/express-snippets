import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
    
const prisma = new PrismaClient();
    
async function main() {
    await prisma.user.create({
        data: {
            name: 'kuca0002',
            hashedPassword: bcrypt.hashSync('azerty', 10),
        }
    });

    await prisma.user.create({
        data: {
            name: 'pluc0003',
            hashedPassword: bcrypt.hashSync('qsdfgh', 10),
            role: 'ADMIN' 
        }
    });

    await prisma.language.create({
        data: {
            name: 'C',
            htmlClass: 'language-c',
            logo: 'devicon-c-plain',
        }
    });

    await prisma.language.create({
        data: {
            name: 'HTML',
            htmlClass: 'language-html',
            logo: 'devicon-html5-plain',
        }
    });
    
    await prisma.snippet.create({
        data: {
            title: 'Hello World',
            code:
`main()
{
    printf("hello, world\\n");
}`,
            description: 'Code original publié dans "The C Programming Language" de Brian Kernighan et Dennis Ritchie.',
            creationDate: new Date(2023, 4, 8, 9, 12, 36),
            Language: {
                connect: {
                    name: 'C'
                }
            },
            User: {
                connect: {
                    name: 'kuca0002'
                }
            }
        }
    });

    await prisma.snippet.create({
        data: {
            title: 'Il faut protéger ses chaînes de caractères',
            code: '<script>window.alert("Injection !")</script>',
            creationDate: new Date(2023, 3, 4, 5, 6, 7),
            description: 'Dans le template EJS, observez le comportement de la page en utilisant successivement les balises <%- et <%=pour injecter les données.', 
            Language: {
                connect: {
                    name: 'HTML'
                }
            },
            User: {
                connect: {
                    name: 'kuca0002'
                }
            }
        }
    });

    await prisma.snippet.create({
        data: {
            title: 'Télécharger un fichier',
            code: '<a href="/download" download="fichier.txt">Télécharger</a>',
            creationDate: new Date(2023, 3, 4, 5, 6, 7),
            description: 'Dans le template EJS, observez le comportement de la page en utilisant successivement les balises <%- et <%=pour injecter les données.', 
            Language: {
                connect: {
                    name: 'HTML'
                }
            },
            User: {
                connect: {
                    name: 'pluc0003'
                }
            }
        }
    });
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
