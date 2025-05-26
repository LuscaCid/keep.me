import { DynamicBarData } from "@/@types/DynamicBarData";
import { useColorScheme } from "nativewind"

export function useReceiptsBarData() {

  const { colorScheme } = useColorScheme();
  const ReceiptsBarData: DynamicBarData<{ from: string }>[] = [
    {
      label: "Jan",
      value: 1000,
      labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
      dynamicProperty: [
        {
          value: 20,
          labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
          from: "fee",
          label: "1"
        },
        {
          value: 50,
          labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
          from: "subscription",
          label: "10"
        },
        {
          value: 130,
          labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
          from: "sale",
          label: "23"
        },
        {
          value: 130,
          labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
          from: "sale",
          label: "24"
        },
        {
          value: 130,
          labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
          from: "sale",
          label: "25"
        },
        {
          value: 130,
          labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
          from: "sale",
          label: "26"
        }
        ,
        {
          value: 150,
          labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
          from: "sale",
          label: "27"
        }
      ]
    },
    {
      label: "Feb",
      value: 100,
      labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },

      dynamicProperty: [
        {
          value: 40,
          labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
          from: "fee",
          label: "3"
        },
        {
          value: 100,
          labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
          from: "subscription",
          label: "12"
        },
        {
          value: 200,
          labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
          from: "sale",
          label: "25"
        }
      ]
    },
    {
      label: "Mar",
      value: 10,
      labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },

      dynamicProperty: [
        {
          value: 30,
          labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
          from: "fee",
          label: "2"
        },
        {
          value: 80,
          labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
          from: "subscription",
          label: "11"
        },
        {
          value: 170,
          labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
          from: "sale",
          label: "28"
        }
      ]
    },
    {
      label: "Apr",
      value: 1,
      labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },

      dynamicProperty: [
        {
          value: 50,
          labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
          from: "fee",
          label: "1"
        },
        {
          value: 120,
          labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
          from: "subscription",
          label: "15"
        },
        {
          value: 220,
          labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
          from: "sale",
          label: "27"
        }
      ]
    }
  ];
  const expensesComparativeBarData: DynamicBarData[] = [
    {
      label: "Jan",
      value: 1000,
      labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
      spacing: 8
    },
    {
      value: 600,
      frontColor: '#3BE9DE',
      gradientColor: '#93FCF8',
    },
    {
      label: "Feb",
      value: 2000,
      labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
      spacing: 8
    },
    {
      value: 1400,
      frontColor: '#3BE9DE',
      gradientColor: '#93FCF8',
    },
 
    {
      label: "Mar",
      value: 2000,
      labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
      spacing: 8
    },
    {
      value: 1400,
      frontColor: '#3BE9DE',
      gradientColor: '#93FCF8',
    },

    {
      label: "Maio",
      value: 2000,
      labelTextStyle: { color: colorScheme === "dark" ? "#fff" : "#000" },
      spacing: 8
    },
    {
      value: 1400,
      frontColor: '#3BE9DE',
      gradientColor: '#93FCF8',
    },
  ]
  const expensesBarChartData: DynamicBarData<{ from: string, day: string }>[] = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ].map((month, index) => {
    const randomFactor = 0.9 + Math.random() * 0.2; // de 0.9 a 1.1
    const monthFactor = 1 / 12 * randomFactor;

    const empenhado = 261611056.72 * monthFactor;
    const liquidado = 44387236.82 * monthFactor;
    const pago = 33838828.6 * monthFactor;
    const reforco = 4232924.58 * monthFactor;

    return {
      label: month,
      value: empenhado, // valor total usado no gráfico principal
      dynamicProperty: [
        {
          value: Number(pago.toFixed(2)),
          from: "pago",
          day: `${index + 1}`,
        },
        {
          value: Number(liquidado.toFixed(2)),
          from: "liquidado",
          day: `${index + 1}`,
        },
        {
          value: Number(reforco.toFixed(2)),
          from: "reforco",
          day: `${index + 1}`,
        },
      ]
    };
  });
  // basicamente as informacoes acima serão dispostas 
  // entre previsao da receita/dynamicProperty da receita

  const totalEmpenhado = 261611056.72;
  const totalPago = 33838828.6;
  const totalLiquidado = 44387236.82;
  const totalReforco = 4232924.58;

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Distribuição proporcional com leve variação fictícia
  function distribuir(total: number): number[] {
    return months.map(() => {
      const variacao = 0.95 + Math.random() * 0.1; // entre 95% e 105% do valor médio
      const valorMensal = (total / 12) * variacao;
      return Number(valorMensal.toFixed(2));
    });
  }
  const empenhadoPorMes = distribuir(totalEmpenhado);
  const pagoPorMes = distribuir(totalPago);
  const liquidadoPorMes = distribuir(totalLiquidado);
  const reforcoPorMes = distribuir(totalReforco);

  const ReceiptsStackedBarData = months.map((month, index) => ({
    stacks: [
      { value: empenhadoPorMes[index], color: "#4B9CD3" },
      { value: pagoPorMes[index], color: "#4CAF50" },
      { value: liquidadoPorMes[index], color: "#F44336" },
      { value: reforcoPorMes[index], color: "#FFC107" },
    ],
    label: month
  }));

  return {
    ReceiptsBarData,
    expensesBarChartData,
    ReceiptsStackedBarData,
    expensesComparativeBarData
  }
}