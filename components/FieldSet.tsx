import { ReactNode } from "react";
import { Text, View } from "react-native";
interface Props {
  input : ReactNode;
  label : string;
}
export function FieldSet ({ input, label } : Props) {
  return (
    <View className="flex flex-col gap-2">
      <Text className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
        {label}
      </Text>
      {input}
    </View>
  );
}