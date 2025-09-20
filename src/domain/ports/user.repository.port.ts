import { User } from "../models/uer.models";

export interface UserRepositoryPort {
  findByEmail(email: string): Promise<User | null>;
  create(model: User): Promise<number | null>;
  //findById(id: string): Promise<User | null>;
  //save(user: User): Promise<User>;
}