import { ReactNode } from "react";
import { ScrollView } from "react-native";
interface Props {
  children : ReactNode;
  contentContainerClassName? : string;
  horizontal? : boolean;
}
export function AppScrollView({ 
  children, 
  horizontal,
  contentContainerClassName = "flex flex-col gap-6 bg-zinc-100 dark:bg-zinc-950" 
} : Props) 
{
  return (
    <ScrollView
      horizontal={horizontal}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerClassName={contentContainerClassName}
    >
      {children}
    </ScrollView>
  )
}
