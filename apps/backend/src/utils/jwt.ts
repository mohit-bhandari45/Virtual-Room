import { IUser } from "@/types/user";
import jwt from "jsonwebtoken";

const secret: string = "mohirwg";

function encode(user: IUser): string {
    const payload = {
        id: user.id,
        email: user.email
    };

    const token: string = jwt.sign(payload, secret);
    return token;
}

export { encode };