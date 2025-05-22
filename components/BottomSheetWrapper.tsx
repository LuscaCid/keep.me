import BottomSheet, { BottomSheetScrollView, SNAP_POINT_TYPE } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useColorScheme } from "nativewind";
import { PropsWithChildren, RefObject } from "react";
import { StyleSheet } from "react-native";

export type BottomSheetWrapperProps = PropsWithChildren<{
  onChange? : (index: number, position: number, type: SNAP_POINT_TYPE) => void;
  ref : RefObject<BottomSheetMethods | null>;
  snapPoints? : string[];
  index? : number
}>;

export function BottomSheetWrapper({ 
  onChange, 
  ref, 
  children ,
  snapPoints,
  index = 0
} : BottomSheetWrapperProps) {
  const { colorScheme } = useColorScheme()

  return (
    <BottomSheet
      index={index}
      backgroundStyle={{ backgroundColor: colorScheme === "dark" ? "#27272a" : "#f4f4f5" }}
      snapPoints={snapPoints ? snapPoints :  [ '10%', '40%', '70%' ]}
      containerStyle={styles.container}
      ref={ref}
      handleStyle={{ 
        backgroundColor : colorScheme === "dark" ? "#3f3f46" : "#e4e4e7", 
        borderTopStartRadius : 10, 
        borderTopEndRadius : 10 
      }}
      onChange={onChange}
      enablePanDownToClose
    >
      <BottomSheetScrollView   className="bg-zinc-100 dark:bg-zinc-800 flex-1 p-4">
        {children}
      </BottomSheetScrollView>
    </BottomSheet>
  )
}
const styles = StyleSheet.create({
  container : { 
    flex : 1
  }
})
