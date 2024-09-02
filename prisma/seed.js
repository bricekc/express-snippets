"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.snippet.create({
        data: {
            title: 'Hello World',
            code: `main()
{
    printf("hello, world\\n");
}`,
            description: 'Code original publié dans "The C Programming Language" de Brian Kernighan et Dennis Ritchie.',
            creationDate: new Date(2023, 4, 8, 9, 12, 36),
        }
    });
    await prisma.snippet.create({
        data: {
            title: 'Il faut protéger ses chaînes de caractères',
            code: '<script>window.alert("Injection !")</script>',
            creationDate: new Date(2023, 3, 4, 5, 6, 7),
            description: 'Dans le template EJS, observez le comportement de la page en utilisant successivement les balises <%- et <%=pour injecter les données.',
        }
    });
}
main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
