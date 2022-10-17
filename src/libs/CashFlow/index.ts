import { getConnection as getSQLiteConn } from "@models/sqlite/SqliteConn";
import { getConnection as getMongoDBConn } from "@models/mongodb/MongoDBConn";
import { CashFlowDao as CashFlowSqLiteDao } from "@models/sqlite/CashFlowDao";
import { CashFlowDao as CashFlowMongoDbDao } from "@models/mongodb/CashFlowDao";
export interface ICashFlow {
  type: 'INCOME' | 'EXPENSE';
  date: Date;
  amount: number;
  description: string;
};
export class CashFlow {
  private dao: CashFlowSqLiteDao|CashFlowMongoDbDao;
  public constructor(typeConn: "SQLITE"|"MONGODB"){
    const getConnection = typeConn === "SQLITE" ? getSQLiteConn : getMongoDBConn;
    const CashFlowDao =  typeConn === "SQLITE" ? CashFlowSqLiteDao : CashFlowMongoDbDao;
    getConnection()
      .then(conn=>{
        this.dao = new CashFlowDao(conn);
      })
      .catch(ex=>console.error(ex));
  }
  // Consultas
  public getAllCashFlow() {
    return this.dao.getClashFlow()
  }

  public getCashFlowByIndex( index:number|string) {
      if (typeof index === "string") {
        return (this.dao as CashFlowMongoDbDao).getClashFlowById(index as string);
      } else {
        return (this.dao as CashFlowSqLiteDao).getClashFlowById({_id:index as number});
      }
  }

  public addCashFlow( cashFlow:ICashFlow) {
    return this.dao.insertNewCashFlow(cashFlow);
  }
  public updateCashFlow( index:number|string, cashFlow:ICashFlow){
      return (this.dao as CashFlowMongoDbDao).updateNewCashFlow({...cashFlow, _id:index});
  }
  public deleteCashFlow( index:number|string) {
    if (typeof index === "string") {
      return (this.dao as CashFlowMongoDbDao).deleteCashFlow({_id: index as string});
    } else {
      return (this.dao as CashFlowSqLiteDao).deleteCashFlow({_id:index as number});
    }
  }
}

  /*public addCashFlow(cashFlow:ICashFlow): number { //busca si existe ese dato en la lista, sino lo agrega
    const cashFlowExists = this.cashFlowItems.findIndex(
      (obj) => {
        return obj.amount === cashFlow.amount && obj.description === cashFlow.description;
      }
    );
    if (cashFlowExists < 0) {
      this.cashFlowItems.push(cashFlow);
      return this.cashFlowItems.length - 1;
      // [{},{},{},{}]
      // 0   1   2   3
      // 4 - 1 = 3
    }
    throw Error('CashFlow Exists on Collection');
  }
   
  public getCashFlowByIndex( index:number): ICashFlow {
    if (index >= 0 && index < this.cashFlowItems.length) {
      return this.cashFlowItems[index];
    }
    throw Error('Index out of range');
  }

  public deleteCashFlow( index:number): boolean {
    if ( index >= 0 && index < this.cashFlowItems.length ) {
      this.cashFlowItems = this.cashFlowItems.filter(
        (_obj: ICashFlow, i:number)=> i !== index
      );
      return true;
    }
    return false;
  }*/
