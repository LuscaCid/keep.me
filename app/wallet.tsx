import { CreditCardComponent } from "@/components/CreditCard";
import { GenericalHeader } from "@/components/GenericalHeader";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { Link, useRouter } from "expo-router";
import { PlusCircle } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function WalletScreen () {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <GenericalHeader title="Wallet" dropdown={<></>}/>
      <ScrollView 
        horizontal
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex flex-row gap-2 w-full max-h-[150px]"
      >
        <Link 
          className="h-[150px] border rounded-2xl border-dashed p-2 max-w-fit w-[40px] flex items-center justify-center "
          href={{ pathname : "/(card)/[id]", params : { id : "123" } }} 
        >
          <PlusCircle className="m-auto" size={25} />
        </Link>
        <CreditCardComponent creditCard={{ bank : "Nu", cvv : "122", exp: "09/32", flag : "Visa", name : "Salcard", number : "1234432112344321", totalBalance : 25000}}/>
      </ScrollView>

    </ScreenWrapper>
  );
}
