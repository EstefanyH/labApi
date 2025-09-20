import { ApiResponse } from "../../shared/dto/api-response.dto";
import { Profile } from "../models/profile.models";

export interface ProfileService {
    create(model: Profile): Promise<Profile>;
    findById(id: number): Promise<Profile| null>;
    update(model: Profile): Promise<Profile>;
    delete(id: number): Promise<void>;
}