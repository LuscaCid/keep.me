import { CreditCard, Download, Laptop, LucideIcon, ReceiptText, ShoppingBag } from "lucide-react-native";
import { Dispatch, JSX, SetStateAction, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { formatToBrl } from "@/utils/formatToBrl";
import { Transaction, TransactionCategory } from "@/@types/Transaction";

interface TransactionProps {
  transaction: Transaction;
  setTransactionToEdit: Dispatch<SetStateAction<Transaction | undefined>>;
}
export function TransactionCard({ transaction, setTransactionToEdit }: TransactionProps) {

  const IconWrapper = ({ icon: Icon, color, bgColor }: { icon: LucideIcon, color: string, bgColor: string; }) => (
    <View
      className="rounded-full p-4 flex items-center justify-center"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <Icon size={20} color={color} />
    </View>
  )
  const icons: Record<TransactionCategory, JSX.Element> = useMemo(() => ({
    //green
    salary: <IconWrapper
      icon={CreditCard}
      bgColor="#bbf7d0"
      color="#22c55e"
    />,
    // yellow
    "subscription-fee": <IconWrapper
      bgColor="#fef08a"
      icon={Laptop}
      color="#eab308"
    />,
    //purple
    bill: <IconWrapper
      icon={ReceiptText}
      bgColor="#e9d5ff"
      color="#a855f7"
    />,
    saving: <IconWrapper
      icon={Download}
      bgColor="#bbf7d0"
      color="#22c55e"
    />,
    shopping: <IconWrapper
      icon={ShoppingBag}
      bgColor="#fef08a"
      color="#eab308"
    />,

  }), []);

  return (
    <TouchableOpacity
      onPress={() => setTransactionToEdit(transaction)}
      className="dark:border dark:border-zinc-800 rounded-2xl w-full bg-white dark:bg-zinc-900  p-4 flex flex-row items-center justify-between ">
      <View className="flex flex-row gap-2 text-green-500">
        {icons[transaction.category]}
        <View className="flex flex-col gap-1">
          <Text className="text-lg font-semibold dark:text-zinc-200">
            {transaction.item}
          </Text>
          <Text className="text-md font-medium dark:text-zinc-400">
            {transaction.category}
          </Text>
        </View>
      </View>
      <Text className={`font-bold text-xl ${transaction.type === "income" ? "text-green-600" : "text-red-400"}`}>
        {formatToBrl(transaction.value)}
      </Text>
    </TouchableOpacity>
  )
}