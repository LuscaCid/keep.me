import { useDropdow } from "@/store/dropdown";
import { ExternalPathString, Href, RelativePathString, useNavigation, useRouter } from "expo-router";
import { ArrowRight, ChevronLeft, CreditCard, EllipsisVertical, LucideIcon, SunMoon, User } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { ReactNode, useState } from "react";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";

interface Props {
  title : string;
  dropdown? : ReactNode; 
  backRoute? : Href;
}
export function GenericalHeader ({ dropdown, title, backRoute } : Props) {
  const { isOpen, setIsOpen } = useDropdow();
  const navigate = useNavigation();
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const color = colorScheme === "dark" ? "#f1f1f1" : "#000"
  
  const handleNavigate = () => {
    if (backRoute) {
      router.navigate(backRoute);
      return;
    }
    navigate.goBack();
  }
  return (
    <View className="flex flex-row items-center justify-between  py-2 relative">
      <TouchableOpacity className="p-4" onPress={handleNavigate}>
        <ChevronLeft size={26} color={color} />
      </TouchableOpacity>
      <Text className="font-bold text-2xl dark:text-zinc-200">
        {title}
      </Text>
      <TouchableOpacity 
        className="p-4 "
        onPress={() => setIsOpen(!isOpen)}
      >
        <EllipsisVertical size={20} color={color}/>
      </TouchableOpacity>

      {
        isOpen && (
        <View 
          className=" right-5 top-16 z-50 dark:bg-zinc-800 flex flex-col  bg-zinc-100 rounded-2xl border border-zinc-200 dark:border-zinc-800 absolute"
        >
          {dropdown}
          <DropdownButton  icon={SunMoon} onPress={toggleColorScheme} title="Theme"/>
          <DropdownButton  icon={User} onPress={toggleColorScheme} title="Account"/>
          <View className="w-full h-[1px] bg-zinc-300 mt-5 dark:bg-zinc-700"></View>
          <DropdownButton  icon={ArrowRight} onPress={toggleColorScheme} title="Logout"/>
        </View>
        )
      }
    </View>
  );
}
interface DropdownButtonProps {
  title : string;
  onPress : (e : GestureResponderEvent) => void;
  icon : LucideIcon;
} 
export function DropdownButton ({ onPress, title, icon : Icon } : DropdownButtonProps) {
  const { colorScheme } = useColorScheme();

  return (
    <TouchableOpacity 
      className="flex flex-row gap-4 my-2 mx-4 items-center justify-between"
      onPress={onPress}
    >
      <Text className="text-lg text-zinc-900 dark:text-zinc-100">
        {title}
      </Text>
      <Icon size={20} color={colorScheme === "dark" ? "#fff" : "#000"}/>
    </TouchableOpacity>
  )
}