import { BankAccountDto } from "@/@types/BankAccount"

export const AccountTypes = [
  { label : "Checking", value : "checking" },
  { label : "Savings", value : "savings" },
  { label : "Wallet", value : "wallet" },
  { label : "Salary", value : "salary" },
]
export const bankAccounts : BankAccountDto[]= [
   {
    id: 1,
    accountHolder: "Alice Johnson",
    accountType: "checking",
    accountNumber: "123456-7",
    agency: "0001",
    nickname: "Primary Checking",
    balance: 1500.00,
    customColor: "#1abc9c",
    bankName: "Bank of America",
    cardBrand: "Visa",
    icon: "https://example.com/icons/bank1.svg"
  },
  {
    id: 2,
    accountHolder: "Bob Smith",
    accountType: "savings",
    accountNumber: "987654-3",
    agency: "0022",
    nickname: "Emergency Fund",
    balance: 3000.00,
    customColor: "#e67e22",
    bankName: "Chase",
    cardBrand: "Mastercard",
    icon: "https://example.com/icons/savings.svg"
  },
  {
    id: 3,
    accountHolder: "Carla Mendes",
    accountType: "wallet",
    accountNumber: "000999-1",
    agency: "Digital",
    balance: 250.00,
    bankName: "Nubank",
    customColor: "#8e44ad",
    icon: "wallet-icon.svg"
  },
  {
    id: 4,
    accountHolder: "David Liu",
    accountType: "salary",
    accountNumber: "445566-8",
    agency: "0044",
    nickname: "Work Account",
    balance: 4200.00,
    bankName: "Citibank",
    cardBrand: "Elo",
    icon: "https://example.com/icons/salary.svg"
  },
  {
    id: 5,
    accountHolder: "David Liu",
    accountType: "salary",
    accountNumber: "445566-8",
    agency: "0044",
    nickname: "Work Account",
    balance: 4200.00,
    bankName: "Citibank",
    cardBrand: "Elo",
    icon: "https://example.com/icons/salary.svg"
  },
  {
    id: 6,
    accountHolder: "David Liu",
    accountType: "salary",
    accountNumber: "445566-8",
    agency: "0044",
    nickname: "Work Account",
    balance: 4200.00,
    bankName: "Citibank",
    cardBrand: "Elo",
    icon: "https://example.com/icons/salary.svg"
  },
  {
    id: 7,
    accountHolder: "David Liu",
    accountType: "salary",
    accountNumber: "445566-8",
    agency: "0044",
    nickname: "Work Account",
    balance: 4200.00,
    bankName: "Citibank",
    cardBrand: "Elo",
    icon: "https://example.com/icons/salary.svg"
  }
]