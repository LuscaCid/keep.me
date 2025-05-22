import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
interface Props <T extends string> {
  placeholder : string;
  name : T;
  numberKeyboard? : boolean;
  required? : boolean;
}
export function FormInput<T extends string>({ name, placeholder, numberKeyboard, required } : Props<T>) {
  const { register, control, formState : { errors } } = useFormContext();

  return (
    <View>
      <Controller
        control={control}
        rules={{ required: required }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            keyboardType={numberKeyboard ? "numeric" : "default"}
            className=" rounded-md bg-white text-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-500 text-lg dark:text-zinc-100 px-4 py-3 w-full "
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        {...register(name)}
        name={name}
      />
      {errors[name] && <Text className="text-red-500 text-lg">{errors[name].message as string}</Text>}

    </View>
  );
}