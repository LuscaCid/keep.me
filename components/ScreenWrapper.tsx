import { useDropdow } from "@/store/dropdown";
import { useColorScheme } from "nativewind";
import { ReactNode } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function ScreenWrapper({ children, className }: { children: ReactNode, className?: string }) {
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView
      className={"bg-zinc-100 dark:bg-zinc-950 h-full w-full px-5 m-0 " + className}
      style={{ backgroundColor: colorScheme === "dark" ? "#09090b" : "#f4f4f5" }}
      edges={["top"]}
    >
      {children}
    </SafeAreaView>
  );
}