import { PropsWithChildren } from "react";
import { ScrollView, ScrollViewProps } from "react-native";

type Props = PropsWithChildren<{
  contentContainerClassName? : string;
  horizontal? : boolean;
}> & ScrollViewProps

export function AppScrollView({ 
  children, 
  horizontal,
  contentContainerClassName = "flex flex-col gap-6 bg-zinc-100 dark:bg-zinc-950",
  ...rest
} : Props) 
{
  return (
    <ScrollView
      {...rest}
      horizontal={horizontal}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerClassName={contentContainerClassName}
    >
      {children}
    </ScrollView>
  )
}
