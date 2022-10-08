import { getConnection } from "@server/dao/models/sqlite/SqliteConn";
import { CashFlowDao } from "@server/dao/models/sqlite/CashFlowDao";

export interface ICashFlow {
  type: 'INCOME' | 'EXPENSE';
  date: Date;
  amount: number;
  description: string;
};

export class CashFlow {
  private dao: CashFlowDao;

  public constructor(){
    getConnection().then(conn=>{this.dao = new CashFlowDao(conn)}).catch(ex=>console.error(ex));
  }

 // private cashFlowItems : ICashFlow[] = [];
  // Consultas

  public getAllCashFlow() {
    return this.dao.getClashFlow();
    //return this.cashFlowItems; // select * from cashflow;
  }
  
  public getCashFlowByIndex( index:number) {
      return this.dao.getClashFlowById({_id:index});
  }

  public addCashFlow( cashFlow:ICashFlow) {
    return this.dao.insertNewCashFlow(cashFlow);
  }
  public updateCashFlow( index:number, cashFlow:ICashFlow){
   return this.dao.update({_id:index}, cashFlow);
  }
  public deleteCashFlow( index:number) {
    return this.dao.deleteCashFlow({_id:index});
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

}
