import Incomeoutcome1 from "../assets/images/incomeoutcome1.png";
import Incomeoutcome2 from "../assets/images/incomeoutcome2.png";
import { ArrowDown, ArrowUp } from "lucide-react-native";
import { JSX, useMemo } from "react";
import { Image, Text, View } from "react-native";
import { formatToBrl } from "@/utils/formatToBrl";
import { TransactionType } from "@/@types/Transaction";

export function IncomesOutcomesAmount() {
  return (
    <View className="bg-zinc-900 dark:border dark:border-zinc-800 w-full rounded-2xl py-4 px-6 overflow-hidden relative ">
      <Image className="absolute top-0 left-0 opacity-80" source={Incomeoutcome1} />
      <Image className="absolute bottom-0 right-0 opacity-80" source={Incomeoutcome2} />
      <View className="flex flex-row items-center justify-between">
        <IncomeOutcomeAside type="income" />
        <View className="h-full w-[1px] bg-zinc-200" />
        <IncomeOutcomeAside type="outcome" />
      </View>
    </View>
  );
}

interface IncomeOutcomeAsideProps {
  type: TransactionType;
}
export function IncomeOutcomeAside({ type }: IncomeOutcomeAsideProps) {
  const title: Record<TransactionType, string> = useMemo(() => ({
    income: "Income",
    outcome: "Outcome"
  }), []);
  const arrow: Record<TransactionType, JSX.Element> = useMemo(() => ({
    income: <ArrowUp strokeWidth={3} size={30} color={"#53D258"} />,
    outcome: <ArrowDown strokeWidth={3} size={30} color={"#E25C5C"} />
  }), []);

  return (
    <View className="flex flex-row items-center gap-4">
      {arrow[type]}
      <View className="flex flex-col">
        <Text className="text-zinc-200 text-lg">
          {title[type]}
        </Text>
        <Text className="text-2xl font-semibold text-zinc-200">
          {formatToBrl(1000)}
        </Text>
      </View>
    </View>
  );
}