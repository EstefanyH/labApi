//import { Client, createClient, ResultSet } from '@libsql/client';
import { Client, createClient, ResultSet } from '@libsql/client/web'; // ← Cliente HTTP

import environment from '../../../shared/constants/environment';
 
const db: Client = createClient({
    url: environment.datbaseUrl,
    authToken: environment.databaseToken
});

async function verifyConnection(): Promise<void> {
    try {
        console.log('🔗 Verificando conexión a Turso...');
        console.log('URL:', environment.datbaseUrl);
        
        // Verificar conexión ejecutando una consulta simple
        const result = await db.execute({
            sql: "SELECT name FROM sqlite_master WHERE type='table'"
        });
        
        console.log('✅ Conexión exitosa a Turso');
        console.log('📊 Tablas en la base de datos:', result.rows.map(row => row.name));
        
    } catch (error) {
        console.error('❌ Error de conexión a Turso:');
        console.error('URL utilizada:', environment.datbaseUrl);
        console.error('Error completo:', error);
        throw error;
    }
}

// Ejecutar verificación al iniciar
verifyConnection().catch(console.error);

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