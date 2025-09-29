import { User } from "../models/user.models";

export interface _AuthRepositoryPort {
  findByEmail(email: string): Promise<User | null>;
  create(model: User): Promise<number | null>;
  //findById(id: string): Promise<User | null>;
  //save(user: User): Promise<User>;
}