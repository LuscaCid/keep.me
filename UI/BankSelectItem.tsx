import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "./Icon";
import { BankAccountDto } from "@/@types/BankAccount";
import { formatToBrl } from "@/utils/formatToBrl";
import { ChevronRight } from "lucide-react-native";
interface Props {
 item : BankAccountDto; 
 handleSelectAccount : (item : BankAccountDto) => void;
}
export function BankSelectItem({ item, handleSelectAccount } : Props) {
  return (
    <TouchableOpacity
      onPress={() => handleSelectAccount(item)}
      className=" p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg"
    >
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-2">
          <Text className="dark:text-zinc-200 font-medium text-lg">
            {item.bankName}
          </Text>
          <View className="p-0.5 w-[10px] rounded-lg bg-zinc-300 dark:bg-zinc-700"></View>
          <Text className="dark:text-zinc-200 font-medium text-md">
            {item.accountNumber}
          </Text>
          <View className="p-0.5 w-[10px] rounded-lg bg-zinc-300 dark:bg-zinc-700"></View>
          <Text className="text-green-500 dark:text-grren-600 font-medium text-md">
            {formatToBrl(item.balance)}
          </Text>
        </View>
        <Icon icon={ChevronRight} />
      </View>
    </TouchableOpacity>
  )
}