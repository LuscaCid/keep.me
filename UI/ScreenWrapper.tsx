import { BottomSheetWrapper, BottomSheetWrapperProps } from "@/components/BottomSheetWrapper";
import { DropdownButton } from "@/components/GenericalHeader";
import { useDropdow } from "@/store/dropdown";
import { ArrowRight, Settings, SunMoon, User } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
interface Props {
  children: ReactNode;
  className?: string;
  dropdown?: ReactNode;
  bottomSheets?: BottomSheetWrapperProps[]
}
export function ScreenWrapper({ children, className, dropdown, bottomSheets }: Props) {
  const { toggleColorScheme } = useColorScheme();
  const { isOpen, setIsOpen } = useDropdow();

  const onPress = () => {
    toggleColorScheme();
    setIsOpen(false);
  }
  return (
    <SafeAreaView
      className={"bg-zinc-100 dark:bg-zinc-950 h-full w-full px-4 " + className}
      edges={["top"]}
    >
      {isOpen && (
        <TouchableOpacity onPress={() => setIsOpen(false)} className="absolute inset-0 z-[1000] bg-transparent">
          <View
            className=" right-5 top-16 mt-20 z-[10000] dark:bg-zinc-800 flex flex-col  bg-zinc-100 rounded-2xl border border-zinc-200 dark:border-zinc-800 absolute"
          >
            {dropdown}
            <DropdownButton icon={SunMoon} onPress={onPress} title="Theme" />
            <DropdownButton icon={User} onPress={onPress} title="Account" />
            <DropdownButton icon={Settings} onPress={onPress} title="Settings" />
            <View className="w-full h-[1px] my-1 bg-zinc-300 dark:bg-zinc-700"></View>
            <DropdownButton icon={ArrowRight} onPress={onPress} title="Logout" />
          </View>
        </TouchableOpacity>
      )}
      {children}
      {
        bottomSheets && bottomSheets.length > 0 && (
          bottomSheets.map((bottomSheet, idx) => (
            <BottomSheetWrapper
              key={idx}
              index={bottomSheet.index}
              snapPoints={bottomSheet.snapPoints}
              onChange={bottomSheet.onChange}
              {...bottomSheet}
            >
              {bottomSheet.children}
            </BottomSheetWrapper>
          ))
        )
      }
    </SafeAreaView>
  );
}