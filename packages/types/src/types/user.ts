interface IUser {
    name: string | null;
    email: string;
    password: string;
    id: number;
    username: string | null;
    createdAt: Date;
}

export type { IUser };