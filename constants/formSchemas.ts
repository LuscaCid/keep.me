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

  static formTransactionSchema = z.object({
    value : z.string(),
    type : z.string(),
    creditCard : z.string(),
    fixed : z.boolean().optional(),
    paid : z.boolean().optional()
  })
  static formTest = z.object({
    name : z.string()
  })
}
