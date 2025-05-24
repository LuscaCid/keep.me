import { BankAccountDto } from "@/@types/BankAccount";
import { formatToBrl } from "@/utils/formatToBrl";
import { Text, View } from "react-native";
interface Props {
  bankCard: BankAccountDto
}
export function BankCardComponent({ bankCard }: Props) {
  return (
    <View className="rounded-2xl w-[280px] h-[160px] bg-white  dark:bg-zinc-900">
      <View className="flex flex-row relative  m-4">
        <View className="flex flex-col gap-2">
          <Text className="font-thin text-lg text-zinc-600 dark:text-zinc-700">
            Balance
          </Text>
          <Text className="font-semibold text-2xl  text-zinc-900 dark:text-zinc-200">
            {formatToBrl(bankCard.balance)}
          </Text>
        </View>
        <Text className={`text-lg font-bold absolute right-0 text-purple-600`}>
          {bankCard.bankName}
        </Text>
        <Text className={`text-md font-bold absolute right-0 bottom-0  dark:text-zinc-700 text-zinc-500`}>
          {bankCard.accountHolder}
        </Text>
      </View> 
      <View className="w-full bg-zinc-400 dark:bg-zinc-800 absolute rounded-b-2xl bottom-0 left-0 right-0 py-4 px-4 flex flex-row items-center justify-between">
        <View className="flex flex-col gap-1">
          <Text className="dark:text-zinc-600 text-zinc-200">Number</Text>
          <View className="flex flex-row gap-2 items-center">
            <Text className="dark:text-zinc-400 text-sm text-zinc-100">{bankCard.accountNumber}</Text>
            <View className="h-full w-[1px] bg-zinc-300 dark:bg-zinc-700"></View>
            <Text className="text-sm dark:text-zinc-400 text-zinc-100">{bankCard.nickname}</Text>
          </View>
        </View>
        <View className="flex flex-col gap-1">
          <Text className="dark:text-zinc-600 text-zinc-200">Agency</Text>
          <Text className="dark:text-zinc-400 text-sm text-zinc-100 text-right">{bankCard.agency}</Text>
        </View>
      </View>
    </View>
  );
}