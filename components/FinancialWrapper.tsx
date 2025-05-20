import { ReactNode } from "react";
import { Text, View, TouchableOpacity } from "react-native";

interface Props {
  title : string;
  children : ReactNode;
}
export function FinancialWrapper({ title, children } : Props) {
  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-row items-center justify-between">
        <Text className="dark:text-zinc-100 text-2xl font-semibold text-zinc-900 ">
          {title}
        </Text>
        <TouchableOpacity>
          <Text className="text-blue-500 font-medium dark:text-blue-600">
            See all
          </Text>
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
}