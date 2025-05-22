import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot, Stack, useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "@/constants/storageKeys";
import { View } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    async function redirect() {
      const skipIndex = await AsyncStorage.getItem(StorageKeys.skipIndex);
      if (skipIndex && Boolean(JSON.parse(skipIndex))) {
        router.navigate("/(tabs)/home");
      }
    }
    redirect();
  }, []);
  const backgroundColor = colorScheme === "dark" ? "#18181b" : "#ffffff";

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor }}>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="signup" />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}