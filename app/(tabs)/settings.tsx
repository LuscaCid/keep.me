import {Text, View} from "react-native";
import {Link} from "expo-router";

export default function Dashboard() {
  return (
    <View>
      <Text>
        Pagina de settings
      </Text>
      <Link href={"/"}>
        Voltar para home
      </Link>
    </View>
  )
}