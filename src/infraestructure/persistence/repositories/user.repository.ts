 
import { User } from '../../../domain/models/uer.models';
import { UserRepositoryPort } from '../../../domain/ports/user.repository.port';
import { users } from '../database/database';
 
export class UserRepository implements UserRepositoryPort {
  async findByEmail(email: string): Promise<User | null> {
    return users.find(user => user.email === email) || null;
  }

  async findById(id: string): Promise<User | null> {
    return users.find(user => user.id === id) || null;
  }

  async save(user: User): Promise<User> {
    users.push(user);
    return user;
  }
}