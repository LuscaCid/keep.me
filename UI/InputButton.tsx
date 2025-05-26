import { Delete } from "lucide-react-native";
import { useFormContext } from "react-hook-form";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";

interface Props<T extends string> {
  placeholder: string;
  onPress: (e: GestureResponderEvent) => void;
  value?: string;
  name: T;
  onClear: () => void;
}
export function InputButton<T extends string>({ onPress, placeholder, name, value, onClear }: Props<T>) {
  const { formState: { errors } } = useFormContext();
  return (
    <View
      className=" rounded-md flex flex-col gap-2 w-full"
    >
      <View className="flex flex-row gap-2 bg-white justify-between rounded-lg items-center dark:bg-zinc-900 ">
        <TouchableOpacity
          className="flex-1"
          onPress={onPress}
        >
          <Text className={`${value ? "dark:text-zinc-200 text-zinc-900" : "text-zinc-600 dark:text-zinc-500"}  text-lg px-4 py-3`}>
            {value ? value : placeholder}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onClear}
          className="rounded- px-4 py-3"
        >
          <Delete size={20} color={"#f87171"} />
        </TouchableOpacity>
      </View>
      {errors[name] && (
        <Text className="text-red-500 text-lg">{errors[name]?.message as string}</Text>
      )}
    </View>
  )
}