import { FieldValues } from 'react-hook-form';

import { FormInputProps } from '@shared/components/forms/FormInput';

export type FormInputPasswordExcludedKeys =
  | 'rightIcon'
  | 'onRightIconPress'
  | 'secureTextEntry';

export type FormInputPasswordProps<TFieldValues extends FieldValues> = Omit<
  FormInputProps<TFieldValues>,
  FormInputPasswordExcludedKeys
>;
