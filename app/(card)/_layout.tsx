import { Stack } from "expo-router";
import "../../global.css"
export default function HiddenLayout () {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{headerShown : false}}/>
    </Stack>
  );
}