import { AppScrollView } from "@/components/AppScrollView";
import { CreditCardComponent } from "@/components/CreditCard";
import { FinancialWrapper } from "@/components/FinancialWrapper";
import { DropdownButton, GenericalHeader } from "@/components/GenericalHeader";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { Link, useRouter } from "expo-router";
import { CreditCard, PlusCircle } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { FlatList, SectionList, Text, View } from "react-native";
import { Transaction } from "@/@types/Transaction";
import { TransactionCard } from "@/components/TransactionCard";
import { transactions } from "@/constants/transactions";
import { creditCards } from "@/constants/creditCards";

export default function WalletScreen() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const handleNavigateToNewCard = () => {
    router.push({ pathname: "/[id]", params: { id: "0" } });
  }
  return (
    <ScreenWrapper>
      <GenericalHeader title="Wallet" dropdown={
        <DropdownButton icon={CreditCard} onPress={handleNavigateToNewCard} title="New card" />
      } />
      <AppScrollView>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName={"flex flex-row gap-4"}
          data={creditCards}
          renderItem={({ item }) => (
            <CreditCardComponent creditCard={item} key={item.id} />
          )}
        />
          <View className="flex flex-col gap-4">
            <Link
              className=" border dark:border-zinc-400 border-zinc-500 rounded-2xl border-dashed p-2 w-full mt-4"
              href={{ pathname: "/(card)/[id]", params: { id: "0" } }}
            >
              <View className="w-full flex items-center justify-center">
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
      </AppScrollView>
    </ScreenWrapper>
  );
}

