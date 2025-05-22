import { Saving } from "@/@types/Saving";
import { formatToBrl } from "@/utils/formatToBrl";
import { ChevronRight } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "../UI/Icon";

interface Props {
  saving: Saving;
  keyColor: number;
  additionalClassname: string;
}
export function SavingCard({ saving, keyColor, additionalClassname }: Props) {
  const [percent, setPercent] = useState(((saving.actualValue / saving.goal) * 100).toFixed());
  const { colorScheme } = useColorScheme();
  return (
    <View className={`dark:border dark:border-zinc-800 rounded-2xl gap-2 flex-1 p-4 flex flex-col bg-white dark:bg-zinc-900 ${additionalClassname}`}>
      {/* <Text className="text-zinc-300 dark:text-zinc-400"> {percent}</Text> */}
      <View className="flex flex-row justify-between ">
        <Text className="text-zinc-500 dark:text-zinc-400">
          {saving.name}
        </Text>
        <TouchableOpacity>
          <Icon icon={ChevronRight} />
        </TouchableOpacity>
      </View>
      <Text className="text-2xl font-bold dark:text-zinc-200">
        {formatToBrl(saving.actualValue)}
      </Text>
      <View className="bg-zinc-200 dark:bg-zinc-800 h-3 w-full rounded-full relative ">
        <View
          className={`absolute z-[50] left-0 h-3 rounded-full bg-red-500`}
          style={{
            width: `${Number(percent)}%`
          }}
        ></View>
      </View>
    </View>
  );
}