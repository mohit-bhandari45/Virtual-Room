interface IUser {
    name: string | null;
    email: string;
    password: string;
    id: string;
    username: string | null;
    createdAt: Date;
}

export type { IUser };