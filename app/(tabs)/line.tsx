import { Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts"
const App = () => {
const customDataPoint = () => {
    return (
        <View
        style={{
            width: 20,
            height: 20,
            backgroundColor: 'white',
            borderWidth: 4,
            borderRadius: 10,
            borderColor: '#07BAD1',
        }}
        />
    );
};
const customLabel = (val : any) => {
    return (
        <View style={{width: 70, marginLeft: 7}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>{val}</Text>
        </View>
    );
};
const data = [
    {
        value: 100,
        labelComponent: () => customLabel('22 Nov'),
        customDataPoint: customDataPoint,
    },
    {
        value: 140,
        hideDataPoint: true,
    },
    {
        value: 250,
        customDataPoint: customDataPoint,
    },
    {
        value: 290,
        hideDataPoint: true,
    },
    {
        value: 410,
        labelComponent: () => customLabel('24 Nov'),
        customDataPoint: customDataPoint,
        showStrip: true,
        stripHeight: 190,
        stripColor: 'black',
        dataPointLabelComponent: () => {
        return (
            <View
            style={{
                backgroundColor: 'black',
                paddingHorizontal: 8,
                paddingVertical: 5,
                borderRadius: 4,
            }}>
            <Text style={{color: 'white'}}>410</Text>
            </View>
        );
        },
        dataPointLabelShiftY: -70,
        dataPointLabelShiftX: -4,
    },
    {
        value: 440,
        hideDataPoint: true,
    },
    {
        value: 300,
        customDataPoint: customDataPoint,
    },
    {
        value: 280,
        hideDataPoint: true,
    },
    {
        value: 180,
        labelComponent: () => customLabel('26 Nov'),
        customDataPoint: customDataPoint,
    },
    {
        value: 150,
        hideDataPoint: true,
    },
    {
        value: 150,
        customDataPoint: customDataPoint,
    },
];
return (
    <View style={{
        marginTop: 100,
        paddingVertical: 50,
        backgroundColor: '#414141',
      }}>
        <LineChart
            thickness={6}
            color="#07BAD1"
            maxValue={600}
            noOfSections={3}
            areaChart
            yAxisTextStyle={{color: 'lightgray'}}
            data={data}
            focusEnabled
            startFillColor={'rgb(84,219,234)'}
            endFillColor={'rgb(84,219,234)'}
            startOpacity={0.4}
            endOpacity={0.4}
            spacing={38}
            backgroundColor="#414141"
            rulesColor="gray"
            rulesType="solid"
            yAxisColor="lightgray"
            xAxisColor="lightgray"
            dataPointsHeight={20}
            dataPointsWidth={20}
        />
    </View>
    );
};

export default App