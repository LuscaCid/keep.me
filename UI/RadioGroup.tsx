import { useColorScheme } from "nativewind";
import { Dispatch, PropsWithChildren, ReactNode, SetStateAction, useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface RadioItem {
  value: string;
  label: string | ReactNode;
  selected?: boolean;
}
type Props = {
  items: RadioItem[];
  onChange: (selected: RadioItem) => void;
}

export function RadioGroup({ items, onChange }: Props) {
  const [radioItems, setRadioItems] = useState<RadioItem[]>([]);
  const handleSelect = useCallback((item: RadioItem) => {
    const updatedItems = radioItems.map(i => ({
      ...i,
      selected: i.value === item.value
    }));
    setRadioItems(updatedItems);
    onChange(item);

  }, [radioItems, setRadioItems, onChange]);

  useEffect(() => {
    setRadioItems(items.map(item => ({
      ...item,
      selected: item.selected ?? false
    })));
  }, [items]);
  return (
    <View className="flex flex-row gap-2 items-center">
      {items.length > 0 && radioItems.map((item, idx) => (
        <RadioGroupItem
          handleSelect={handleSelect}
          item={item}
          key={idx}
        >
          {item.label}
        </RadioGroupItem>
      ))}
    </View>
  )
}

type ItemProps = PropsWithChildren<{
  item: RadioItem;
  handleSelect: (item: RadioItem) => void;
}>;

export function RadioGroupItem({ children, item, handleSelect }: ItemProps) {
  return (
    <TouchableOpacity
      onPress={() => handleSelect(item)}
      className={`rounded-md h-16 p-2 flex flex-1 items-center justify-center `}
    >
      {children}
    </TouchableOpacity>
  );
}