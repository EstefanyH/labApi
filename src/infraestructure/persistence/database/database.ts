// Simulación simple de base de datos
export const users = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123', // En producción usar hash
    name: 'Administrador'
  }
];

export class Database {
  static async connect(): Promise<void> {
    console.log('Conectado a base de datos simulada');
  }

  static async disconnect(): Promise<void> {
    console.log('Desconectado de base de datos');
  }
}