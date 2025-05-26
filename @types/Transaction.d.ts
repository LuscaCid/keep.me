export interface Transaction {
  id : number;
  value : number;
  category : TransactionCategory;
  item : string;
  date : Date|string;
  type : TransactionType;
  whereFrom : "credit-card" | "wallet" | "bank";
  fromId : string;
  description : string; 
};

export type TransactionCategory = "subscription-fee" | "shopping" | "bill" | "saving" | "salary";

export type TransactionType = "outcome" | "income" | "transaction";
