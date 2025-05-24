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