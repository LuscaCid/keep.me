import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function NotFound() {
  return (
    <View>
      <Text>
        Pagina nao encontrada
      </Text>
      <Link href={"/"} className={"rounded-md px-2 py-1 text-bold bg-zinc-700"}>
        <Text className={"text-zinc-100 "}>
          home
        </Text>
      </Link>
    </View>
  )
}