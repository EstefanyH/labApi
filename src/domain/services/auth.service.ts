import { User } from "../models/user.models";

export interface AuthService {
    findUser(username: string, password: string): Promise<User | null>;
}