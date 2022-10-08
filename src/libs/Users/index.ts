import { getConnection } from "@server/dao/models/sqlite/SqliteConn";
import { UsersDao } from "@server/dao/models/sqlite/UsersDao";

export interface IUsers{
    name: string;
    email: string;
    password: string;
};

export class User{
    private dao: UsersDao;

    public constructor(){
        getConnection().then(conn=>{this.dao = new UsersDao(conn)}).catch(ex=>console.error(ex));
    }

    public getAllUser(){
        return this.dao.getUser();
    }

    public getUserByIndex( index:number) {
        return this.dao.getUserById({_id:index});
    }
  
    public addUser( User:IUsers) {
      return this.dao.insertNewUser(User);
    }
    public updateUser( index:number, User:IUsers){
     return this.dao.update({_id:index}, User);
    }
    public deleteUser( index:number) {
      return this.dao.deleteUser({_id:index});
    }
}