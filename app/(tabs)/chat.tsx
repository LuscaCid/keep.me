import { GenericalHeader } from "@/components/GenericalHeader";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { Text, View } from "react-native";

export default function ChatScreen () {
  return (
    <ScreenWrapper>
      <GenericalHeader title="Chat" dropdown={<></>}/>
      <View>
        <Text>
          Chat area
        </Text>
      </View>
    </ScreenWrapper>
  );
}