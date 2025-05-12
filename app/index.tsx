import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import "../global.css"
import {Link, router} from "expo-router";
import {useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {Header} from "@/Components/Header";

export default function HomeScreen () {
  const [ username, setUsername ] = useState("a");
  return (
    <SafeAreaView className={"h-full w-full p-4 bg-zinc-900"}>
      <Header />

      {/*<Text style={styles.text}>*/}
      {/*  Ola worlds Home*/}
      {/*</Text>*/}
      {/*<Link href={"/profile"} className={"rounded-md px-2 py-1 text-bold bg-zinc-700"}>*/}
      {/*  <Text className={"text-zinc-100 "}>*/}
      {/*    profile*/}
      {/*  </Text>*/}
      {/*</Link>*/}
      {/*<Button title={"go to dashboard"} onPress={() => router.replace("/dashboard")}/>*/}

      {/*<View className={"flex items-center flex-row gap-2 w-full"}>*/}
      {/*  <TextInput*/}
      {/*    value={username}*/}
      {/*    onChangeText={(value) =>setUsername(value)}*/}
      {/*    placeholder={"Search for user"}*/}
      {/*    className={" px-4 text-zinc-200 bg-zinc-800 rounded-lg w-[90%] outline-2 outline-lime-400"}*/}
      {/*  />*/}

      {/*  <Link*/}
      {/*    href={{ pathname : "/user/[id]", params : { id : username }}}*/}
      {/*    className={"rounded-md px-2 py-1 text-bold bg-zinc-700"}*/}
      {/*  >*/}
      {/*    <Text className={"text-zinc-100 "}>*/}
      {/*      user*/}
      {/*    </Text>*/}
      {/*  </Link>*/}

      {/*</View>*/}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor: "#333",
    color: "#fff"
  },
  text : {
    padding : 20,
    backgroundColor : "#303030",
    color: "#fff",
    borderRadius : 10,

  },
  button : {
    position : "absolute",
    bottom : 10,
    right : 10
  }
})