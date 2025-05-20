import { useNavigation } from "expo-router";
import { ChevronLeft, EllipsisVertical } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  title : string;
  dropdown : ReactNode; 
}
export function GenericalHeader ({ dropdown, title } : Props) {
  const navigate = useNavigation();
  const { colorScheme } = useColorScheme();
  const color = colorScheme === "dark" ? "#f1f1f1" : "#000"
  
  const handleNavigate = () => {
    navigate.goBack();
  }
  return (
    <View className="flex flex-row items-center justify-between pl-1 pr-3 py-1">
      <TouchableOpacity onPress={handleNavigate}>
        <ChevronLeft size={26} color={color} />
      </TouchableOpacity>
      <Text className="font-bold text-2xl dark:text-zinc-200">
        {title}
      </Text>
      <TouchableOpacity>
        <EllipsisVertical size={20} color={color}/>
      </TouchableOpacity>
    </View>
  );
}