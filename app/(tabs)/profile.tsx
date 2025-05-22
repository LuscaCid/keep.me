import { GenericalHeader } from "@/components/GenericalHeader";
import { ScreenWrapper } from "@/UI/ScreenWrapper";
import { Text } from "react-native";

export default function ProfileScreen() {
  return (
    <ScreenWrapper>
      <GenericalHeader title="Profile"  dropdown={<></>}/>
      <Text>
        Tela de perfil
      </Text>
    </ScreenWrapper>
  )
}