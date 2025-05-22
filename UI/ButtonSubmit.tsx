import { ActivityIndicator, GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "./Icon";
import { ArrowRight, Loader } from "lucide-react-native";

interface Props {
  title: "Add" | "Save" | string;
  onPress: (event: GestureResponderEvent) => void;
  className?: string;
  textClassName?: string;
  isPending?: boolean;
  titleWhenIsPending?: string;
}
export function ButtonSubmit({ onPress, title, className, textClassName, isPending, titleWhenIsPending }: Props) {
  return (
    <TouchableOpacity
      disabled={isPending}
      onPress={onPress}
      className={`disabled:bg-blue-400 fixed left-0 right-0 bottom-0 bg-blue-500 flex flex-row w-full p-4 rounded-lg items-center justify-center `}
    >
      <View className="m-auto flex flex-row items-center gap-2">
        <Text className={`text-lg text-zinc-100 font-medium ${textClassName}`} >
          {titleWhenIsPending && isPending ? titleWhenIsPending : title}
        </Text>
        {isPending ? <ActivityIndicator size={"small"} /> : <Icon color="#fff" icon={ArrowRight} />}
      </View>
    </TouchableOpacity>
  );
}