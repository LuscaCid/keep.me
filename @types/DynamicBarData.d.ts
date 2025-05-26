import { barDataItem } from "react-native-gifted-charts";

export interface StorageDynamicProperty extends barDataItem {
  from : string
}

export interface DynamicBarData<T extends object | undefined = undefined> extends barDataItem {
  dynamicProperty?: StorageDynamicProperty[]
}

export interface DynamicProp { dynamicProperty?: barDataItem[] };
