import { Transaction } from "@/@types/Transaction";
import { AppScrollView } from "@/components/AppScrollView";
import { BankAccountBottomSheet } from "@/components/BankAccountBottomSheetForm";
import { FinancialWrapper } from "@/components/FinancialWrapper";
import { DropdownButton, GenericalHeader } from "@/components/GenericalHeader";
import { TransactionCard } from "@/components/TransactionCard";
import { TransactionFormBottomSheet } from "@/components/TransactionFormBottomSheet";
import { FormSchemaFactory } from "@/constants/formSchemas";
import { transactions } from "@/constants/transactions";
import { useDropdow } from "@/store/dropdown";
import { CustomBottomSheetFlatList } from "@/UI/CustomBottomSheets";
import { Icon } from "@/UI/Icon";
import { ScreenWrapper } from "@/UI/ScreenWrapper";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, PlusCircle } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useCallback, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, RefreshControl, SectionList, Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import { BankCardComponent } from "@/components/BankAccountCard";
import { BankAccountDto } from "@/@types/BankAccount";
import { BankSelectItem } from "@/UI/BankSelectItem";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useBankAccount } from "@/hooks/useBankAccount";

export type FormTransactionType = z.infer<typeof FormSchemaFactory.formTransactionSchema>;
export type KeyofFormTransaction = keyof FormTransactionType;

export default function WalletScreen() {
  const queryKey = useMemo(() => ["bank-accounts"], [])

  const [transactionToEdit] = useState<Transaction | undefined>(undefined);
  const [selectedBankAccount, setSelectedBankAccount] = useState<BankAccountDto | undefined>(undefined);
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();
  const { colorScheme } = useColorScheme();
  const setIsOpen = useDropdow(state => state.setIsOpen);
  const { getBankAccounts } = useBankAccount();

  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const cardBottomSheetRef = useRef<BottomSheetMethods>(null);
  const bankAccountBottomSheetRef = useRef<BottomSheetMethods>(null);

  const methods = useForm<FormTransactionType>({
    resolver: zodResolver(FormSchemaFactory.formTransactionSchema),
    defaultValues: {
      bankAccount: transactionToEdit ? transactionToEdit.whereFrom : "",
      type: transactionToEdit ? transactionToEdit.type : "",
      value: transactionToEdit ? transactionToEdit.value.toString() : "",
    }
  });

  const { data: bankAccounts, isLoading, isFetching, isError, error } = useQuery({
    queryFn: async () => {
      const response = await fetch("http://26.142.88.159:3000/bankAccounts?_page=1&_limit=5");
      return await response.json();
    },
    queryKey
  })

  const onChangeBottomSheetHeight = useCallback((index: number) => {
    if (index === -1) Keyboard.dismiss();
  }, []);

  const handleOpenTransactionBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, [bottomSheetRef])

  const handleOpenCardBottomSheet = useCallback(() => {
    setIsOpen(false);
    cardBottomSheetRef.current?.expand();
  }, [setIsOpen, cardBottomSheetRef]);

  const handleSelectAccount = useCallback((account: BankAccountDto) => {
    bankAccountBottomSheetRef.current?.close();
    setSelectedBankAccount(account);
    methods.setValue("bankAccount", account.id.toString());

  }, [bankAccountBottomSheetRef, methods]);

  const onRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey });

  }, [queryClient, queryKey])
  return (
    <ScreenWrapper
      bottomSheets={[
        {
          ref: bottomSheetRef,
          onChange: onChangeBottomSheetHeight,
          children: (
            <TransactionFormBottomSheet
              setSelectedBankAccount={setSelectedBankAccount}
              selectedBankAccount={selectedBankAccount}
              bankAccountBottomSheetRef={bankAccountBottomSheetRef}
              methods={methods}
            />
          ),
          snapPoints: ["10%", "40%", "70%"]
        },
        {
          onChange: onChangeBottomSheetHeight,
          ref: cardBottomSheetRef,
          children: <BankAccountBottomSheet />,
          snapPoints: ["30%", "50%", "70%"],
          index: -1
        },
        {
          ref: bankAccountBottomSheetRef,
          onChange: onChangeBottomSheetHeight,
          enableDynamicSizing: false,
          children: (
            <CustomBottomSheetFlatList
              contentContainerClassName={" flex flex-col gap-4 pb-10"}
              data={bankAccounts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <BankSelectItem
                  item={item}
                  handleSelectAccount={handleSelectAccount}
                />
              )}
            />
          ),
          index: -1,
          snapPoints: ["20%", "50%"]
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
      <AppScrollView
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={onRefresh}
            colors={["#2196F3"]} // Android
            tintColor="#2196F3" // iOS
          />
        }
      >
        <View className="flex flex-row gap-4">
          <AppScrollView horizontal contentContainerClassName="flex flex-row gap-4" >
            <TouchableOpacity
              onPress={handleOpenCardBottomSheet}
              className="flex items-center justify-center p-3 border rounded-2xl border-dashed dark:border-zinc-400 border-zinc-500"
            >
              <Icon icon={PlusCircle} />
            </TouchableOpacity>
            {
              !isLoading && bankAccounts && bankAccounts.length > 0 && (
                bankAccounts.map((item) => (
                  <BankCardComponent bankCard={item} key={item.id} />
                ))
              )
            }
            {
              isError && error && (
                <Text className="dark:text-zinc-200 text-2xl">
                  {error.message}
                </Text>
              )
            }
          </AppScrollView>
        </View>
        <View className="flex flex-col gap-4">
          <TouchableOpacity
            onPress={handleOpenTransactionBottomSheet}
            className="w-full flex items-center flex-row gap-4 justify-center border dark:border-zinc-400 border-zinc-500 rounded-2xl border-dashed p-3 mt-4"
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
        <TouchableOpacity onPress={() => setPage(prev => prev + 1)} className="p-4 flex items-center justify-center">
          <Text className="text-lg font-medium text-blue-500 ">
            Load more
          </Text>
        </TouchableOpacity>
      </AppScrollView>
    </ScreenWrapper>
  );
}