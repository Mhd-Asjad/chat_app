import clsx from "clsx";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
  onPress?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'plain' | 'default' | 'text';
}

const Button = ({
  onPress,
  children,
  className,
  variant = "default",
  ...otherProps
}: ButtonProps) => {
  const baseClasses =
    "rounded-xl px-5 py-3 justify-center items-center transition-all duration-200";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={clsx(
        baseClasses,
        variant === "default" && "bg-blue-600 active:bg-blue-700",
        variant === "text" &&
          "border border-blue-600 bg-transparent active:bg-blue-50",
        variant === "text" && "bg-transparent",
        otherProps.disabled && "opacity-50",
        className
      )}
      {...otherProps}
    >
      <Text
        className={clsx(
          "font-medium",
          variant === "default" && "text-white text-base",
          variant === "text" && "text-blue-600 text-base",
          variant === "text" && "text-blue-600 text-sm"
        )}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
