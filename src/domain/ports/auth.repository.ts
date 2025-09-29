import { User } from "../models/user.models";

export interface AuthRepositoryPort {
    //generateToken(user: User): String;
    //verifyToken(token: string): { userId: String };
    //validatePassword(password: string, hashedPassword: string): Promise<boolean>;
    find(username: string, password: string): Promise<User | null>;
}