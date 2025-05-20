import { z } from "zod"
export class FormSchemaFactory { 
  static formCreditCardSchema = z.object({
    number : z.string().min(16, "no mínimo 16 caracteres"),
    bank : z.string().min(2, "Adiciona um nome válido para o banco"),
    cvv : z.string().length(3, "informe o cvv correto"),
    flag : z.string(),
    name : z.string(),
    totalBalance : z.number(),
    exp : z.string(),
  });

  static formTransactionSchema = z.object({
    value : z.number(),
    type : z.string(),
    creditCard : z.string()
    
  })
}