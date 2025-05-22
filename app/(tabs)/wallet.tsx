import { Transaction } from "@/@types/Transaction";
import { AppScrollView } from "@/components/AppScrollView";
import { CreditCardComponent } from "@/components/CreditCard";
import { FinancialWrapper } from "@/components/FinancialWrapper";
import { DropdownButton, GenericalHeader } from "@/components/GenericalHeader";
import { TransactionCard } from "@/components/TransactionCard";
import { creditCards } from "@/constants/creditCards";
import { FormSchemaFactory } from "@/constants/formSchemas";
import { transactions } from "@/constants/transactions";
import { useDropdow } from "@/store/dropdown";
import { ButtonSubmit } from "@/UI/ButtonSubmit";
import { FormInput } from "@/UI/FormInput";
import { Icon } from "@/UI/Icon";
import { RadioGroup, RadioItem } from "@/UI/RadioGroup";
import { ScreenWrapper } from "@/UI/ScreenWrapper";
import { api } from "@/utils/api";
import { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
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

type FormTransactionType = z.infer<typeof FormSchemaFactory.formTransactionSchema>;
type KeyofFormTransaction = keyof FormTransactionType;

export default function WalletScreen() {

  const { colorScheme } = useColorScheme();
  const setIsOpen = useDropdow(state => state.setIsOpen);
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const [transactionToEdit] = useState<Transaction | undefined>(undefined);
  const [items, setItems] = useState<RadioItem[]>([
    { label: <Icon icon={ArrowUp} color="green" />, value: "receipt", selected: true },
    { label: <Icon icon={ArrowRightLeft} />, value: "transaction", selected: false },
    { label: <Icon icon={ArrowDown} color="red" />, value: "expense", selected: false }
  ]);
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
    }
  })
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryFn: async () => {
      return await api.get("credit-cards");
    },
    queryKey: ["credit-card"],
    staleTime: 1000 * 60 * 5,
    enabled: false,
    refetchInterval: 1000,
    refetchOnWindowFocus: true,
    retry: 3
  });
  const handleOpenTransactionBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
    setItems([
      { label: <Icon icon={ArrowUp} color="green" />, value: "receipt", selected: true },
      { label: <Icon icon={ArrowRightLeft} />, value: "transaction", selected: false },
      { label: <Icon icon={ArrowDown} color="red" />, value: "expense", selected: false }
    ]);
  }, [bottomSheetRef])

  const handleNavigateToNewCard = useCallback(() => {
    setIsOpen(false);
    router.push({ pathname: "/card/[id]", params: { id: "0" } });
  }, [router, setIsOpen]);
  const handleSubmitTransactionForm = useCallback(async (data: FormTransactionType) => {
    console.log(data);
    await addOutcomeAsync(data);
  }, [addOutcomeAsync])
  return (
    <ScreenWrapper
      bottomSheet={{
        ref: bottomSheetRef,
        children: (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FormProvider {...methods}>
              <View className="flex flex-col gap-4 ">
                <Text className="text-2xl font-medium dark:text-zinc-200">
                  Add transaction
                </Text>
                <FormInput<KeyofFormTransaction>
                  name="value"
                  placeholder="Transaction value"
                  numberKeyboard
                />
                <FormInput<KeyofFormTransaction>
                  name="creditCard"
                  placeholder="Select credit card"
                />
                <RadioGroup setItems={setItems} items={items} />
                <ButtonSubmit
                  isPending={isPending}
                  titleWhenIsPending="Saving"
                  onPress={methods.handleSubmit(handleSubmitTransactionForm)}
                  title="Add"
                />
              </View>
            </FormProvider>
          </TouchableWithoutFeedback>

        )
      }}
      dropdown={
        <DropdownButton
          icon={CreditCard}
          onPress={handleNavigateToNewCard}
          title="New card"
        />
      }
    >
      <GenericalHeader title="Wallet" />
      <AppScrollView>
        <View className="flex flex-row gap-4">
          <AppScrollView horizontal contentContainerClassName="flex flex-row gap-4" >
            <TouchableOpacity
              onPress={handleNavigateToNewCard}
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

