import { Controller, useFormContext } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
interface Props  {
  placeholder : string;
  name : string;
}
export function FormInput({ name, placeholder } : Props) {
  const { control,  formState : { errors } } = useFormContext();
  return (
    <View>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className=" rounded-lg bg-white text-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-500 text-lg dark:text-zinc-100 px-3 py-2 w-full "
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={name}
        defaultValue=""
      />
      {errors.name && <Text>This is required.</Text>}

    </View>
  );
}