import { BankAccountDto } from "@/@types/BankAccount";
import { TransactionType } from "@/@types/Transaction";
import { AccountsField, FormTransactionType, KeyofFormTransaction, OriginDestinyAccount } from "@/@types/WalletTypes";
import { ButtonSubmit } from "@/UI/ButtonSubmit";
import { FormCheckbox } from "@/UI/CheckBox";
import { CustomBottomSheetView } from "@/UI/CustomBottomSheets";
import { FormInput } from "@/UI/FormInput";
import { Icon } from "@/UI/Icon";
import { InputButton } from "@/UI/InputButton";
import { RadioGroup, RadioItem } from "@/UI/RadioGroup";
import { formatToBrl } from "@/utils/formatToBrl";
import { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useMutation } from "@tanstack/react-query";
import { ArrowDown, ArrowRightLeft, ArrowUp, ChevronUp, HandCoins, Repeat, X, } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Dispatch, RefObject, SetStateAction, useCallback, useState } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";


interface Props {
  methods: UseFormReturn<FormTransactionType>;
  bankOriginAccountBottomSheetRef: RefObject<BottomSheetMethods | null>;
  bankDestinyAccountBottomSheetRef: RefObject<BottomSheetMethods | null>;
  categoryBottomSheetRef: RefObject<BottomSheetMethods | null>
  
