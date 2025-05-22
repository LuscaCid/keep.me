import { Transaction } from "@/@types/Transaction";
import { GenericalHeader } from "@/components/GenericalHeader";
import { FormSchemaFactory } from "@/constants/formSchemas";
import { ScreenWrapper } from "@/UI/ScreenWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";

type FormTransactionType = z.infer<typeof FormSchemaFactory.formTransactionSchema>;
export default function TransactionScreen() {
  const queryClient = useQueryClient();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | undefined>(undefined);

  const methods = useForm<FormTransactionType>({
    resolver: zodResolver(FormSchemaFactory.formTransactionSchema),
    defaultValues: {
      creditCard: transactionToEdit ? transactionToEdit.whereFrom : "",
      type: transactionToEdit ? transactionToEdit.type : "",
      value: transactionToEdit ? transactionToEdit.value.toString() : "",
    }
  });
  useEffect(() => {
    const cachedCreditTransactions = queryClient.getQueryData(["transactions"]) as Transaction[] ?? [];
    setTransactionToEdit(cachedCreditTransactions.find((transaction) => transaction.id === Number(id)));
  }, [id, queryClient]);
  return (
    <ScreenWrapper >
      <GenericalHeader title={transactionToEdit ? "Edit transaction" : "New transaction"} />

      <View className="flex flex-col gap-4">
        <FormProvider {...methods}>
          <View className="flex flex-col gap-4">
            {/* <FormInput /> */}
          </View>
        </FormProvider>
      </View>
    </ScreenWrapper>
  );
}