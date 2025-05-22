import { GenericalHeader } from "@/components/GenericalHeader";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
// import { useQueryClient } from "@tanstack/react-query";
import { CreditCard } from "@/@types/CreditCard";
import { FieldSet } from "@/UI/FieldSet";
import { banks } from "@/constants/banks";
import { cardBrands } from "@/constants/cardBrands";
import { FormSchemaFactory } from "@/constants/formSchemas";
import { FormInput } from "@/UI/FormInput";
import { Select } from "@/UI/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { z } from "zod";
import { ScreenWrapper } from "@/UI/ScreenWrapper";
import { ButtonSubmit } from "@/UI/ButtonSubmit";

type CreditCardFormType = z.infer<typeof FormSchemaFactory.formCreditCardSchema>;
export default function CreditCardScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const queryClient = useQueryClient();
  const { colorScheme } = useColorScheme();
  const { mutateAsync: createCardAsync, isPending, isError } = useMutation({
    mutationFn: async (data: CreditCardFormType) => {
      // const response = await api.post("credit-card/add-one", { data })
      // return response.data;
      console.log(data);
    },
    onSuccess: () => {
      // openToast();
    }
  });
  const [creditCardToEdit, setCreditCardToEdit] = useState<CreditCard | undefined>(undefined);
  const methods = useForm<CreditCardFormType>({
    resolver: zodResolver(FormSchemaFactory.formCreditCardSchema),
    defaultValues: {
      totalBalance: creditCardToEdit ? creditCardToEdit.totalBalance : "",
      bank: creditCardToEdit ? creditCardToEdit.bank : "",
      cvv: creditCardToEdit ? creditCardToEdit.cvv : "",
      exp: creditCardToEdit ? creditCardToEdit.exp : "",
      brand: creditCardToEdit ? creditCardToEdit.brand : "",
      name: creditCardToEdit ? creditCardToEdit.name : "",
    }
  });
  const handleSubmitForm = useCallback(async (data: CreditCardFormType) => {
    const dataResponse = await createCardAsync(data);
    queryClient.setQueryData(
      ["credit-cards"],
      (prev: CreditCard[]) => [...prev, dataResponse]);
  }, [queryClient, createCardAsync]);

  useEffect(() => {
    const cachedCreditCards = queryClient.getQueryData(["credit-cards"]) as CreditCard[] ?? [];
    setCreditCardToEdit(cachedCreditCards.find((creditCard) => creditCard.id === id));
  }, [id, queryClient]);

  return (
    <ScreenWrapper className=" flex flex-col gap-5">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="h-full relative">
          <GenericalHeader
            title={`${creditCardToEdit ? "Edit" : "New"}`}
            dropdown={<></>}
          />
          <FormProvider {...methods}>
            <View className="flex flex-col gap-2 w-full border-b my-5 py-5 border-zinc-200 dark:border-zinc-800">
              <Text className="text-4xl text-center font-bold dark:text-zinc-200 text-zinc-900">
                {creditCardToEdit ? "All card data" : "Add a new card"}
              </Text>
              <Text className="text-lg text-center font-thin dark:text-zinc-400 text-zinc-600">
                {creditCardToEdit ? "Here you can change all card data" : "Fill form with the secure info"}
              </Text>
            </View>
            <View className="flex flex-col gap-4">
              <FormInput name="name" placeholder="Card name" />
              <FormInput numberKeyboard name="number" placeholder="Card number" />
              <FormInput numberKeyboard name="cvv" placeholder="Securty code" />
              <FormInput numberKeyboard name="totalBalance" placeholder="Card value" />
              <FormInput numberKeyboard name="exp" placeholder="Exp date" />
            </View>
            <View className="flex flex-col gap-3 w-full border-t my-5 py-5 border-zinc-200 dark:border-zinc-800">
              <FieldSet
                label="Select brand"
                input={
                  <Select
                    onChangeValue={(value: any) => methods.setValue("brand", value)}
                    items={cardBrands}
                  />
                } />
              <FieldSet
                label="Select bank"
                input={
                  <Select
                    onChangeValue={(value: any) => methods.setValue("bank", value)}
                    items={banks}
                  />
                } />
            </View>
          </FormProvider>
          <ButtonSubmit
            onPress={methods.handleSubmit(handleSubmitForm)}
            title={creditCardToEdit ? "Edit" : "Add"}
            isPending={isPending}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScreenWrapper>
  );
}

