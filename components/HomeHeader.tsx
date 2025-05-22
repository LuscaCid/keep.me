import { useDropdow } from "@/store/dropdown";
import { ArrowRight, EllipsisVertical, SunMoon, User } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { DropdownButton } from "./GenericalHeader";
import { Link } from "expo-router";
import { BlurView } from "expo-blur";
export function HomeHeader() {
  const { colorScheme } = useColorScheme();
  
  const color = colorScheme === "dark" ? "#f1f1f1" : "#000";

  const { setIsOpen, isOpen } = useDropdow();

  return (
    <View className=" flex  fixed top-2 flex-row justify-between items-center w-full rounded-2xl px-2 py-4">
      <Link href={{ pathname : "/profile" }}> 
        <View className="flex flex-row gap-3 ">
          <Image className="w-14 h-14 rounded-full" src="https://github.com/luscaCid.png" />
          <View className="flex flex-col gap-0">
            <Text className="text-zinc-800 dark:text-zinc-200">
              Good morning
            </Text>
            <Text className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
              Lucas cid
            </Text>
          </View>
        </View>
      </Link>
      <TouchableOpacity
        className="p-4 "
        onPress={() => setIsOpen(!isOpen)}
      >
        <EllipsisVertical size={20} color={color} />
      </TouchableOpacity>
    </View>
  );
}