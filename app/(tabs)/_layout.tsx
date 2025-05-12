import {Tabs} from "expo-router";
import {FontAwesome} from "@expo/vector-icons";

export default function Layout( ) {
  return (
    <Tabs>
      <Tabs.Screen
        name={"dashboard"}
        options={{
          title : "Dashboard",
          headerShown : false
        }}
      />
      <Tabs.Screen
        name={"settings"}
        options={{
          title : "settings",
          headerShown : false,
          tabBarIcon : ({ focused, color, size })  => {
            if (focused) {
              return <FontAwesome name={"tags"} color={color} size={size} />
            }
            return <FontAwesome name={"tag"} color={color} size={size} />
          }
      }}
      />
    </Tabs>
  )
}