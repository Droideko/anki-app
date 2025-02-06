import React from 'react';
import { FieldValues } from 'react-hook-form';
import { StyleSheet } from 'react-native';

import FormInput, { FormInputProps } from './FormInput';

export default function FormTextarea<TFieldValues extends FieldValues>(
  props: FormInputProps<TFieldValues>,
) {
  return (
    <FormInput
      dense={true}
      multiline={true}
      scrollEnabled={props.scrollEnabled || false}
      style={styles.formArea}
      errorStyles={styles.errorStyles}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  errorStyles: {
    display: 'none',
  },
  formArea: {
    minHeight: 40,
    textAlignVertical: 'top',
  },
});
