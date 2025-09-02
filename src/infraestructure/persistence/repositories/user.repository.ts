 
import { User } from '../../../domain/models/uer.models';
import { UserRepositoryPort } from '../../../domain/ports/user.repository.port';
import { db } from '../database/turso.client';
 
export class UserRepository implements UserRepositoryPort {
  private client:any;
   

  async findByEmail(email: string): Promise<User | null> {
    try{
      const result = await db.execute(
        'select * from users where username = ?',
        [email]
      );
      const user = result.rows[0] as unknown as User;
        return user ?? null;
    } catch(error) {
      console.error('Error finding user by id: ', error)
      throw error
    }
    
    //return users.find(user => user.email === email) || null;
  }

/*
  async findById(id: string): Promise<User | null> {
    return users.find(user => user.id === id) || null;
  }

  async save(user: User): Promise<User> {
    users.push(user);
    return user;
  }*/
}