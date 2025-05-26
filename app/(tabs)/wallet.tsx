import { BankAccountDto } from "@/@types/BankAccount";
import { Transaction } from "@/@types/Transaction";
import { AccountsField, FormTransactionType, OriginDestinyAccount } from "@/@types/WalletTypes";
import { AppScrollView } from "@/components/AppScrollView";
import { BankAccountBottomSheet } from "@/components/BankAccountBottomSheetForm";
import { BankCardComponent } from "@/components/BankAccountCard";
import { BankSelectItem } from "@/components/BankSelectItem";
import { CategoryBottomSheet } from "@/components/CategoryBottomSheet";
import { FinancialWrapper } from "@/components/FinancialWrapper";
import { DropdownButton, GenericalHeader } from "@/components/GenericalHeader";
import { TransactionCard } from "@/components/TransactionCard";
import { TransactionFormBottomSheet } from "@/components/TransactionFormBottomSheet";
import { FormSchemaFactory } from "@/constants/formSchemas";
import { useBankAccount } from "@/hooks/useBankAccount";
import { useTransaction } from "@/hooks/useTransaction";
import { useDropdow } from "@/store/dropdown";
import { CustomBottomSheetFlatList } from "@/UI/CustomBottomSheets";
import { Icon } from "@/UI/Icon";
import { ScreenWrapper } from "@/UI/ScreenWrapper";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CreditCard, PlusCircle } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useCallback, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, RefreshControl, SectionList, Text, TouchableOpacity, View } from "react-native";

