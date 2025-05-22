import { ArrowRight } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import WalletDetail from "../assets/images/wallet.png";
import Ellipse from "../assets/images/Ellipse.png";
import "../global.css"
import { formatToBrl } from "@/utils/formatToBrl";
import { useRouter } from "expo-router";

export function WalletInfo() {
  const router = useRouter();
  const handleNavigateToWallet = () => {
    router.navigate("/wallet");
  }
  return (
    <View className="dark:border dark:border-zinc-800 bg-zinc-900 w-full h-[140px] rounded-2xl py-4 px-6 overflow-hidden  ">
      <Image className="absolute top-0 right-0" source={WalletDetail} />
      <Image className="absolute bottom-0 left-0" source={Ellipse} />
      <View className="flex flex-col gap-2 ">
        <Text className="text-lg text-zinc-200">
          Total balance
        </Text>
        <Text className="text-3xl font-semibold text-zinc-200">
          {formatToBrl(25000)}
        </Text>
      </View>
      <TouchableOpacity onPress={handleNavigateToWallet} className="absolute bottom-3 right-3 flex-row flex items-center ">
        <View className="flex flex-row items-center gap-2 self-end">
          <Text className="text-zinc-200 text-lg">
            My Wallet
          </Text>
          <View className="p-3 rounded-full bg-zinc-200">
            <ArrowRight strokeWidth={3} size={20} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
