import { Dispatch, PropsWithChildren, ReactNode, SetStateAction, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface RadioItem {
  value : string;
  label : string|ReactNode;
  selected? : boolean;
}
type Props = {
  items : RadioItem[];
  setItems : Dispatch<SetStateAction<RadioItem[]>>
  onChange : (selected : RadioItem) => void;
}

export function RadioGroup ({ items, setItems, onChange } : Props){
  
  const handleSelect = useCallback((item : RadioItem) => {
    const updatedItems = items
    .map(itemUp => ({ ...itemUp, selected : false }))
    .map((itemUp) => {
      if(itemUp.value === item.value) {
        return { ...itemUp, selected : true }
      }
      return itemUp;
    })
    setItems(updatedItems);  
    onChange(item);
  }, [ items, setItems ]);


  return (
    <View className="flex flex-row gap-2 items-center">
      {items.length > 0 && items.map((item) => (
        <RadioGroupItem 
          handleSelect={handleSelect} 
          item={item} 
          key={item.value}
        >
          <Text>
            {item.label}
          </Text>
        </RadioGroupItem>
      ))}
    </View>
  )
}

type ItemProps = PropsWithChildren<{
  item : RadioItem;
  handleSelect : (item : RadioItem) => void;
}>;

export function RadioGroupItem ({ children, item, handleSelect } : ItemProps) {
  return (
    <TouchableOpacity 
      onPress={() => handleSelect(item)}
      className={`rounded-md h-16 p-2 flex flex-1 items-center justify-center ${item.selected ? "bg-zinc-400 dark:bg-zinc-900" : "bg-zinc-200 dark:bg-zinc-700"} transition duration-150`}
    >
      { children }
    </TouchableOpacity>
  );
}