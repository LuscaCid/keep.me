import { DynamicBarData, DynamicProp } from "@/@types/DynamicBarData";
import { AppScrollView } from "@/components/AppScrollView";
import { GenericalHeader } from "@/components/GenericalHeader";
import { useReceiptsBarData } from "@/hooks/useReceiptsData";
import { CustomBottomSheetScrollView, CustomBottomSheetView } from "@/UI/CustomBottomSheets";
import { ScreenWrapper } from "@/UI/ScreenWrapper";
import { formatToBrl } from "@/utils/formatToBrl";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useColorScheme } from "nativewind";
import { useCallback, useMemo, useRef, useState } from "react";
import { Dimensions, RefreshControl, ScrollView, StatusBar, Text, View } from "react-native";
import { BarChart, barDataItem } from "react-native-gifted-charts";
export default function Dashboard() {
  const receiptsBarDataQueryKey = useMemo(() => ['bar-receipts-data'], [])
  const queryClient = useQueryClient();
  const detailBottomSheetRef = useRef<BottomSheetMethods>(null);
  const [selectedStorageData, setSelectedStorageData] = useState<DynamicProp>({} as DynamicProp);
  const { ReceiptsBarData, expensesComparativeBarData } = useReceiptsBarData();
  const { colorScheme } = useColorScheme();

  const frontColor = colorScheme === "dark" ? "#f4f4f4" : "#122212"
  const textColorByColorScheme = colorScheme === "dark" ? "#fff" : "#000";

  const { data, isLoading, isError, isPending } = useQuery({
    queryFn: async () => {
      const response = await fetch("https://transparencia.w5i.com.br/api/charts/despesasBarCharts?DataInicial=2024&DataFinal=2025&banco=w5i_tecnologia");
      const data = await response.json();

      console.log(data);
      return data;

    },
    queryKey: receiptsBarDataQueryKey
  });

  const handleSelectItem = useCallback((item: DynamicProp) => {
    setSelectedStorageData(item);
    detailBottomSheetRef.current?.expand();

  }, [detailBottomSheetRef])

  const barWidth = 14;
  const spacing = 20; // espaçamento entre as barras (padrão)
  const dataLength = selectedStorageData.dynamicProperty?.length ?? 0;
  const chartWidth = dataLength * (barWidth + spacing);

  return (
    <ScreenWrapper
      bottomSheets={[
        {
          snapPoints: ["20%", "40%"],
          index: -1,
          ref: detailBottomSheetRef,
          children: (
            <CustomBottomSheetScrollView className={"flex flex-col gap-14"}>
              <Text className="dark:text-zinc-200 text-2xl pb-2 border-b mb-20 border-zinc-300 dark:border-zinc-700 font-medium">
                Dias do mês
              </Text>
              <View className="flex items-center my-10 p-10">
                <BarChart
                  focusBarOnPress
                  adjustToWidth
                  renderTooltip={(item: any) => (
                    <View
                      style={{
                        backgroundColor: colorScheme === "dark" ? "#15803d" : "#22c55e",
                        paddingHorizontal: 6,
                        paddingVertical: 3,
                        borderRadius: 999,
                      }}
                    >
                      <Text className="dark:text-zinc-200 px-2 py-1 bg-green-500 dark:bg-green-600">
                        {formatToBrl(item.value)}
                      </Text>
                    </View>
                  )}
                  data={(selectedStorageData.dynamicProperty ?? []) as barDataItem[]}
                  isAnimated
                  barWidth={barWidth}
                  disableScroll={false}
                  noOfSections={5}
                  barBorderRadius={6}
                  frontColor={frontColor}
                  xAxisLabelTextStyle={{ color: textColorByColorScheme }}
                  yAxisTextStyle={{ color: textColorByColorScheme }}
                  yAxisThickness={0}
                  xAxisThickness={0}
                />
              </View>
            </CustomBottomSheetScrollView>
          )
        }
      ]}
    >
      <GenericalHeader
        title="Dashboard"
      />
      <AppScrollView
        className="flex flex-col gap-10"
        refreshControl={
          <RefreshControl
            onRefresh={() => queryClient.refetchQueries({ queryKey: receiptsBarDataQueryKey })}
            refreshing={isLoading}
          />
        }
      >
        <View className="flex w-full flex-col gap-4 items-start justify-start">
          <Text className="dark:text-zinc-200 text-2xl font-medium">
            Receita arrecadada em 2025
          </Text>
          <BarChart
            showGradient
            adjustToWidth
            onPress={(item: any) => handleSelectItem(item)}
            isAnimated
            yAxisTextStyle={{ color: textColorByColorScheme }}
            barWidth={barWidth}
            noOfSections={5}
            barBorderRadius={4}
            frontColor={frontColor}
            data={ReceiptsBarData}
            yAxisThickness={0}
            xAxisThickness={0}
          />
        </View>
        <View className="flex flex-col gap-4">
          <Text className="dark:text-zinc-200 text-2xl font-medium">
            Comparativo de despesas
          </Text>
          <View className="flex flex-row gap-4">
            <View className="flex flex-row items-center gap-2">
              <View style={{ backgroundColor: "#a855f7", height: 10, width: 10, borderRadius: 10 }}>
              </View>
              <Text className="dark:text-zinc-200">
                Empenhado
              </Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <View style={{ backgroundColor: "#3b82f6", borderRadius: 10, height: 10, width: 10 }}>
              </View>
              <Text className="dark:text-zinc-200">
                Liquidado
              </Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <View style={{ backgroundColor: "#ec4899", borderRadius: 10, height: 10, width: 10 }} className="h-10 w-10 p-5 rounded-full bg-pink-500 ">
              </View>
              <Text className="dark:text-zinc-200">
                Pago
              </Text>
            </View>
          </View>
          <BarChart
            showGradient
            adjustToWidth
            labelWidth={50}
            onPress={(item: any) => handleSelectItem(item)}
            isAnimated
            yAxisTextStyle={{ color: textColorByColorScheme }}
            barWidth={barWidth}
            noOfSections={5}
            barBorderRadius={4}
            frontColor={frontColor}
            data={expensesComparativeBarData}
            yAxisThickness={0}
            xAxisThickness={0}
          />
        </View>
      </AppScrollView>
    </ScreenWrapper>
  )
}