import { View, ScrollView, FlatList, SectionList, Text } from "react-native";
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
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const savings : Saving[] = [
  { actualValue: 100, goal: 300, name: "pupanca 1", id : 1 },
  { actualValue: 110, goal: 300, name: "pupanca 2", id : 2 },
  { actualValue: 120, goal: 300, name: "pupanca 3", id : 3 },
  { actualValue: 130, goal: 300, name: "pupanca 4", id : 4 },
  { actualValue: 140, goal: 300, name: "pupanca 5", id : 5 },
  { actualValue: 150, goal: 300, name: "pupanca 6", id : 6 },
];

const transactions = [
  {
    title : formatDistanceToNow(new Date(), { locale : ptBR, addSuffix : true }),
    data : [
      { category : "salary", date : new Date(), id :1, item : "Freelance", type : "income", value : 2000 },
      { category : "bill", date : '2025-05-19T20:36:40.522Z', id :2, item : "Light bill", type : "outcome", value : 300 },
    ]
  },
  {
    title : formatDistanceToNow(new Date("2025-05-18T20:36:40.522Z"), { locale : ptBR, addSuffix : true }),
    data : [
      { category : "salary", date : new Date("2025-05-18T20:36:40.522Z"), id :2, item : "Eua", type : "outcome", value : 200 },
      { category : "shopping", date : '2025-05-18T20:36:40.522Z', id :3, item : "Roupa", type : "outcome", value : 60 },
    ]
  }
];

export default function HomeScreen() 
{
  const renderItem = ({ item, index } : { item : Saving, index : number }) => {
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
      <HomeHeader />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerClassName=" flex flex-col gap-6 bg-zinc-100 dark:bg-zinc-950"
      >
        <View className="flex flex-col gap-4 w-full">
          <WalletInfo />
          <IncomesOutcomesAmount />
        </View>
        <FinancialWrapper title="Earnings">
          <ScrollView
            horizontal
            contentContainerClassName="gap-4 flex flex-row"
            showsHorizontalScrollIndicator={false}
          >
            {[...Array(6)].map((_, index) => (
              <EarningCard keyColor={index} key={index} amount={200} from="Freela" />
            ))}
          </ScrollView>
        </FinancialWrapper>
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
            renderSectionHeader={({ section : { title }}) => (
              <Text className="text-zinc-400 dark:text-zinc-600 font-medium text-lg">
                {title}
              </Text>
            )}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TransactionCard transaction={item as Transaction} key={item.id}/>
            )}
          />
        </FinancialWrapper>
      </ScrollView>

    </ScreenWrapper>
  );
}
