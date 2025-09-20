import { Profile } from "../../../domain/models/profile.models";
import { ProfileRepositoryPort } from "../../../domain/ports/profile.repository";
import { db } from "../database/turso.client";

export class ProfileRepository implements ProfileRepositoryPort {  
  private client:any;

  async save(model: Profile): Promise<Profile> {
    try{
      const result = await db.execute(
        'insert into profile (name, lastname, documentTypeId, documentNumber, insertdate) values (?,?,?,?,?)',
        [model.name, model.lastname, model.documentId, model.documentNumber, new Date()]
      );
      //const id = Number(result) 
      return model;

    } catch(error) {
      console.error('Error finding user by id: ', error)
      throw error
    }
  }
  
  async findById(id: number): Promise<Profile| null> {
    try{
      const result = await db.execute(
         `SELECT * FROM profile WHERE id = ?`,      
         [id ]
      );
      
      // Si no se encontraron resultados
      if (result.rows.length === 0) {
        return null;
      }
      // Mapear el resultado a la entidad Profile
      const row = result.rows[0];
      return this.mapToProfile(row);
    } catch(error) {
      console.error('Error finding user by id: ', error)
      throw error
    }
  }
  
  async update(model: Profile): Promise<Profile> {
    try{
      console.log(model);
      console.log('repot');
      const result = await db.execute(
        `UPDATE profile 
         SET name = ?, lastname = ?, documentTypeId = ?, documentNumber = ?
         WHERE id = ?`,        
         [model.name, 
          model.lastname, 
          model.documentId, 
          model.documentNumber,
          model.id! ]
      );
      
      const changes = result.rowsAffected;
      if (changes === 0) {
        throw new Error(`Profile with id ${model.id} not found`);
      }
      
      return model;

    } catch(error) {
      console.error('Error finding user by id: ', error)
      throw error
    }
  }

  async delete(id: number): Promise<void> {
    try{
      
      const result = await db.execute(
        'delete from profile where id = ?',
        [id]
      );

    } catch(error) {
      console.error('Error finding user by id: ', error)
      throw error
    }
  }

  private mapToProfile(row: any): Profile {
    return {
      id: Number(row.id ?? row.ID ?? row.Id),
      name: row.name ?? row.NAME ?? row.Name ?? '',
      lastname: row.lastname ?? row.LASTNAME ?? row.LastName ?? '',
      documentId: Number(row.documentTypeId ?? row.documenttypeid ?? row.DOCUMENT_TYPE_ID ?? 0),
      documentNumber: row.documentNumber ?? row.documentnumber ?? row.DOCUMENT_NUMBER ?? ''
    };
  }
}