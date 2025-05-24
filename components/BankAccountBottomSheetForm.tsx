import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { FieldSet } from "@/UI/FieldSet";
import { banks } from "@/constants/banks";
import { cardBrands } from "@/constants/cardBrands";
import { FormSchemaFactory } from "@/constants/formSchemas";
import { FormInput } from "@/UI/FormInput";
import { Select } from "@/UI/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { ButtonSubmit } from "@/UI/ButtonSubmit";
import { CustomBottomSheetView } from "@/UI/CustomBottomSheets";
import { BankAccountDto } from "@/@types/BankAccount";
import { AccountTypes } from "@/constants/AccountTypes";
import { formatToBrl } from "@/utils/formatToBrl";

type BankAccountFormType = z.infer<typeof FormSchemaFactory.formBankAccountSchema>;
type KeyofBankAccountForm = keyof BankAccountFormType;
export function BankAccountBottomSheet() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const queryClient = useQueryClient();

  const { mutateAsync: addAccountAsync, isPending, isError } = useMutation({
    mutationFn: async (data: BankAccountFormType) => {
      // const response = await api.post("credit-card/add-one", { data })
      // return response.data;
    },
    onSuccess: () => {
      // openToast();
    }
  });
  const [bankAccountToEdit, setBankAccountToEdit] = useState<BankAccountDto | undefined>(undefined);
  const methods = useForm<BankAccountFormType>({
    resolver: zodResolver(FormSchemaFactory.formBankAccountSchema),
    defaultValues: {
      balance: bankAccountToEdit ? bankAccountToEdit.balance : 0,
      bankName: bankAccountToEdit ? bankAccountToEdit.bankName : "",
      agency: bankAccountToEdit ? bankAccountToEdit.agency : "",
      accountHolder: bankAccountToEdit ? bankAccountToEdit.accountHolder : "",
      cardBrand: bankAccountToEdit ? bankAccountToEdit.cardBrand : "",
      accountNumber: bankAccountToEdit ? bankAccountToEdit.accountNumber : "",
    }
  });
  const handleSubmitForm = useCallback(async (data: BankAccountFormType) => {
    console.log(data);
    const dataResponse = await addAccountAsync(data);
    queryClient.setQueryData(
      ["bank-account"],
      (prev: BankAccountDto[]) => [...prev, dataResponse]);
  }, [queryClient, addAccountAsync]);

  useEffect(() => {
    const cachedbankAccounts = queryClient.getQueryData(["bank-account"]) as BankAccountDto[] ?? [];
    setBankAccountToEdit(cachedbankAccounts.find((bankAccount) => bankAccount.id === Number(id)));
  }, [id, queryClient]);

  return (
    <CustomBottomSheetView className=" flex flex-col gap-2">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="h-full relative">
          <FormProvider {...methods}>
            <View className="flex flex-col gap-2 w-full border-b  py-5 border-zinc-200 dark:border-zinc-800">
              <Text className="text-4xl text-center font-bold dark:text-zinc-200 text-zinc-900">
                {bankAccountToEdit ? "All card data" : "Add bank account"}
              </Text>
              <Text className="text-lg text-center font-thin dark:text-zinc-400 text-zinc-600">
                {bankAccountToEdit ? "Here you can change all card data" : "Fill form with the data that will be a reflect of your bank"}
              </Text>
            </View>
            <View className="flex flex-col gap-4">
              <FormInput<KeyofBankAccountForm>
                name="accountHolder"
                placeholder="Holder name"
              />
              <FormInput<KeyofBankAccountForm>
                numberKeyboard
                name="accountNumber"
                placeholder="Account number"
              />
              <FormInput<KeyofBankAccountForm>
                numberKeyboard
                name="agency"
                placeholder="Agency number"
              />
              <FormInput<KeyofBankAccountForm>
                name="balance"
                placeholder="Initial balance"
                numberKeyboard
                displayValue={(value) => formatToBrl(Number(value || 0))}
                parseValue={(text) => {
                  const onlyNumbers = text.replace(/\D/g, '');
                  return parseFloat(onlyNumbers) / 100;
                }}
              />
            </View>
            <View className="flex flex-col gap-3 w-full border-t my-5 pt-3 border-zinc-200 dark:border-zinc-700">
              <FieldSet
                label="Select account type"
                input={
                  <Select
                    onChangeValue={(value: any) => methods.setValue("accountType", value)}
                    items={AccountTypes}
                  />
                }
              />
              <FieldSet
                label="Select card brand"
                input={
                  <Select
                    onChangeValue={(value: any) => methods.setValue("cardBrand", value)}
                    items={cardBrands}
                  />
                }
              />
              <FieldSet
                label="Select bank"
                input={
                  <Select
                    onChangeValue={(value: any) => methods.setValue("bankName", value)}
                    items={banks}
                  />
                } />
            </View>
          </FormProvider>
          <ButtonSubmit
            onPress={methods.handleSubmit(handleSubmitForm)}
            title={bankAccountToEdit ? "Edit" : "Add"}
            isPending={isPending}
          />
        </View>
      </TouchableWithoutFeedback>
    </CustomBottomSheetView>
  );
}

