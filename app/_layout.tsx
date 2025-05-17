import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css"

export default function Layout() {
  return (
    <SafeAreaView className="bg-zinc-100 dark:bg-zinc-950 h-full w-full px-5 pb-10" >
      <Stack >
        <Stack.Screen name={"index"} options={{ title: "Home", headerShown: false }} />
        <Stack.Screen name={"profile"} options={{ title: "Perfil", headerShown: false }} />
        <Stack.Screen name={"user/[id]"} options={{ title: "Usuario", headerShown: false }} />
      </Stack>

    </SafeAreaView>
  )
}