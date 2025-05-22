import BottomSheet, { BottomSheetView, SNAP_POINT_TYPE } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useColorScheme } from "nativewind";
import { PropsWithChildren, RefObject, useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";

export type BottomSheetWrapperProps = PropsWithChildren<{
  onChange? : (index: number, position: number, type: SNAP_POINT_TYPE) => void;
  ref : RefObject<BottomSheetMethods | null>;
  snapPoints? : string[]
}>;

export function BottomSheetWrapper({ 
  onChange, 
  ref, 
  children ,
  snapPoints = [ '10%', '40%', '70%' ]
} : BottomSheetWrapperProps) {
  const sheetSnapPoints = useMemo(() => snapPoints, [snapPoints]);
  const { colorScheme } = useColorScheme()

  return (
    <BottomSheet
      index={0}
      snapPoints={sheetSnapPoints}
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
      <BottomSheetView className="bg-zinc-100 dark:bg-zinc-800 flex-1 p-4">
        {children}
      </BottomSheetView>
    </BottomSheet>
  )
}
const styles = StyleSheet.create({
  container : { 
    flex : 1
  }
})
