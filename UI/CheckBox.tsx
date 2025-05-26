import Checkbox from "expo-checkbox";
import { LucideIcon } from "lucide-react-native";
import { Controller, useFormContext } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "./Icon";

interface Props<T extends string> {
  label: string;
  name: T;
  icon?: LucideIcon;
}

export function FormCheckbox<T extends string>({ label, name, icon }: Props<T>) {
  const { control } = useFormContext();

  return (
    <View>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <TouchableOpacity
            onPress={() => onChange(!value)}
            className="flex p-2 flex-row items-center gap-4 border-b justify-between border-zinc-200 dark:border-zinc-800"
          >
            <View className="flex flex-row items-center gap-2">
              {icon && <Icon icon={icon} />}
              <Text className="text-lg dark:text-zinc-200 font-medium">
                {label}
              </Text>
            </View>
            <Checkbox
              value={value ?? false}
              onValueChange={onChange}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
