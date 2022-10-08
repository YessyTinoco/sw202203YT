//Conexion, se puede como clase o funcion
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

let connection = null;
export const getConnection = async (url?: string)=>{
  console.log(open);
  if (!connection) {
    //Patron singleton, si no existe una conexion la crea y la guarda en cache, no se necesita abrir o cerrar conexion
        //se utiliza la conexion establecida para no crear más
    const dbUrl = (url)? url: (process.env.DB_URI || 'sample.db');
    connection =  await open({
      filename: dbUrl,
      driver: sqlite3.Database
    }
    );
  }
  return connection;
}