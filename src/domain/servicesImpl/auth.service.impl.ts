import { AuthRepository } from "../../infraestructure/persistence/repositories/user.repository";
import { User } from "../models/user.models";
import { AuthService } from "../services/auth.service";

export class AuthServiceImpl implements AuthService{
    constructor(private _repo: AuthRepository) {}
    
    async findUser(username: string, password: string): Promise<User | null> {
        return await this._repo.find(username, password);
    }
     
}