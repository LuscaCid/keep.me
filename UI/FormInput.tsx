import { Controller, useFormContext } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

interface Props<T extends string> {
  placeholder: string;
  name: T;
  numberKeyboard?: boolean;
  required?: boolean;
  displayValue?: (value: any) => string;
  parseValue?: (text: string) => any;
}

export function FormInput<T extends string>({
  name,
  placeholder,
  numberKeyboard,
  required,
  displayValue,
  parseValue
}: Props<T>) {
  const { control, formState: { errors } } = useFormContext();

  return (
    <View>
      <Controller
        control={control}
        name={name}
        rules={{ required }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <TextInput
              keyboardType={numberKeyboard ? "numeric" : "default"}
              className="rounded-lg bg-white text-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-500 text-lg dark:text-zinc-100 px-4 py-3 w-full"
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={(text) => {
                if (parseValue) {
                  onChange(parseValue(text));
                  return;
                }
                onChange(text);
              }}
              value={displayValue ? displayValue(value) : value}
            />
          );
        }}
      />
      {errors[name] && (
        <Text className="text-red-500 text-lg">{errors[name]?.message as string}</Text>
      )}
    </View>
  );
}
