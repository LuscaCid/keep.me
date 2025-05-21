import { AppScrollView } from "@/components/AppScrollView";
import { CreditCardComponent } from "@/components/CreditCard";
import { FinancialWrapper } from "@/components/FinancialWrapper";
import { DropdownButton, GenericalHeader } from "@/components/GenericalHeader";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { Link, useRouter } from "expo-router";
import { CreditCard, PlusCircle } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { FlatList, SectionList, Text, TouchableOpacity, View } from "react-native";
import { Transaction } from "@/@types/Transaction";
import { TransactionCard } from "@/components/TransactionCard";
import { transactions } from "@/constants/transactions";
import { creditCards } from "@/constants/creditCards";
import { useDropdow } from "@/store/dropdown";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";
import { useEffect } from "react";

export default function WalletScreen() {
  const { colorScheme } = useColorScheme();
  const setIsOpen = useDropdow(state => state.setIsOpen);
  const router = useRouter();
  const queryClient = useQueryClient();

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

  const handleFetch = () => {
    refetch();
  };
  const handleNavigateToNewCard = () => {
    setIsOpen(false);
    router.push({ pathname: "/card/[id]", params: { id: "0" } });
  }
  return (
    <ScreenWrapper
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
              <PlusCircle className="h-full bg-zinc-200" size={25} color={colorScheme === "dark" ? "#fff" : "#71717a"} />
            </TouchableOpacity>
            {
              creditCards.length > 0 && (
                creditCards.map((item) => (
                  <CreditCardComponent creditCard={item} key={item.id} />
                ))
              )
            }
          </AppScrollView>
          {/* <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName={"flex flex-row gap-4"}
            data={creditCards}
            renderItem={({ item }) => (
              <CreditCardComponent creditCard={item} key={item.id} />
            )}
          /> */}
        </View>

        <View className="flex flex-col gap-4">
          <Link
            className=" border dark:border-zinc-400 border-zinc-500 rounded-2xl border-dashed p-2 w-[full] mt-4"
            href={{ pathname: "/transaction/[id]", params: { id: "0" } }}
          >
            <View className="w-full flex items-center flex-row gap-4 justify-center">
              <Text className="dark:text-zinc-200 text-zinc-900">
                Add transaction
              </Text>
              <PlusCircle className="h-full bg-zinc-200" size={25} color={colorScheme === "dark" ? "#fff" : "#71717a"} />
            </View>
          </Link>
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

