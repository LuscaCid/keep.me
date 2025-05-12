import {useLocalSearchParams} from "expo-router";
import {Text} from "react-native";

export default function UserScreen () {
  const { id } = useLocalSearchParams<{id : string}>()
  return (
    <Text>
      {id}
    </Text>
  )
}