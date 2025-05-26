import { z } from "zod"
export class FormSchemaFactory { 

  static formCreditCardSchema = z.object({
    number : z.string().length(16, "O número do cartão deve ter 16 caracteres"),
    bank : z.string().min(2, "Selecione um banco válido"),
    cvv : z.string().length(3, "O cvv possui 3 caracteres"),
    brand : z.string(),
    name : z.string().min(2, "Informe um nome válido para o cartão"),
    totalBalance : z.string(),
    exp : z.string(),
  });
  
  static formBankAccountSchema = z.object({
    accountHolder : z.string().min(2),
    accountType : z.string().optional(),
    accountNumber : z.string().optional(),
    agency : z.string().optional(),
    balance : z.number().optional(),
    // customColor : z.string(),
    bankName : z.string().optional(),
    cardBrand : z.string().optional(),
  });

  static formTransactionSchema = z.object({
    value : z.number(),
    description : z.string(),
    type : z.string(),
    bankAccount : z.string(),
    fixed : z.boolean().optional(),
    paid : z.boolean().optional(),
    destinyBankAccount : z.string().optional(),
    category : z.string().min(1, "A transaction needs category correlated")
  });

  static formTest = z.object({
    name : z.string()
  });

}
