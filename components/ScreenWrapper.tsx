import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export function ScreenWrapper ({ children } : { children : ReactNode }) {
  return (
    <SafeAreaView edges={["top"]} className="bg-zinc-100 dark:bg-zinc-950 h-full w-full px-5 m-0 ">
      {children}
    </SafeAreaView>
  );
}