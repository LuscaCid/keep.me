import { StyleSheet, Text, View } from "react-native";
import { FontAwesome, } from "@expo/vector-icons";
import "../global.css"

export function Header() {
  return (
    <View style={styles.header} >
      <Text style={styles.headerText}>
        Keep.me
      </Text>
      <View>
        <FontAwesome name={"sun-o"} size={20} color={"#f4f4f5"} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "#27272a",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#f4f4f5"
  }
})
// #27272a
//#18181b