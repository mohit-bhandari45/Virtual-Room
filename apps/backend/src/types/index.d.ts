import { IUser } from "@virtualroom/types";

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}