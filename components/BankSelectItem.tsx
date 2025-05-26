import { BankAccountDto } from "@/@types/BankAccount";
import { formatToBrl } from "@/utils/formatToBrl";
import { Text, View } from "react-native";
import { SelectBottomSheetWrapper } from "../UI/SelectBottomSheetWrapper";
import { OriginDestinyAccount } from "@/@types/WalletTypes";

interface Props {
  item: BankAccountDto;
  handleSelectAccount: (account: BankAccountDto, type: OriginDestinyAccount) => void;
  type: OriginDestinyAccount
}

export function BankSelectItem({ item, handleSelectAccount, type }: Props) {
  return (
    <SelectBottomSheetWrapper onPress={() => handleSelectAccount(item, type)}>
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
    </SelectBottomSheetWrapper>
  )
}
