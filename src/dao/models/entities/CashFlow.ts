export interface ICashFlow {
    type: 'INCOME' | 'EXPENSE';
    date: Date;
    amount: number;
    description: string;
    _id?: unknown; //depende de cada bd, ? permite que el ID sea opcional
  };