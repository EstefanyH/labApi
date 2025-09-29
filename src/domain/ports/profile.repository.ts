import { Profile } from "../models/profile.models";
import { User } from "../models/user.models";

export interface ProfileRepositoryPort {
  save(model: Profile): Promise<Profile>;
  findById(id: number): Promise<Profile| null>;
  update(model: Profile): Promise<Profile>;
  delete(id: number): Promise<void>;
}