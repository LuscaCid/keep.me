import { CreditCard as CreditCardType } from "@/@types/CreditCard";
import { Transaction } from "@/@types/Transaction";
import { AppScrollView } from "@/components/AppScrollView";
import { CreditCardComponent } from "@/components/CreditCard";
import { CreditCardBottomSheet } from "@/components/CreditCardBottomSheetForm";
import { FinancialWrapper } from "@/components/FinancialWrapper";
import { DropdownButton, GenericalHeader } from "@/components/GenericalHeader";
import { TransactionCard } from "@/components/TransactionCard";
import { TransactionFormBottomSheet } from "@/components/TransactionFormBottomSheet";
import { creditCards } from "@/constants/creditCards";
import { FormSchemaFactory } from "@/constants/formSchemas";
import { transactions } from "@/constants/transactions";
import { useDropdow } from "@/store/dropdown";
import { ButtonSubmit } from "@/UI/ButtonSubmit";
import { FormInput } from "@/UI/FormInput";
import { Icon } from "@/UI/Icon";
import { InputButton } from "@/UI/InputButton";
import { RadioGroup, RadioItem } from "@/UI/RadioGroup";
import { ScreenWrapper } from "@/UI/ScreenWrapper";
import { api } from "@/utils/api";
import { SNAP_POINT_TYPE, TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ArrowDown, ArrowRightLeft, ArrowUp, CreditCard, Key, PlusCircle } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useCallback, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Keyboard, SectionList, Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";

export type FormTransactionType = z.infer<typeof FormSchemaFactory.formTransactionSchema>;
export type KeyofFormTransaction = keyof FormTransactionType;

export default function WalletScreen() {
  const [transactionToEdit] = useState<Transaction | undefined>(undefined);
  const [creditCardSelected, setCreditCardSelected] = useState<CreditCardType | undefined>(undefined);

  const [items, setItems] = useState<RadioItem[]>([
    { label: <Icon icon={ArrowUp} color="green" />, value: "receipt", selected: true },
    { label: <Icon icon={ArrowRightLeft} />, value: "transaction", selected: false },
    { label: <Icon icon={ArrowDown} color="red" />, value: "expense", selected: false }
  ]);

  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const setIsOpen = useDropdow(state => state.setIsOpen);

  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const cardBottomSheetRef = useRef<BottomSheetMethods>(null);
  const creditCardsBottomSheetRef = useRef<BottomSheetMethods>(null);

  const methods = useForm<FormTransactionType>({
    resolver: zodResolver(FormSchemaFactory.formTransactionSchema),
    defaultValues: {
      creditCard: transactionToEdit ? transactionToEdit.whereFrom : "",
      type: transactionToEdit ? transactionToEdit.type : "",
      value: transactionToEdit ? transactionToEdit.value.toString() : "",
    }
  });
  const { mutateAsync: addOutcomeAsync, isPending } = useMutation({
    mutationFn: async (data: FormTransactionType) => {
      await new Promise((reject, resolve) => setTimeout(resolve, 1000));
    },
    mutationKey: ["create-transaction"]
  })
  const onChangeBottomSheetHeight = useCallback((index: number, position: number, type: SNAP_POINT_TYPE) => {
    if (index === -1) Keyboard.dismiss();
  }, []);
  
  const handleOpenCreditCardsBottomSheet = useCallback(() => {
    creditCardsBottomSheetRef.current?.expand();
  }, [creditCardsBottomSheetRef]);

  const handleOpenTransactionBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
    setItems([
      { label: <Icon icon={ArrowUp} color="green" />, value: "receipt", selected: true },
      { label: <Icon icon={ArrowRightLeft} />, value: "transaction", selected: false },
      { label: <Icon icon={ArrowDown} color="red" />, value: "expense", selected: false }
    ]);
  }, [bottomSheetRef])

  const handleOpenCardBottomSheet = useCallback(() => {
    setIsOpen(false);
    cardBottomSheetRef.current?.expand();
  }, [router, setIsOpen]);

  const handleSubmitTransactionForm = useCallback(async (data: FormTransactionType) => {
    await addOutcomeAsync(data);
  }, [addOutcomeAsync]);

  return (
    <ScreenWrapper
      bottomSheets={[
        {
          ref: bottomSheetRef,
          onChange : onChangeBottomSheetHeight,
          children: (
            <TransactionFormBottomSheet
              handleOpenCreditCardsBottomSheet={handleOpenCreditCardsBottomSheet}
              handleSubmitTransactionForm={handleSubmitTransactionForm}
              isPending={isPending}
              items={items}
              methods={methods}
              setItems={setItems}
            />
          ),
          snapPoints: ["10%", "40%", "70%"]
        },
        {
          onChange: onChangeBottomSheetHeight,
          ref: cardBottomSheetRef,
          children: <CreditCardBottomSheet />,
          snapPoints: ["30%", "50%", "80%"],
          index: -1
        },
        {
          ref: creditCardsBottomSheetRef,
          onChange : onChangeBottomSheetHeight,
          children: (
            <View>
              <Text>
                Cartoes de credito
              </Text>
            </View>
          ),
          index: -1,
          snapPoints: ["40%", "70%"]
        }
      ]}
      dropdown={
        <DropdownButton
          icon={CreditCard}
          onPress={handleOpenCardBottomSheet}
          title="New card"
        />
      }
    >
      <GenericalHeader title="Wallet" />
      <AppScrollView>
        <View className="flex flex-row gap-4">
          <AppScrollView horizontal contentContainerClassName="flex flex-row gap-4" >
            <TouchableOpacity
              onPress={handleOpenCardBottomSheet}
              className="flex items-center justify-center p-4 border rounded-2xl border-dashed dark:border-zinc-400 border-zinc-500"
            >
              <Icon icon={PlusCircle} />
            </TouchableOpacity>
            {
              creditCards.length > 0 && (
                creditCards.map((item) => (
                  <CreditCardComponent creditCard={item} key={item.id} />
                ))
              )
            }
          </AppScrollView>
        </View>
        <View className="flex flex-col gap-4">
          <TouchableOpacity
            onPress={handleOpenTransactionBottomSheet}
            className="w-full flex items-center flex-row gap-4 justify-center border dark:border-zinc-400 border-zinc-500 rounded-2xl border-dashed p-2 mt-4"
          >
            <Text className="dark:text-zinc-200 text-zinc-900">
              Add transaction
            </Text>
            <PlusCircle className="h-full bg-zinc-200" size={25} color={colorScheme === "dark" ? "#fff" : "#71717a"} />
          </TouchableOpacity>
          <FinancialWrapper title="Transactions">
            <SectionList
              contentContainerClassName="flex flex-col gap-2"
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              sections={transactions}
              renderSectionHeader={({ section: { title } }) => (
                <Text className="text-zinc-400 dark:text-zinc-600 font-medium text-lg">
                  {title}
                </Text>
              )}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TransactionCard transaction={item as Transaction} key={item.id} />
              )}
            />
          </FinancialWrapper>
        </View>
        <TouchableOpacity className="p-4 flex items-center justify-center">
          <Text className="text-lg font-medium text-blue-500 ">
            Load more
          </Text>
        </TouchableOpacity>
      </AppScrollView>
    </ScreenWrapper>
  );
}

