 import { User } from '../../../domain/models/user.models';
import { AuthRepositoryPort } from '../../../domain/ports/auth.repository';
import { db } from '../database/turso.client';
 
export class AuthRepository implements AuthRepositoryPort {
  
  private client:any;
  
  async find(username: string, password: string): Promise<User | null> {
    try{
      const result = await db.execute(
        'select * from users where username = ? and password = ?',
        [username, password]
      );
      const user = result.rows[0] as unknown as User;
      return user ?? null;
    } catch(error) {
      console.error('Error finding user by id: ', error)
      throw error
    } 
  }
/*
  async create(model: User): Promise<number | null> {
    try{
      const result = await db.execute(
        'insert into users (username, password, usertypeid, profileid, insertdate) values (?,?,1,?,?)',
        [model.username, model.password, model.profileId, new Date()]
      );
      const id = Number(result) 
      return id ?? null;

    } catch(error) {
      console.error('Error finding user by id: ', error)
      throw error
    }
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