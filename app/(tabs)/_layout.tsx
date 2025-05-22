import { Tabs } from "expo-router";
import { ArrowRight, Home, MessageCircle, SunMoon, User, Wallet2Icon } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import "../../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDropdow } from "@/store/dropdown";
import { TouchableOpacity, View } from "react-native";
import { DropdownButton } from "@/components/GenericalHeader";


export default function Layout() {
  const { colorScheme } = useColorScheme();

  const getColor = (focused: boolean) => {
    let color = ";";
    if (focused) {
      color = colorScheme === "dark" ? "#f1f1f1" : "#000";
      return color;
    }
    color = colorScheme === "dark" ? "#ffffff70" : "#20202070"
    return color;
  }

  return (
    <Tabs
      screenOptions={
        {
          freezeOnBlur : true,
          sceneStyle : {backgroundColor : colorScheme === "dark" ? "#27272a" : "#fff"} ,
          headerShown: false,
          tabBarShowLabel: false,
          animation: "none",
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "#27272a" : "#fff"
          },
        }
      }
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const colorWhenFocused = getColor(focused);
            return <Home size={size} color={colorWhenFocused} />
          }
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          tabBarIcon: ({ focused, size }) => {
            const colorWhenFocused = getColor(focused);
            return <Wallet2Icon size={size} color={colorWhenFocused} />
          }
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ focused, size }) => {
            const colorWhenFocused = getColor(focused);
            return <MessageCircle size={size} color={colorWhenFocused} />
          }
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, size }) => {
            const colorWhenFocused = getColor(focused);
            return <User size={size} color={colorWhenFocused} />
          }
        }}
      />
    </Tabs>
  )
}