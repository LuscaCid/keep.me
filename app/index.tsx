import { Icon } from "@/UI/Icon";
import { Link, useNavigation } from "expo-router";
import { SunMoon } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Hero from "../assets/images/Hero.png";
import { ScreenWrapper } from "@/UI/ScreenWrapper";
export default function RedirectRoute() {
  const navigate = useNavigation()
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <ScreenWrapper >
      <View className="h-full w-full relative flex flex-col gap-2">
        <View className="flex justify-between flex-row items-center px-4">
          <Text className="text-4xl  dark:text-zinc-100 text-zinc-950 font-bold">
            Keep.me
          </Text>
          <TouchableOpacity className="p-4" onPress={toggleColorScheme}>
            <Icon icon={SunMoon} />
          </TouchableOpacity>
        </View>
        <View className="flex flex-col items-start gap-6 w-full">
          <Text className="text-3xl p-4 dark:text-zinc-100 w-full text-left text-zinc-950 font-bold">
            Your finance app
          </Text>
          <Image
            className="mb-5 w-full min-h-min"
            source={Hero}
          />
          <Text className="text-4xl w-full font-bold text-left text-wrap dark:text-zinc-50">
            Make Your Financial Management Easier
          </Text>
          <Text className="text-2xl  dark:text-zinc-50 text-wrap w-full ">
            Financy is a mobile application that can help you manage your finances in a simple way.
          </Text>
        </View>
        <View className="absolute flex flex-col gap-2 bottom-10 left-4 right-4">
          <Link className="rounded-2xl flex w-full items-center justify-center p-4   bg-zinc-800 dark:bg-zinc-200" href={"/signup"}>
            <Text className="m-auto text-center text-zinc-50 dark:text-zinc-900 w-full">
              New account
            </Text>
          </Link>
          <Link
            href={{ pathname: "/(tabs)/home" }}
            className="rounded-2xl flex w-full items-center justify-center p-4   bg-zinc-800 dark:bg-zinc-200"
          >
            <Text className="m-auto text-center text-zinc-50 dark:text-zinc-900 ">
              Join app
            </Text>
          </Link>
        </View>

      </View>
    </ScreenWrapper>
  )
}