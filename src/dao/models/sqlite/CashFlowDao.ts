//Utiliza la interface de CashFlow.ts de entidades
import { ICashFlow } from "../entities/CashFlow";
import sqlite from "sqlite";
import { AbstractDao } from "./AbstractDao";

export class CashFlowDao extends AbstractDao<ICashFlow> {
    public constructor(db:sqlite.Database){//inyectar la db
        super('CASHFLOW', db as sqlite.Database);//nombre de tabla
        super.exec('CREATE TABLE IF NOT EXISTS CASHFLOW ('
        + ' _id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'
        + ' type TEXT,'
        + ' date TEXT,'
        + ' amount NUMERIC,'
        + ' description TEXT);').then().catch(e=>console.error(e)); //un constructor no puede haber una promesa
    }
    public async getClashFlow(){
        return super.findAll() //super es de la clase heredada, recibe el arreglo de elementos basado en IcashFlow, T toma el tipo de datos
    }

    public async getClashFlowById( identifier : Partial<ICashFlow> ){
        try{
          const result = await super.findByID(identifier);
          return result;
        } catch( ex: unknown) {
          console.log("CashFlowDao sqlite:", (ex as Error).message);
          throw ex;
        }
      }
    
      public async insertNewCashFlow( newCashFlow: ICashFlow) {
        try {
          const result = await super.CreateOne(newCashFlow);
          return result;
        } catch( ex: unknown) {
          console.log("CashFlowDao sqlite:", (ex as Error).message);
          throw ex;
        }
      }

      public async updateNewCashFlow( updateCashFlow: ICashFlow) {
        try {
          const {_id, ...updateObject} = updateCashFlow;
          const result = await super.update({_id}, updateObject);
          return result;
        } catch( ex: unknown) {
          console.log("CashFlowDao sqlite:", (ex as Error).message);
          throw ex;
        }
      }

      public async deleteCashFlow( deleteCashFlow: Partial<ICashFlow>) {
        try {
          const {_id } = deleteCashFlow;
          const result = await super.delete({_id});
          return result;
        } catch( ex: unknown) {
          console.log("CashFlowDao sqlite:", (ex as Error).message);
          throw ex;
        }
      }

}