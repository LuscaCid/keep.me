import {StyleSheet, Text} from "react-native";
import {ExternalPathString, Link, RelativePathString} from "expo-router";
import {FontAwesome} from "@expo/vector-icons";

interface Props {
  title: string;
  to : RelativePathString | ExternalPathString;
}
export function NavCard ({ to, title} : Props) {
  return (

    <Link href={{pathname : to }} className={"rounded-lg border border-zinc-700 bg-zinc-900 p-4 flex items-center justify-between"}>
      <Text>
        {title}
      </Text>
      <FontAwesome
        name={"link"}
      />
    </Link>
  )
}
const styles = StyleSheet.create({
  card : {
    backgroundColor :
  }
})