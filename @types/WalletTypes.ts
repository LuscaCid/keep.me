import { FormSchemaFactory } from "@/constants/formSchemas";
import { z } from "zod";
import { BankAccountDto } from "./BankAccount";

export enum OriginDestinyAccount {
  Origin = "origin",
  Destiny = "destiny"
}

export type FormTransactionType = z.infer<typeof FormSchemaFactory.formTransactionSchema>;
export type KeyofFormTransaction = keyof FormTransactionType;

export interface AccountsField {
  selectedOriginBankAccount: BankAccountDto | undefined;
  selectedDestinyBankAccount: BankAccountDto | undefined;
}
