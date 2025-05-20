import { Tabs } from "expo-router";
import { Home, MessageCircle, User, Wallet2Icon } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import "../global.css";

export default function Layout() {
  const { colorScheme } = useColorScheme();
  return (
    <Tabs
      screenOptions={
        {
          headerShown: false,
          tabBarShowLabel: false,
          animation: "shift",
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "#27272a" : "#fff"
          }
        }
      }
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            const colorWhenFocused = focused && colorScheme === "dark" ?
              "#f1f1f1" : focused && colorScheme === "light" ? "#000" : "#00000070";

            return <Home size={size} color={colorWhenFocused} />
          }
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size }) => {
            const colorWhenFocused = focused && colorScheme === "dark" ?
              "#f1f1f1" : focused && colorScheme === "light" ? "#000" : "#00000070";
            return <Wallet2Icon size={size} color={colorWhenFocused} />
          }
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size }) => {
            const colorWhenFocused = focused && colorScheme === "dark" ?
              "#f1f1f1" : focused && colorScheme === "light" ? "#000" : "#00000070";
            return <MessageCircle size={size} color={colorWhenFocused} />
          }
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size }) => {
            const colorWhenFocused = focused && colorScheme === "dark" ?
              "#f1f1f1" : focused && colorScheme === "light" ? "#000" : "#00000070";
            return <User size={size} color={colorWhenFocused} />
          }
        }}
      />
      <Tabs.Screen
        name="+not-found"
        options={{ href: null, }}
      />
      <Tabs.Screen
        name="(card)"
        options={{ href: null, }}
      />
    </Tabs>
  )
}