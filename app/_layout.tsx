import {Stack} from "expo-router";
import {Slot} from "expo-router/build/ui/Slot";
import {Header} from "@/Components/Header";

export default function Layout () {

  return (
    <Stack>
      <Stack.Screen name={"index"} options={{title : "Home", headerShown : false}}/>
      <Stack.Screen name={"profile"} options={{title : "Perfil", headerShown : false}}/>
      <Stack.Screen name={"user/[id]"} options={{title : "Usuario", headerShown : false}}/>
    </Stack>
  )
}