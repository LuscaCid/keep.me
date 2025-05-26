import { ChevronRight } from "lucide-react-native";
import { ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon } from "./Icon";

interface SelectBottomSheetWrapperProps {
  children: ReactNode;
  onPress: (...args: any[]) => any;
}
export function SelectBottomSheetWrapper({ children, onPress }: SelectBottomSheetWrapperProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className=" p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg"
    >
      <View className="flex flex-row items-center justify-between">
        {children}
      <Icon size={20} icon={ChevronRight}/>
      </View>
    </TouchableOpacity>
  )
}