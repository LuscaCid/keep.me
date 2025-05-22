import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
interface Props<T extends string> {
  label: string;
  name: T
}
export function FormCheckbox<T extends string>({ label, name }: Props<T>) {
  const { control, register } = useFormContext();
  const [ checked, setChecked ] = useState<boolean>(false);
  return (
    <View>
      <Controller
        {...register(name)}
        name={name}
        control={control}
        render={() => (
          <TouchableOpacity
            onPress={() => setChecked(!checked)} 
            className="flex p-2 flex-row items-center gap-4 border-b border-zinc-200 dark:border-zinc-800">
            <Text className="text-lg dark:text-zinc-200 font-medium">
              {label}
            </Text>
            <Checkbox 
              value={checked}
              onValueChange={setChecked}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}