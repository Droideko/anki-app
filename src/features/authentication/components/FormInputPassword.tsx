import { FieldValues } from "react-hook-form";
import FormInput, {
  FormInputProps,
} from "../../../shared/components/forms/FormInput";
import usePasswordVisibility from "../hooks/usePasswordVisibility";
import { FormInputPasswordExcludedKeys } from "../types";

interface FormInputPasswordProps<TFieldValues extends FieldValues>
  extends Omit<FormInputProps<TFieldValues>, FormInputPasswordExcludedKeys> {}

function FormInputPassword<TFieldValues extends FieldValues>(
  props: FormInputPasswordProps<TFieldValues>
) {
  const { secureTextEntry, rightIcon, toggleVisibility } =
    usePasswordVisibility();

  return (
    <FormInput
      secureTextEntry={secureTextEntry}
      rightIcon={rightIcon}
      onRightIconPress={toggleVisibility}
      {...props}
    />
  );
}

export default FormInputPassword;
