import BottomSheet, { BottomSheetProps } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useColorScheme } from "nativewind";
import { PropsWithChildren, RefObject } from "react";
import { StyleSheet } from "react-native";

export type BottomSheetWrapperProps = PropsWithChildren<{
  ref : RefObject<BottomSheetMethods|null>
}> & BottomSheetProps;

export function BottomSheetWrapper({
  onChange,
  ref,
  children,
  snapPoints,
  index = 0,
  enableDynamicSizing,
  ...rest
}: BottomSheetWrapperProps) {
  const { colorScheme } = useColorScheme()

  return (
    <BottomSheet
      {...rest}
      index={index}
      backgroundStyle={{ backgroundColor: colorScheme === "dark" ? "#27272a" : "#f4f4f5" }}
      snapPoints={snapPoints ? snapPoints : ['10%', '40%', '70%']}
      containerStyle={styles.container}
      ref={ref}
      handleStyle={{
        backgroundColor: colorScheme === "dark" ? "#3f3f46" : "#e4e4e7",
        borderTopStartRadius: 10,
        borderTopEndRadius: 10
      }}
      onChange={onChange}
      enablePanDownToClose
      enableDynamicSizing={enableDynamicSizing}
    >
      {children}
    </BottomSheet>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
