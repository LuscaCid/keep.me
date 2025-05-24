import { Icon } from "@/UI/Icon";
import { Link, useRouter } from "expo-router";
import { SunMoon } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Hero from "../assets/images/Hero.png";
import { ScreenWrapper } from "@/UI/ScreenWrapper";
import { useCallback, useRef, useState } from "react";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { ButtonSubmit } from "@/UI/ButtonSubmit";
import { Checkbox } from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "@/constants/storageKeys";
import { BottomSheetView } from "@gorhom/bottom-sheet";
export default function RedirectRoute() {
  const router = useRouter()
  const [ checked, setChecked ] = useState(false);
  const { toggleColorScheme } = useColorScheme();
  const redirectBottomSheet = useRef<BottomSheetMethods>(null);

  const askUserForAutomaticRedirect = useCallback(() => {
    redirectBottomSheet.current?.expand();
  }, [redirectBottomSheet])

  const handleNavigateToHome = useCallback(async () => {
    if (checked) {
      await AsyncStorage.setItem(StorageKeys.skipIndex, JSON.stringify(true));
    }
    router.push({ pathname: "/(tabs)/home" })
  }, [router, checked])

  return (
    <ScreenWrapper
      bottomSheets={[
        {
          ref: redirectBottomSheet,
          children: (
            <BottomSheetView className="bg-zinc-100 dark:bg-zinc-800 flex-1 p-4 flex flex-col gap-4 w-full">
              <View className="flex flex-row items-center gap-4">
                <Text className="text-lg font-semibold dark:text-zinc-100">
                  Abrir o aplicativo automaticamente da proxima vez?
                </Text>
                <Checkbox
                  onValueChange={setChecked}
                  value={checked}
                />
              </View>
              <ButtonSubmit
                title="Join"
                onPress={handleNavigateToHome}
              />
            </BottomSheetView>
          ),
          snapPoints: ['20%']
        }
      ]}
    >
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
        <View className="absolute flex flex-col gap-2 bottom-10 left-2 right-2">
          <Link className="rounded-2xl flex w-full items-center justify-center p-4  bg-zinc-800 dark:bg-zinc-200" href={"/signup"}>
            <Text className="m-auto text-center text-zinc-50 dark:text-zinc-900 w-full">
              New account
            </Text>
          </Link>
          <TouchableOpacity
            onPress={askUserForAutomaticRedirect}
            className="rounded-2xl flex w-full items-center justify-center p-4   bg-zinc-800 dark:bg-zinc-200"
          >
            <Text className="m-auto text-center text-zinc-50 dark:text-zinc-900 ">
              Join app
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  )
}