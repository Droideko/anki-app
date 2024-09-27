import { DEFAULT_SIGN_UP_VALUES } from "../constants";

export type SignUpFormData = typeof DEFAULT_SIGN_UP_VALUES;

export type FormInputPasswordExcludedKeys =
  | "rightIcon"
  | "onRightIconPress"
  | "secureTextEntry";
