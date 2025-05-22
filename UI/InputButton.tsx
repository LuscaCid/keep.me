import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

interface Props {
  placeholder : string;
  onPress: (e : GestureResponderEvent) => void;
}
export function InputButton ({ onPress, placeholder } : Props){
  return (
    <TouchableOpacity 
      className=" rounded-md bg-white dark:bg-zinc-900 px-4 py-3 w-full "
      onPress={onPress}    
    >
      <Text className="text-zinc-700 dark:text-zinc-500 text-lg ">
        {placeholder}
      </Text>
    </TouchableOpacity>
  )
}