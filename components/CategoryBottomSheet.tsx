import { Category } from "@/@types/Category";
import { FormTransactionType } from "@/@types/WalletTypes";
import { useCategories } from "@/hooks/useCategories";
import { CustomBottomSheetFlatList, CustomBottomSheetView } from "@/UI/CustomBottomSheets"
import { SelectBottomSheetWrapper } from "@/UI/SelectBottomSheetWrapper";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, RefObject, SetStateAction, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { Text, View } from "react-native";

interface Props {
  methods: UseFormReturn<FormTransactionType>;
  setCategorySelected: Dispatch<SetStateAction<string>>;
  categoryBottomSheetRef: RefObject<BottomSheetMethods | null>;
}
export function CategoryBottomSheet({ methods, setCategorySelected, categoryBottomSheetRef }: Props) {
  const { getUserCategories } = useCategories();

  const { data, isLoading } = useQuery({
    queryFn: async () => getUserCategories(),
    queryKey: ["user-categories"],
  })
  const handleClose = useCallback((item: Category) => {

    methods.setValue("category", item.id.toString());
    setCategorySelected(item.name)

    categoryBottomSheetRef.current!.close();
  }, [categoryBottomSheetRef, methods, setCategorySelected])
  return (
    <CustomBottomSheetFlatList
      ListHeaderComponent={
        <View className="pb-2 border-b border-zinc-300 dark:border-zinc-700">
          <Text className="text-lg dark:text-zinc-200">
            Select destiny account:
          </Text>
        </View>
      }
      contentContainerClassName={"flex flex-col gap-2"}
      data={data ?? []}
      renderItem={({ item }) => (
        <SelectBottomSheetWrapper onPress={() => handleClose(item)}
          key={item.id}>
          <Text className="dark:text-zinc-200 font-medium text-lg">
            {item.name}
          </Text>
        </SelectBottomSheetWrapper>
      )}
    />
  )

}
