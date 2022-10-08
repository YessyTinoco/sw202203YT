export interface IDaoObject {
    persistanceName: string;
    //Definir metodos
    findAll: Function;
    findByID: Function;
    update: Function;
    CreateOne: Function;
    delete: Function;
    findByFilter: Function;
    aggregate: Function;
}