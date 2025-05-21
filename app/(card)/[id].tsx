import { GenericalHeader } from "@/components/GenericalHeader";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CreditCard } from "@/@types/CreditCard";
import { FormInput } from "@/components/FormInput";
import { ArrowRight } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { z } from "zod";
import { FormSchemaFactory } from "@/constants/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { cardBrands } from "@/constants/cardBrands";
import { banks } from "@/constants/banks";
import { Select } from "@/components/Select";
import { FieldSet } from "@/components/FieldSet";

type CreditCardFormType = z.infer<typeof FormSchemaFactory.formCreditCardSchema>;
export default function CreditCardScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const queryClient = useQueryClient();
  const { colorScheme } = useColorScheme();

  const [creditCardToEdit, setCreditCardToEdit] = useState<CreditCard | undefined>(undefined);
  const methods = useForm<CreditCardFormType>({
    resolver: zodResolver(FormSchemaFactory.formCreditCardSchema),
    defaultValues: {
      totalBalance: creditCardToEdit ? creditCardToEdit.totalBalance : 0,
      bank: creditCardToEdit ? creditCardToEdit.bank : "",
      cvv: creditCardToEdit ? creditCardToEdit.cvv : "",
      exp: creditCardToEdit ? creditCardToEdit.exp : "",
      flag: creditCardToEdit ? creditCardToEdit.flag : "",
      name: creditCardToEdit ? creditCardToEdit.name : "",
    }
  });

  useEffect(() => {
    const cachedCreditCards = queryClient.getQueryData(["credit-cards"]) as CreditCard[] ?? [];
    setCreditCardToEdit(cachedCreditCards.find((creditCard) => creditCard.id === id));
  }, [id, queryClient]);

  return (
    <ScreenWrapper className="relative flex flex-col gap-5">
      <GenericalHeader
        backRoute="/wallet"
        title={`${creditCardToEdit ? "Edit" : "New"}`}
        dropdown={<></>}
      />
      <FormProvider {...methods}>
        <View className="flex flex-col gap-2 w-full border-b my-5 py-5 border-zinc-200 dark:border-zinc-800">
          <Text className="text-4xl text-center font-bold dark:text-zinc-200 text-zinc-900">
            {creditCardToEdit ? "All card data" : "Add an new card"}
          </Text>
          <Text className="text-lg text-center font-thin dark:text-zinc-400 text-zinc-600">
            {creditCardToEdit ? "Here you can change all card data" : "Fill form with the secure info"}
          </Text>
        </View>
        <View className="flex flex-col gap-4">
          <FormInput name="name" placeholder="Card name" />
          <FormInput name="number" placeholder="Card number" />
          <FormInput name="cvv" placeholder="Securty code" />
          <FormInput name="totalBalance" placeholder="Card value" />
        </View>
        <View className="flex flex-col gap-3 w-full border-t my-5 py-5 border-zinc-200 dark:border-zinc-800">
          <FieldSet
            label="Select brand"
            input={
              <Select
                onChangeValue={(value: any) => console.log(value)}
                items={cardBrands}
              />
            } />
          <FieldSet
            label="Select bank"
            input={
              <Select
                onChangeValue={(value: any) => console.log(value)}
                items={banks}
              />
            } />
        </View>
      </FormProvider>
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-2xl absolute ml-2  flex flex-row items-center gap-2 justify-center bottom-4 right-4 left-4 "
        onPress={() => console.log()}
      >
        <Text className=" text-lg font-bold  text-zinc-100">
          {creditCardToEdit ? "Edit" : "Add"}
        </Text>
        <ArrowRight size={20} color={"#fff"} />
      </TouchableOpacity>
    </ScreenWrapper>
  );
}