export default function WalletScreen() {
  const bankAccountsQueryKey = useMemo(() => ["bank-accounts"], [])
  const transactionsQueryKey = useMemo(() => ["transactions"], [])

  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | undefined>(undefined);
  const [selectedBankAccounts, setSelectedBankAccounts] = useState<AccountsField>({} as AccountsField);
  const [categorySelected, setCategorySelected] = useState<string>("");
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();
  const { colorScheme } = useColorScheme();
  const setIsOpen = useDropdow(state => state.setIsOpen);

  const { getBankAccounts } = useBankAccount();
  const { getTransactionsGroupedByDate } = useTransaction();

  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const cardBottomSheetRef = useRef<BottomSheetMethods>(null);

  const bankOriginAccountBottomSheetRef = useRef<BottomSheetMethods>(null);
  const bankDestinyAccountBottomSheetRef = useRef<BottomSheetMethods>(null);

  const categoryBottomSheetRef = useRef<BottomSheetMethods>(null);

  const methods = useForm<FormTransactionType>({
    resolver: zodResolver(FormSchemaFactory.formTransactionSchema),
    defaultValues: {
      bankAccount: transactionToEdit ? transactionToEdit.whereFrom : "",
      type: transactionToEdit ? transactionToEdit.type : "",
      value: transactionToEdit ? transactionToEdit.value : 0,
    }
  });

  const { data: bankAccounts, isLoading, isFetching, isError, error } = useQuery({
    queryFn: async () => getBankAccounts(page),
    queryKey: bankAccountsQueryKey
  });
  const { data: transactions } = useQuery({
    queryFn: async () => getTransactionsGroupedByDate(page),
    queryKey: transactionsQueryKey
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

  const handleSelectFromOriginBottomSheet = useCallback((account: BankAccountDto) => {

    bankOriginAccountBottomSheetRef.current?.close();
    setSelectedBankAccounts({ ...selectedBankAccounts, selectedOriginBankAccount: account });
    methods.setValue("bankAccount", account.id.toString());

  }, [methods, bankOriginAccountBottomSheetRef, selectedBankAccounts]);

  const handleSelectFromDestinyBottomSheet = useCallback((account: BankAccountDto) => {

    bankDestinyAccountBottomSheetRef.current?.close();
    setSelectedBankAccounts({ ...selectedBankAccounts, selectedDestinyBankAccount: account });
    methods.setValue("destinyBankAccount", account.id.toString());

  }, [methods, bankDestinyAccountBottomSheetRef, selectedBankAccounts]);

  const validateIfIsTheSameAccount = useCallback((
    justSelectedAccount: BankAccountDto,
    type: OriginDestinyAccount
  ) => {
    if (
      (
        selectedBankAccounts.selectedOriginBankAccount &&
        selectedBankAccounts.selectedOriginBankAccount.id === justSelectedAccount.id &&
        type === OriginDestinyAccount.Destiny
      ) ||
      (
        selectedBankAccounts.selectedDestinyBankAccount &&
        selectedBankAccounts.selectedDestinyBankAccount.id === justSelectedAccount.id &&
        type === OriginDestinyAccount.Origin
      )
    ) {
      const message = "Não é possível selecionar a mesma conta de destino e origem para realizar a transação"
      methods.setError("bankAccount", { message });
      methods.setError("destinyBankAccount", { message });

      return
    }
    methods.clearErrors("bankAccount");
    methods.clearErrors("destinyBankAccount");
  }, [selectedBankAccounts, methods])

  const handleSelectAccount = useCallback((account: BankAccountDto, type: OriginDestinyAccount) => {
    validateIfIsTheSameAccount(account, type);
    switch (type) {
      case OriginDestinyAccount.Destiny:
        handleSelectFromDestinyBottomSheet(account);
        return;
      case OriginDestinyAccount.Origin:
        handleSelectFromOriginBottomSheet(account);
        return;
    }
  }, [
    handleSelectFromDestinyBottomSheet,
    handleSelectFromOriginBottomSheet,
    validateIfIsTheSameAccount
  ]);

  const onRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: bankAccountsQueryKey });

  }, [queryClient, bankAccountsQueryKey])
  return (
    <ScreenWrapper
      bottomSheets={[
        {
          ref: bottomSheetRef,
          onChange: onChangeBottomSheetHeight,
          children: (
            <TransactionFormBottomSheet
              setCategorySelected={setCategorySelected}
              categorySelected={categorySelected}
              selectedBankAccounts={selectedBankAccounts}
              setSelectedBankAccounts={setSelectedBankAccounts}
              categoryBottomSheetRef={categoryBottomSheetRef}
              bankOriginAccountBottomSheetRef={bankOriginAccountBottomSheetRef}
              bankDestinyAccountBottomSheetRef={bankDestinyAccountBottomSheetRef}
              methods={methods}
            />
          ),
          snapPoints: ["10%", "40%", "60%", "80%"]
        },
        {
          onChange: onChangeBottomSheetHeight,
          ref: cardBottomSheetRef,
          children: <BankAccountBottomSheet />,
          snapPoints: ["30%", "50%", "70%"],
          index: -1
        },
        {
          ref: bankOriginAccountBottomSheetRef,
          onChange: onChangeBottomSheetHeight,
          enableDynamicSizing: false,
          children: (
            <CustomBottomSheetFlatList
              ListHeaderComponent={
                <View className="pb-2 border-b border-zinc-300 dark:border-zinc-700">
                  <Text className="text-lg dark:text-zinc-200">
                    Select origin account:
                  </Text>
                </View>
              }
              contentContainerClassName={" flex flex-col gap-4 pb-10"}
              data={bankAccounts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <BankSelectItem
                  type={OriginDestinyAccount.Origin}
                  item={item}
                  handleSelectAccount={handleSelectAccount}
                />
              )}
            />
          ),
          index: -1,
          snapPoints: ["20%", "50%"]
        },
        {
          ref: bankDestinyAccountBottomSheetRef,
          onChange: onChangeBottomSheetHeight,
          enableDynamicSizing: false,
          children: (
            <CustomBottomSheetFlatList
              ListHeaderComponent={
                <View className="pb-2 border-b border-zinc-300 dark:border-zinc-700">
                  <Text className="text-lg dark:text-zinc-200">
                    Select destiny account:
                  </Text>
                </View>
              }
              contentContainerClassName={" flex flex-col gap-4 pb-10"}
              data={bankAccounts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <BankSelectItem
                  type={OriginDestinyAccount.Destiny}
                  item={item}
                  handleSelectAccount={handleSelectAccount}
                />
              )}
            />
          ),
          index: -1,
          snapPoints: ["20%", "50%"]
        },
        {
          ref: categoryBottomSheetRef,
          children: (
            <CategoryBottomSheet
              categoryBottomSheetRef={categoryBottomSheetRef}
              methods={methods}
              setCategorySelected={setCategorySelected}
            />
          ),
          enableDynamicSizing: false,
          snapPoints: ["10%", "30%", "50%"],
          index: -1
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
            {
              transactions && !isLoading && (
                <SectionList
                  contentContainerClassName="flex flex-col gap-2"
                  showsHorizontalScrollIndicator={false}
                  scrollEnabled={false}
                  sections={transactions as any}
                  renderSectionHeader={({ section: { title } }) => (
                    <Text className="text-zinc-400 dark:text-zinc-600 font-medium text-lg">
                      {formatDistanceToNow(title, { locale: ptBR, addSuffix: true })}
                    </Text>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TransactionCard
                      setTransactionToEdit={setTransactionToEdit}
                      transaction={item as Transaction}
                      key={item.id}
                    />
                  )}
                />
              )
            }

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