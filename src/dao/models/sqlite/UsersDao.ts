import { IUsers } from "../entities/Users";
import sqlite from "sqlite";
import { AbstractDao } from "./AbstractDao";

export class UsersDao extends AbstractDao<IUsers>{
    public constructor(db:sqlite.Database){
        super('USER', db as sqlite.Database);
        super.exec('CREATE TABLE IF NOT EXISTS USER ('
        + ' _id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'
        + ' name TEXT,'
        + ' email TEXT,'
        + ' password TEXT);').then().catch(e=>console.error(e));
    }

    public async getUser(){
        return super.findAll()
    }

    public async getUserById(identifier : Partial<IUsers>){
        try{
            const result = await super.findByID(identifier);
            return result;
          } catch( ex: unknown) {
            console.log("UsersDao sqlite:", (ex as Error).message);
            throw ex;
          }
    }

    public async insertNewUser(newUser: IUsers){
        try {
            const result = await super.CreateOne(newUser);
            return result;
          } catch( ex: unknown) {
            console.log("UsersDao sqlite:", (ex as Error).message);
            throw ex;
          }
    }

    public async updateNewUser( updateUser: IUsers) {
        try {
          const {_id, ...updateObject} = updateUser;
          const result = await super.update({_id}, updateObject);
          return result;
        } catch( ex: unknown) {
          console.log("UsersDao sqlite:", (ex as Error).message);
          throw ex;
        }
    }

    public async deleteUser( deleteUser: Partial<IUsers>) {
        try {
          const {_id } = deleteUser;
          const result = await super.delete({_id});
          return result;
        } catch( ex: unknown) {
          console.log("UsersDao sqlite:", (ex as Error).message);
          throw ex;
        }
      }
}