import { useDropdow } from "@/store/dropdown";
import { Icon } from "@/UI/Icon";
import { Href, useNavigation, useRouter } from "expo-router";
import { ChevronLeft, EllipsisVertical, LucideIcon } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { ReactNode } from "react";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";

interface Props {
  title: string;
  dropdown?: ReactNode;
  backRoute?: Href;
}
export function GenericalHeader({ dropdown, title, backRoute }: Props) {
  const { isOpen, setIsOpen } = useDropdow();
  const navigate = useNavigation();
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const color = colorScheme === "dark" ? "#f1f1f1" : "#000"

  const handleNavigate = () => {
    setIsOpen(false);
    if (backRoute) {
      router.navigate(backRoute);
      return;
    }
    navigate.goBack();
  }
  const onPress = () => {
    toggleColorScheme();
    setIsOpen(false);
  }

  return (
    <View className="flex flex-row items-center justify-between  py-2">
      <TouchableOpacity className="p-4" onPress={handleNavigate}>
        <ChevronLeft size={26} color={color} />
      </TouchableOpacity>
      <Text className="font-bold text-2xl dark:text-zinc-200">
        {title}
      </Text>
      <TouchableOpacity
        className="p-4 "
        onPress={() => setIsOpen(!isOpen)}
      >
        <EllipsisVertical size={20} color={color} />
      </TouchableOpacity>
    </View>
  );
}
interface DropdownButtonProps {
  title: string;
  onPress: (e: GestureResponderEvent) => void;
  icon: LucideIcon;
}
export function DropdownButton({ onPress, title, icon }: DropdownButtonProps) {
  return (
    <TouchableOpacity
      className="flex flex-row gap-4 my-2 mx-4 items-center justify-between"
      onPress={onPress}
    >
      <Text className="text-lg text-zinc-900 dark:text-zinc-100">
        {title}
      </Text>
      <Icon icon={icon} />
    </TouchableOpacity>
  )
}