  categorySelected : string;
  selectedBankAccounts: AccountsField;
  setCategorySelected: Dispatch<SetStateAction<string>>;
  setSelectedBankAccounts: Dispatch<SetStateAction<AccountsField>>;
}
export function TransactionFormBottomSheet({
  methods,
  bankOriginAccountBottomSheetRef,
  bankDestinyAccountBottomSheetRef,
  setSelectedBankAccounts,
  selectedBankAccounts,
  categoryBottomSheetRef,
  categorySelected,
  setCategorySelected
}: Props) {
  const [selectedType, setSelectedTransactionType] = useState<TransactionType>("income");
  const { colorScheme } = useColorScheme();

  const { mutateAsync: addOutcomeAsync, isPending } = useMutation({
    mutationFn: async (data: FormTransactionType) => {
      await new Promise((reject, resolve) => setTimeout(resolve, 1000));
    },
    mutationKey: ["create-transaction"]
  });
  const valueWatched = methods.watch("value");

  const validateInsuficientFunds = useCallback(() => {
    if (
      selectedBankAccounts.selectedOriginBankAccount &&
      selectedBankAccounts.selectedOriginBankAccount?.balance < valueWatched
    ) {
      methods.setError("value", { message: "Saldo indisponivel" })
      return false;
    }
    return true
  }, [methods, selectedBankAccounts, valueWatched])

  const handleSubmitTransactionForm = useCallback(async (data: FormTransactionType) => {
    if (!validateInsuficientFunds()) return;
    await addOutcomeAsync(data);
  }, [addOutcomeAsync, validateInsuficientFunds]);

  const handleOpenBankAccountsBottomSheet = useCallback((type: OriginDestinyAccount) => {
    switch (type) {
      case OriginDestinyAccount.Origin:
        bankOriginAccountBottomSheetRef.current?.expand();
        return;
      case OriginDestinyAccount.Destiny:
        bankDestinyAccountBottomSheetRef.current?.expand();
    }
  }, [bankDestinyAccountBottomSheetRef, bankOriginAccountBottomSheetRef]);
  
  const handleOpenCategoryBottomSheet = useCallback (() => {
    categoryBottomSheetRef.current?.expand();
  }, [categoryBottomSheetRef]);

  const onChangeTransactionType = useCallback((value: RadioItem) => {
    methods.setValue("type", value.value);
    setSelectedTransactionType(value.value as TransactionType);
  }, [methods]);

  const bgColorAccordingTransactionType = selectedType === "income" ? "#bbf7d0" : selectedType === "outcome" ? "#fecaca" : "#e4e4e7";
  const darkBgColorAccordingTransactionType = selectedType === "income" ? "#14532d70" : selectedType === "outcome" ? "#7f1d1d80" : "#18181b";
  const borderColorAccordingTransactionType = selectedType === "income" ? "#15803d70" : selectedType === "outcome" ? "#b91c1c" : "#3f3f46";

  return (
    <CustomBottomSheetView >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FormProvider {...methods}>
          <View className="flex flex-col gap-4  ">
            <Text className="text-3xl border-b border-zinc-200  dark:border-zinc-700 pb-2 font-medium dark:text-zinc-200">
              {selectedType === "income" ? "Add income" : selectedType === "outcome" ? "Add outcome" : "Add transaction"}
            </Text>
            <View className="flex  flex-row justify-between items-center">
              <View
                style={{
                  backgroundColor: colorScheme === "dark" ? darkBgColorAccordingTransactionType : bgColorAccordingTransactionType + 80,
                  borderBottomColor: borderColorAccordingTransactionType + 50,
                  borderBottomWidth: 3
                }}
                className="flex flex-row rounded-lg gap-4 flex-1 justify-between items-center"
              >
                <Text className={`text-2xl  flex items-center justify-center p-2 font-semibold dark:text-zinc-200`}>
                  {formatToBrl(valueWatched.toString().replace(",", "."))}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    methods.setValue("value", 0);
                  }}
                  className="p-2">
                  <Icon icon={X} size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="flex p-4 flex-row gap-2 items-center">
                <Text className="text-lg dark:text-zinc-200">
                  Brl
                </Text>
                <Icon icon={ChevronUp} size={25} />
              </TouchableOpacity>
            </View>
            <FormInput<KeyofFormTransaction>
              controlledValue={valueWatched}
              name="value"
              placeholder="Transaction value"
              numberKeyboard
            />
            <FormInput<KeyofFormTransaction>
              name="description"
              placeholder="Little description"
            />
            <InputButton<KeyofFormTransaction>
              name="bankAccount"
              onPress={() => handleOpenBankAccountsBottomSheet(OriginDestinyAccount.Origin)}
              placeholder="Select origin bank account"
              onClear={() => {
                setSelectedBankAccounts({ ...selectedBankAccounts, selectedOriginBankAccount: undefined });
                methods.setValue("bankAccount", "")
                methods.clearErrors("bankAccount")
              }}
              value={
                selectedBankAccounts.selectedOriginBankAccount ?
                  `${selectedBankAccounts.selectedOriginBankAccount.accountHolder} - ${formatToBrl(selectedBankAccounts.selectedOriginBankAccount.balance)}` : undefined
              }
            />
            {
              selectedType === "transaction" && (
                <InputButton<KeyofFormTransaction>
                  name="destinyBankAccount"
                  onClear={() => {
                    setSelectedBankAccounts({ ...selectedBankAccounts, selectedDestinyBankAccount: undefined })
                    methods.setValue("destinyBankAccount", "")
                    methods.clearErrors("destinyBankAccount")
                  }}
                  onPress={() => handleOpenBankAccountsBottomSheet(OriginDestinyAccount.Destiny)}
                  placeholder="Select the destiny account"
                  value={
                    selectedBankAccounts.selectedDestinyBankAccount ?
                      `${selectedBankAccounts.selectedDestinyBankAccount.accountHolder} - ${formatToBrl(selectedBankAccounts.selectedDestinyBankAccount.balance)}` : undefined
                  }
                />
              )
            }
            <InputButton<KeyofFormTransaction>
              name="category"
              onPress={() => handleOpenCategoryBottomSheet()}
              placeholder="category"
              onClear={() => {
                setCategorySelected("")
                methods.setValue("category", "")
                methods.clearErrors("category")
              }}
              value={categorySelected}
            />
            <RadioGroup
              onChange={onChangeTransactionType}
              items={[
                { label: <Icon icon={ArrowUp} color="green" />, value: "income", selected: true },
                { label: <Icon icon={ArrowRightLeft} />, value: "transaction", selected: false },
                { label: <Icon icon={ArrowDown} color="red" />, value: "outcome", selected: false }
              ]}
            />
            <FormCheckbox<KeyofFormTransaction>
              icon={Repeat}
              label="Fixed transaction"
              name="fixed"
            />
            <FormCheckbox<KeyofFormTransaction>
              icon={HandCoins}
              label="Already paid"
              name="paid"
            />
            <ButtonSubmit
              isPending={isPending}
              // titleWhenIsPending="Saving"
              onPress={methods.handleSubmit(handleSubmitTransactionForm)}
              title="Add"
            />
          </View>
        </FormProvider>
      </TouchableWithoutFeedback>
    </CustomBottomSheetView>
  )
}