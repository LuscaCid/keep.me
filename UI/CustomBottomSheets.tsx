import { BottomSheetFlatList, BottomSheetScrollView, BottomSheetSectionList, BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetFlatListProps, BottomSheetScrollViewProps, BottomSheetSectionListProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types";
import { BottomSheetViewProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types";
import { PropsWithChildren } from "react";

export function CustomBottomSheetView({ children, className, ...rest }: PropsWithChildren<BottomSheetViewProps>) {
  return (
    <BottomSheetView
      className={`bg-zinc-100 dark:bg-zinc-800 flex-1 p-4 ${className}`}
      {...rest}
    >
      {children}
    </BottomSheetView>
  );
}
export function CustomBottomSheetScrollView({
  children,
  snapToEnd,
  horizontal,
  showsVerticalScrollIndicator,
  showsHorizontalScrollIndicator,
  ...rest
}: PropsWithChildren<BottomSheetScrollViewProps>) {
  return (
    <BottomSheetScrollView
      {...rest}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      snapToEnd={snapToEnd}
      className="bg-zinc-100 dark:bg-zinc-800 flex-1 p-4"
    >
      {children}
    </BottomSheetScrollView>
  );
}
interface BottomSheetFlatListProperties<T> extends PropsWithChildren<BottomSheetFlatListProps<T>> { };

export function CustomBottomSheetFlatList<T>({
  children,
  data,
  renderItem,
  keyExtractor,
  ListHeaderComponent,
  className,
  ...rest
}: BottomSheetFlatListProperties<T>) {
  return (
    <BottomSheetFlatList
      {...rest}
      data={data}
      alwaysBounceVertical 
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      className={`bg-zinc-100 dark:bg-zinc-800 flex-1 p-4 `}
    >
      {children}
    </BottomSheetFlatList>
  );
}
interface BottomSheetSectionListProperties<T, U> extends PropsWithChildren<BottomSheetSectionListProps<T, U>> { }

export function CustomBottomSheetSectionList<T, U>({
  children,
  data,
  renderItem,
  sections,
  keyExtractor,
  ListHeaderComponent,
  ...rest
}: BottomSheetSectionListProperties<T, U>) {
  return (
    <BottomSheetSectionList
      {...rest}
      sections={sections}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      className="bg-zinc-100 dark:bg-zinc-800 flex-1 p-4"
    >
      {children}
    </BottomSheetSectionList>
  );
}