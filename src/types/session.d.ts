export type User = {
    name: string;
    hashedPassword: string;
    snippets?: Snippet[];
    role: Role;
}