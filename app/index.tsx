import { View, ScrollView, FlatList, SectionList, Text, TouchableWithoutFeedback } from "react-native";
import { HomeHeader } from "@/components/HomeHeader";
import { WalletInfo } from "@/components/WalletInfo";
import { IncomesOutcomesAmount } from "@/components/IncomesOutcomesAmount";
import { FinancialWrapper } from "@/components/FinancialWrapper";
import { EarningCard } from "@/components/EarningCard";
import { SavingCard } from "@/components/SavingCard";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { Saving } from "@/@types/Saving";
import { Transaction } from "@/@types/Transaction";
import { TransactionCard } from "@/components/TransactionCard";
import { savings } from "@/constants/savings";
import { transactions } from "@/constants/transactions";
import { earnings } from "@/constants/earnings";
import { useDropdow } from "@/store/dropdown";

export default function HomeScreen() {
  const setIsOpen = useDropdow(state => state.setIsOpen);
  const renderItem = ({ item, index }: { item: Saving, index: number }) => {
    const isOdd = index % 2 !== 0;
    return <SavingCard
      additionalClassname={`${!isOdd ? "mr-4" : "mr-0"}`}
      saving={item}
      key={item.id}
      keyColor={item.id}
    />
  }
  return (
    <ScreenWrapper>
      <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
        <HomeHeader />
      </TouchableWithoutFeedback>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName=" flex flex-col gap-6 bg-zinc-100 dark:bg-zinc-950"
      >
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View className="flex flex-col gap-4 w-full">
            <WalletInfo />
            <IncomesOutcomesAmount />
          </View>
        </TouchableWithoutFeedback>
        <FinancialWrapper title="Earnings">
          <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-4 flex flex-row"
            horizontal
            data={earnings}
            renderItem={({ item, index }) => (
              <EarningCard keyColor={index} key={index} amount={item.amount} from={item.from} />
            )}
          />
        </FinancialWrapper>
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View>
            <FinancialWrapper title="Savings">
              <FlatList
                data={savings}
                renderItem={renderItem}
                numColumns={2}
                className=""
                contentContainerClassName="gap-4 pr-[1px]"
                scrollEnabled={false}
              />
            </FinancialWrapper>
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
        </TouchableWithoutFeedback>
      </ScrollView>
    </ScreenWrapper>
  );
}
