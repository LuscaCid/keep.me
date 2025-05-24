export interface Transaction {
  id : number;
  value : number;
  category : TransactionCategory;
  item : string;
  date : Date|string;
  type : TransactionType;
  whereFrom : "credit-card" | "wallet" | "bank";
  fromId : string; 
};

export type TransactionCategory = "subscription-fee" | "shopping" | "bill" | "saving" | "salary";

export type TransactionType = "outcome" | "income" | "transaction";


export interface BankAccountDto {
  id : number;
  accountHolder: string;        // e.g., "John Doe"
  accountType: 'checking' | 'savings' | 'wallet' | 'salary';
  accountNumber: string;        // e.g., "123456-7"
  agency: string;               // e.g., "0001"
  nickname?: string;            // e.g., "Main Account"
  balance: number;       // e.g., 1000.00
  customColor?: string;         // e.g., "#3f51b5"
  bankName: string;             // e.g., "Bank of America"
  cardBrand?: string;           // e.g., "Visa"
  icon?: string;                // e.g., "bank-icon.svg" or URL
}

export interface BankAccountCardDto {
  id: string;
  bankName: string;
  nickname?: string;
  currentBalance: number;
  customColor?: string;
  cardBrand?: string;
  accountType: string;
  lastTransactionDate?: string; // ISO string format, e.g., "2025-05-22T14:30:00Z"
  icon?: string;
}

export interface CreditCard {
  id : string;
  name : string;
  cvv : string;
  totalBalance : string;
  number : string;
  exp : string;
  brand: string;
  bank: string;
}


export interface Saving {
  name : string;
  actualValue : number;
  goal : number;
  id : number;
  user? : User
}

export interface User {
  name : string;
  email : string;
  password: string;
  id : number;
  photoUrl? : string;
}