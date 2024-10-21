import { DEFAULT_SIGN_UP_VALUES } from './constants';

export type SignUpFormData = Record<
  keyof typeof DEFAULT_SIGN_UP_VALUES,
  string
>;

export type LoginFormData = Record<keyof typeof DEFAULT_SIGN_UP_VALUES, string>;

export type FormInputPasswordExcludedKeys =
  | 'rightIcon'
  | 'onRightIconPress'
  | 'secureTextEntry';
