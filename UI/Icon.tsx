import { LucideIcon } from "lucide-react-native";
import { useColorScheme } from "nativewind";

interface Props {
  icon: LucideIcon;
  size?: number;
  className?: string;
  color? : string;
}
export function Icon({ icon: Icon, className, size = 25, color }: Props) {
  const { colorScheme } = useColorScheme();
  return (
    <Icon
      color={color ? color : colorScheme === "dark" ? "#fff" : "#000" }
      size={size}
      className={className}
    />
  );
}