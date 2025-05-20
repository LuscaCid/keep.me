import { CreditCard } from "@/@types/CreditCard";
import { formatToBrl } from "@/utils/formatToBrl";
import { Text, View } from "react-native";
interface Props {
  creditCard : CreditCard
}
export function CreditCardComponent ({ creditCard } : Props) {
  return (
    <View className="rounded-2xl w-[250px] h-[150px] bg-white  dark:bg-zinc-900">
      <View className="flex flex-row relative  m-4">
        <View className="flex flex-col gap-1">
          <Text className="font-thin text-lg text-zinc-800 dark:text-zinc-500">
            Total Balance
          </Text>
          <Text className="font-semibold text-2xl  text-zinc-900 dark:text-zinc-200">
            {formatToBrl(creditCard.totalBalance)}
          </Text>
        </View>
        <Text className={`text-lg font-bold absolute right-0 text-purple-600`}>
          {creditCard.bank}
        </Text>
      </View>
      <View className="w-full bg-zinc-400 dark:bg-zinc-800 absolute rounded-b-2xl bottom-0 left-0 right-0 py-2 px-4 flex flex-row items-center justify-between">
        <View className="flex flex-col gap-1">
          <Text className="dark:text-zinc-600 text-zinc-200">Name</Text>
          <Text className="dark:text-zinc-400 text-zinc-100">{creditCard.name}</Text>
        </View>
        <View className="flex flex-col gap-1">
          <Text className="dark:text-zinc-600 text-zinc-200">Cvv</Text>
          <Text className="dark:text-zinc-400 text-zinc-100">{creditCard.cvv}</Text>
        </View>
      </View>
    </View>
  );
}