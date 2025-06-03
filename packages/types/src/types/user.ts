interface IUser {
    name: string | null;
    email: string;
    password: string;
    avatar: string;
    id: string;
    username: string | null;
    createdAt: Date;
}

export type { IUser };