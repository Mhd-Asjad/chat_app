import clsx from "clsx";
import { DimensionValue, Text, TextInput, View } from "react-native";

interface TextFieldProps extends React.ComponentProps<typeof TextInput> {
  width?: DimensionValue;
  label?: string;
  error?: string; // optional error text
}

const TextField = ({
  label,
  width = "100%",
  className,
  error,
  ...otherProps
}: TextFieldProps) => {
  return (
    <View style={{ width }} className="mb-4">
      {label && (
        <Text className="mb-2 text-base font-semibold text-gray-700">
          {label}
        </Text>
      )}
      <View
        className={clsx(
          "flex-row items-center rounded-2xl border px-4 py-3",
          "bg-gray-50",
          error ? "border-red-500" : "border-gray-300"
        )}
      >
        <TextInput
          placeholderTextColor="#9CA3AF" // Tailwind gray-400
          className={clsx(
            "flex-1 text-base text-gray-900",
            "placeholder:text-gray-400",
            className
          )}
          {...otherProps}
        />
      </View>
      {error && (
        <Text className="mt-1 text-sm text-red-500">
          {error}
        </Text>
      )}
    </View>
  );
};

export default TextField;
