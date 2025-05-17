import { formatToBrl } from "@/utils/formatToBrl";
import { Text, View } from "react-native";
export const vibrantColors: string[] = [
  'bg-red-400',
  'bg-blue-400',
  'bg-green-400',
  'bg-yellow-400',
  'bg-pink-400',
  'bg-purple-400'
];
interface Props {
  from : string;
  amount : number;
  keyColor : number;
}
export function EarningCard ({ amount, from, keyColor } : Props) {
  return (
    <View className={`flex flex-col gap-2  items-center px-8  py-5 ${vibrantColors[keyColor]} rounded-2xl`}>
      <View className="rounded-full h-12 w-12 items-start flex justify-center bg-zinc-200 outline-2 outline-blue-500">
        <Text className="font-semibold text-lg w-fit m-auto">
          {from.charAt(0)}
        </Text>
      </View>
      <View className="flex flex-col gap-2">
        <Text className="text-md font-medium text-center text-zinc-100">
          {from}
        </Text>
        <Text className="text-2xl font-bold text-zinc-100 ">
          {formatToBrl(amount)}
        </Text>
      </View>
    </View>
  );
}