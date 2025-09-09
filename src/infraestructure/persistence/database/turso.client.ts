import { Client, createClient, ResultSet } from '@libsql/client';
import environment from '../../../shared/constants/environment';
 
const db: Client = createClient({
    url: environment.datbaseUrl,
    authToken: environment.databaseToken
});

async function executeQuery<T = any>(query: string, params: any[] = []): Promise<T[] | number> {
    try {// Por seguridad

        const result: ResultSet = await db.execute({ sql: query, args: params});
        
        if(query.trim().toUpperCase().startsWith('INSERT')) {
            return Number(result.lastInsertRowid);
        }
        return result.rows as T[];
    } catch( err) {
        console.error(`❌ Error en la consulta: ${query}`, err);
        throw err;
    }
}

export { db, executeQuery };