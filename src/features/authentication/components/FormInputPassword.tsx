import React from 'react';
import { FieldValues } from 'react-hook-form';

import usePasswordVisibility from '../hooks/usePasswordVisibility';
import { FormInputPasswordProps } from '../types';

import FormInput from '@shared/components/forms/FormInput';

function FormInputPassword<TFieldValues extends FieldValues>(
  props: FormInputPasswordProps<TFieldValues>,
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
