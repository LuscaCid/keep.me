import { FormTransactionType, KeyofFormTransaction } from "@/app/(tabs)/wallet";
import { ButtonSubmit } from "@/UI/ButtonSubmit";
import { FormCheckbox } from "@/UI/CheckBox";
import { FormInput } from "@/UI/FormInput";
import { Icon } from "@/UI/Icon";
import { InputButton } from "@/UI/InputButton";
import { RadioGroup, RadioItem } from "@/UI/RadioGroup";
import { formatToBrl } from "@/utils/formatToBrl";
import { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import { ChevronUp } from "lucide-react-native";
import { Dispatch } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";

interface Props {
  methods: UseFormReturn<FormTransactionType>;
  handleOpenCreditCardsBottomSheet: () => void;
  items: RadioItem[];
  setItems: Dispatch<React.SetStateAction<RadioItem[]>>;
  handleSubmitTransactionForm: (data: FormTransactionType) => Promise<void>
  isPending: boolean;
}
export function TransactionFormBottomSheet({
  methods,
  handleOpenCreditCardsBottomSheet,
  handleSubmitTransactionForm,
  items,
  setItems,
  isPending
}: Props) {
  const valueWatched = methods.watch("value");
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <FormProvider {...methods}>
        <View className="flex flex-col gap-4 ">
          <Text className="text-3xl border-b border-zinc-200 dark:border-zinc-700 pb-2 font-medium dark:text-zinc-200">
            Add transaction
          </Text>
          <View className="flex flex-row justify-between">
            <Text className="text-3xl font-semibold dark:text-zinc-200">
              {formatToBrl(valueWatched.replace(",", "."))}
            </Text>
            <TouchableOpacity className="flex flex-row gap-2">
              <Text className="text-2xl dark:text-zinc-200">
                Brl
              </Text>
              <Icon icon={ChevronUp} size={35}/>
            </TouchableOpacity>
          </View>
          <FormInput<KeyofFormTransaction>
            name="value"
            placeholder="Transaction value"
            numberKeyboard
          />
          <InputButton
            onPress={handleOpenCreditCardsBottomSheet}
            placeholder="Select credit card"
          />
          <RadioGroup onChange={(selected) => methods.setValue("type", selected.value)} setItems={setItems} items={items} />
          <FormCheckbox<KeyofFormTransaction>
            label="Fixed transaction"
            name="fixed"
          />
          <FormCheckbox<KeyofFormTransaction>
            label="Already paid"
            name="paid"
          />

          <ButtonSubmit
            isPending={isPending}
            titleWhenIsPending="Saving"
            onPress={methods.handleSubmit(handleSubmitTransactionForm)}
            title="Add"
          />
        </View>
      </FormProvider>
    </TouchableWithoutFeedback>
  )
}