import { GenericalHeader } from "@/components/GenericalHeader";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { useLocalSearchParams } from "expo-router";

export default function CreditCardScreen () {
  const { id } = useLocalSearchParams<{ id? : string }>();

  return (
    <ScreenWrapper>
      <GenericalHeader title="Novo"  dropdown={<></>} />
      {/* <View>
        { id !== undefined ? (
          <Text>Edicao do cartao de id {id}</Text>
        ) : (
          <Text>Cadastro de um novo cartao</Text>
        )}
      </View> */}
    </ScreenWrapper>
  );
}