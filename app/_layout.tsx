import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            animationDuration: 2000
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="signup" />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}