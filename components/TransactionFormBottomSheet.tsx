import { BankAccountDto } from "@/@types/BankAccount";
import { TransactionType } from "@/@types/Transaction";
import { FormTransactionType, KeyofFormTransaction } from "@/app/(tabs)/wallet";
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
import { ArrowDown, ArrowRightLeft, ArrowUp, ChevronUp, HandCoins, Repeat, X } from "lucide-react-native";
import { Dispatch, RefObject, SetStateAction, useCallback, useState } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";

interface Props {
  methods: UseFormReturn<FormTransactionType>;
  selectedBankAccount: BankAccountDto | undefined;
  setSelectedBankAccount: Dispatch<SetStateAction<BankAccountDto | undefined>>
  bankAccountBottomSheetRef: RefObject<BottomSheetMethods | null>;
}
// type TransactionType = 
export function TransactionFormBottomSheet({
  methods,
  bankAccountBottomSheetRef,
  selectedBankAccount,
  setSelectedBankAccount
}: Props) {
  const [selectedType, setSelectedTransactionType] = useState<TransactionType>("income");
  const { mutateAsync: addOutcomeAsync, isPending } = useMutation({
    mutationFn: async (data: FormTransactionType) => {
      await new Promise((reject, resolve) => setTimeout(resolve, 1000));
    },
    mutationKey: ["create-transaction"]
  })
  const handleSubmitTransactionForm = useCallback(async (data: FormTransactionType) => {
    console.log(data);
    await addOutcomeAsync(data);
  }, [addOutcomeAsync]);

  const handleOpenCreditCardsBottomSheet = useCallback(() => {
    bankAccountBottomSheetRef.current?.expand();
  }, [bankAccountBottomSheetRef]);
  const onChangeTransactionType = useCallback((value: RadioItem) => {
    methods.setValue("type", value.value);
    setSelectedTransactionType(value.value as TransactionType);
  }, [methods])
  const valueWatched = methods.watch("value");
  const bgColorAccordingTransactionType = selectedType === "income" ? "#bbf7d070" : selectedType === "outcome" ? "#fecaca" : "#e4e4e7";
  const borderColorAccordingTransactionType = selectedType === "income" ? "#15803d70" : selectedType === "outcome" ? "#b91c1c" : "#3f3f46";
  return (
    <CustomBottomSheetView >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FormProvider {...methods}>
          <View className="flex flex-col gap-4">
            <Text className="text-3xl border-b border-zinc-200 dark:border-zinc-700 pb-2 font-medium dark:text-zinc-200">
              {selectedType === "income" ? "Add income" : selectedType === "outcome" ? "Add outcome" : "Add transaction"}
            </Text>
            <View className="flex  flex-row justify-between items-center">
              <View
                style={{
                  backgroundColor: bgColorAccordingTransactionType + 80,
                  borderBottomColor: borderColorAccordingTransactionType + 50,
                  borderBottomWidth: 3
                }}
                className="flex flex-row gap-4 flex-1 justify-between items-center"
              >
                <Text className={`text-2xl  flex items-center justify-center p-2 font-semibold dark:text-zinc-200`}>
                  {formatToBrl(valueWatched.replace(",", "."))}
                </Text>
                <TouchableOpacity onPress={() => methods.setValue("value", "")} className="p-2">
                  <Icon icon={X} color="#ef4444" />
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
              name="value"
              placeholder="Transaction value"
              parseValue={(value) => isNaN(Number(value)) ? "" : value}
              numberKeyboard
            />
            <InputButton<KeyofFormTransaction>
              name="bankAccount"
              onPress={handleOpenCreditCardsBottomSheet}
              placeholder="Select bank account"
              onClear={() => setSelectedBankAccount(undefined)}
              value={selectedBankAccount ? `${selectedBankAccount.accountHolder} - ${formatToBrl(selectedBankAccount.balance)}` : undefined}
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