import { SunMoon } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";
export function HomeHeader() {
  const { setColorScheme, colorScheme } = useColorScheme();

  const handleChangeTheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <View  className="flex fixed top-2 flex-row justify-between items-center w-full rounded-2xl px-3 py-2">
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
      <TouchableOpacity onPress={handleChangeTheme}>
        <SunMoon className="dark:text-zinc-100" color={colorScheme === "dark" ? "#fff" : "#000"} size={24} />
      </TouchableOpacity>
    </View>
  );
}