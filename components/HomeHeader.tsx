import { useDropdow } from "@/store/dropdown";
import { ArrowRight, EllipsisVertical, SunMoon, User } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { DropdownButton } from "./GenericalHeader";
export function HomeHeader() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const color = colorScheme === "dark" ? "#f1f1f1" : "#000"
  const { setIsOpen, isOpen } = useDropdow();

  return (
    <View className=" flex fixed top-2 flex-row justify-between items-center w-full rounded-2xl px-2 py-4">
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
      <TouchableOpacity
        className="p-4 "
        onPress={() => setIsOpen(!isOpen)}
      >
        <EllipsisVertical size={20} color={color} />
      </TouchableOpacity>

      {
        isOpen && (
          <View
            className=" right-5 top-16 z-50 dark:bg-zinc-800 flex flex-col  bg-zinc-100 rounded-2xl border border-zinc-200 dark:border-zinc-800 absolute"
          >
            <DropdownButton icon={SunMoon} onPress={toggleColorScheme} title="Theme" />
            <DropdownButton icon={User} onPress={toggleColorScheme} title="Account" />
            <View className="w-full h-[1px] bg-zinc-300 mt-5 dark:bg-zinc-700"></View>
            <DropdownButton icon={ArrowRight} onPress={toggleColorScheme} title="Logout" />
          </View>
        )
      }
    </View>
  );
}