import {Text, View} from "react-native";
export function Header () {
  return (
    <View className={"w-full bg-zinc-200  backdrop-blur-lg flex items-center justify-between"}>
      {/*<Menu*/}
      <Text className={"w-full bg-zinc-900  backdrop-blur-lg flex items-center justify-between"}>
        Header comp
      </Text>
    </View>
  )
}