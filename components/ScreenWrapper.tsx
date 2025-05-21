import { useDropdow } from "@/store/dropdown";
import { useColorScheme } from "nativewind";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function ScreenWrapper({ children, className }: { children: ReactNode, className?: string }) {
  const { colorScheme } = useColorScheme();
  const { isOpen, setIsOpen } = useDropdow();  
  return (
    <SafeAreaView
      className={"bg-zinc-100 dark:bg-zinc-950 h-full w-full px-4 " + className}
      style={{ backgroundColor: colorScheme === "dark" ? "#09090b" : "#f4f4f5" }}
      edges={["top"]}
    >
      {isOpen && (
        <TouchableOpacity onPress={() => setIsOpen(false)} className="absolute inset-0 z-[10000] bg-zinc-950/80">
        </TouchableOpacity>
      )}
      {children}
    </SafeAreaView>
  );
}