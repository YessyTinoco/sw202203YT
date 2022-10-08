import { IDaoObject } from "@server/dao/daoBase";
import sqlite from 'sqlite';

//Implements - Clase y Extends - Herencia de clase
export abstract class AbstractDao<T> implements IDaoObject {//Arreglo generico T
    public persistanceName: string;
    private connection: sqlite.Database;

    constructor(persistanceName: string, connetion?: sqlite.Database){
        this.persistanceName = persistanceName;
        if (connetion){
            this.connection = connetion;
        }
    }

    public async CreateOne(data:T): Promise<T>{ //Define como guardar hacia la bd el valor
        //const sqlStr = "INSERT INTO (...columns) values (...valores)"
        //Construir sentencia sql
        const {columns, values, params} = this.getColValParmArr(data);
        const sqlInsert = `INSERT INTO ${this.persistanceName} (${columns.join(', ')}) VALUES (${params.join(', ')});`;
        console.log(sqlInsert, values);
        await this.connection.run(sqlInsert, values);
        return data;
    }
    public async update(identifier: Partial<T>, data: Partial<T>){
        //UPDATE TABLE_NAME SET ...COLUMNS=?, WHERE ...IDENTIFIERS=?;
        const {columns, values, params:_params} = this.getColValParmArr(data);
        const {columns:columnsId, values:valuesId, params:_paramsId} = this.getColValParmArr(identifier);
        const finalValues = [...values, ...valuesId];
        const sqlUpdate = `UPDATE ${this.persistanceName} SET ${columns.map((o)=>`${o}=?`).join(', ')} WHERE ${columnsId.map((o)=>`${o}=?`).join(' ')};`;
        await this.connection.run(sqlUpdate, finalValues);
        return true;

    }
    public async delete(identifier: Partial<T>): Promise<boolean>{
        const {columns, values, params: _params} = this.getColValParmArr(identifier);
        const sqlDelete = `DELETE from ${this.persistanceName} where ${columns.map(o=>`${o}=?`).join(' and ')};`;
        await this.connection.run(sqlDelete, values);
        return true;
    }

    public async findAll() : Promise<T[]>{ //Promesa es el resultado de una accion que no depende de js y espera una respuesta para retornar un valor, esto por ser asicronica
        const sqlStr = `SELECT * from ${this.persistanceName};`;
        const datos = await this.connection.all(sqlStr);
        return datos;
    }

    public async findByID(identifier: Partial<T>): Promise<T>{
        const {columns, values, params:_params} = this.getColValParmArr(identifier);
        const sqlSelect = `SELECT * from ${this.persistanceName} WHERE ${columns.map(o=>`${o}=?`).join(' and ')};`;
        const dato = await this.connection.get(sqlSelect, values); //get trae solo un dato
        return dato;
    }

    public findByFilter(){
        throw new Error("Not Implemented");
    }
    public aggregate(){
        throw new Error("Not Implemented");
    }

    public exec(sqlstr:string){
        return this.connection.exec(sqlstr);
    }

    private getColValParmArr (data: Partial<T>): {columns:string[], values:unknown[], params:string[]}{
        const columns = Object.keys(data); //devuelve todas las llaves
        const values = Object.values(data);
        const params = columns.map(()=>'?');
        return {columns, values, params};
    } //devolver como objeto
}