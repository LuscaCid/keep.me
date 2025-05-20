import { CreditCard } from "@/@types/CreditCard";
import { formatToBrl } from "@/utils/formatToBrl";
import { Text, View } from "react-native";
interface Props {
  creditCard : CreditCard
}
export function CreditCardComponent ({ creditCard } : Props) {
  return (
    <View className="rounded-2xl dark:border dark:border-zinc-700 w-[250px] bg-zinc-800">
      <View className="flex flex-row justify-between w-full m-4">
        <View className="flex flex-col gap-1">
          <Text className="font-thin text-lg text-zinc-300 dark:text-zinc-600">
            Total Balance
          </Text>
          <Text className="font-semibold text-2xl">
            {formatToBrl(creditCard.totalBalance)}
          </Text>
        </View>
        <Text className="text-lg font-bold">
          {creditCard.bank}
        </Text>
      </View>
 
      <View className="w-full bg-zinc-400 dark:bg-zinc-900 absolute rounded-b-2xl bottom-0 left-0 right-0 p-4 flex items-center justify-between">
        <View className="flex flex-col gap-1">
          <Text className="dark:text-zinc-600 text-zinc-200">Name</Text>
          <Text className="dark:text-zinc-400 text-zinc-400">{creditCard.name}</Text>
        </View>
      </View>
    </View>
  );
}