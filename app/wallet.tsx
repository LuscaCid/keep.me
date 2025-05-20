import { GenericalHeader } from "@/components/GenericalHeader";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { Link, useRouter } from "expo-router";
import { PlusCircle, View } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export default function WalletScreen () {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <GenericalHeader title="Wallet" dropdown={<></>}/>
      <Link 
        className="h-[150px] border border-dashed p-2 max-w-fit w-[40px] flex items-center justify-center "
        href={{ pathname : "/card/[id]", params : { id : "123" } }} 
      >
        <PlusCircle size={25} />
      </Link>
    </ScreenWrapper>
  );
}
