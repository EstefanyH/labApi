import { ProfileRepository } from "../../infraestructure/persistence/repositories/profile.repository";
import { ApiResponse } from "../../shared/dto/api-response.dto";
import { Profile } from "../models/profile.models";
import { ProfileService } from "../services/profile.service";

export class ProfileServiceImpl implements ProfileService{
    constructor(private _repo: ProfileRepository) {}
    
    async create(model: Profile): Promise<Profile> {
        return await this._repo.save(model);
    }
    
    async findById(id: number): Promise<Profile | null> {
        return await this._repo.findById(id);;
    }
    
    async update(model: Profile): Promise<Profile> {
        return await this._repo.update(model);
    }
    
    async delete(id: number): Promise<void> {
        return await this._repo.delete(id);
    }
}