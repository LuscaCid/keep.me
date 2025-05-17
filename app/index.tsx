import { View, ScrollView, FlatList } from "react-native";
import {useState } from "react";
import "../global.css"
import { HomeHeader } from "@/components/HomeHeader";
import { WalletInfo } from "@/components/WalletInfo";
import { IncomesOutcomesAmount } from "@/components/IncomesOutcomesAmount";
import { FinancialWrapper } from "@/components/FinancialWrapper";
import { EarningCard } from "@/components/EarningCard";
import { Saving, SavingCard } from "@/components/SavingCard";

const savings : Saving[] = [
  { actualValue: 100, goal: 300, name: "baseado 1", id : 1},
  { actualValue: 110, goal: 300, name: "baseado 2", id : 2},
  { actualValue: 120, goal: 300, name: "baseado 3", id : 3},
  { actualValue: 130, goal: 300, name: "baseado 4", id : 4},
  { actualValue: 140, goal: 300, name: "baseado 5", id : 5},
  { actualValue: 150, goal: 300, name: "baseado 6", id : 6},
]
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
    <View className={"h-full w-full  flex flex-col gap-6 bg-zinc-100 dark:bg-zinc-950"}>
      <HomeHeader />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex flex-col gap-6 bg-zinc-100 dark:bg-zinc-950"
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
            contentContainerClassName="gap-4"
          />
        </FinancialWrapper>
      </ScrollView>

    </View>
  );
}
