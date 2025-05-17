import { ArrowRight } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import WalletDetail from "../assets/images/wallet.png";
import Ellipse from "../assets/images/Ellipse.png";
import "../global.css"
import { formatToBrl } from "@/utils/formatToBrl";

export function WalletInfo() {
  return (
    <View className="bg-zinc-900 w-full h-[140px] rounded-2xl py-4 px-6 overflow-hidden  ">
      <Image className="absolute top-0 right-0 opacity-80" source={WalletDetail} />
      <Image className="absolute bottom-0 left-0 opacity-80" source={Ellipse} />
      <View className="flex flex-col gap-2 ">
        <Text className="text-lg text-zinc-200">
          Total balance
        </Text>
        <Text className="text-3xl font-semibold text-zinc-200">
          {formatToBrl(25000)}
        </Text>
      </View>
      <View className="absolute bottom-3 right-3 flex flex-row items-center gap-2 self-end">
        <Text className="text-zinc-200 text-lg">
          My Wallet
        </Text>
        <TouchableOpacity className="flex items-center p-3 rounded-full bg-zinc-200">
          <ArrowRight strokeWidth={3} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
