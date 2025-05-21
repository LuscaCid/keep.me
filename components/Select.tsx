import { useColorScheme } from 'nativewind';
import SelectNative, { Item } from 'react-native-picker-select';
interface Props {
  items : Item[];
  placeholder? : string;
  onChangeValue : (value: any, index: number) => void;
}
export function Select({ onChangeValue, items, placeholder } : Props) {
  const { colorScheme } = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#18181b" : "#fff";
  const textColor = colorScheme === "dark" ? "#f4f4f5" : "#3f3f46";
  return (
    <SelectNative
      useNativeAndroidPickerStyle={false}
      pickerProps={{ className: "bg-zinc-200" }}
      style={{
        inputAndroid: {
          backgroundColor: backgroundColor,
          color: textColor,
          paddingVertical: 10,
          fontSize: 16,
          paddingHorizontal: 10,
          borderRadius: 8,
        },
        inputIOS: {
          backgroundColor: backgroundColor,
          color: textColor,
          paddingVertical: 10,
          fontSize: 16,
          paddingHorizontal: 10,
          borderRadius: 8,
        },
        placeholder: {
          color: '#9CA3AF',
        }
      }}
      onValueChange={onChangeValue}
      items={items}
      placeholder={placeholder}
      
    />

  );
}