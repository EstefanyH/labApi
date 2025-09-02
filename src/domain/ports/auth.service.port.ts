import { User } from "../models/uer.models";

export interface AuthServicePort {
    generateToken(user: User): String;
    verifyToken(token: string): { userId: String };
    validatePassword(password: string, hashedPassword: string): Promise<boolean>;
}