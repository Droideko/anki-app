import React from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
// eslint-disable-next-line import/no-unresolved
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

import { useThemeColor } from '@shared/hooks/useThemeColor';

export interface FormInputProps<TFieldValues extends FieldValues>
  extends TextInputProps {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  secureTextEntry?: boolean;
  rightIcon?: IconSource;
  onRightIconPress?: () => void;
  mode?: 'flat' | 'outlined';
  errorStyles?: StyleProp<TextStyle>;
}

const FormInput = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  rules = {},
  secureTextEntry = false,
  mode = 'outlined',
  rightIcon,
  onRightIconPress,
  onChangeText,
  errorStyles,
  ...inputProps
}: FormInputProps<TFieldValues>) => {
  const { error: errorColor } = useThemeColor();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            label={label}
            mode={mode}
            onBlur={onBlur}
            onChangeText={(text) => {
              onChange(text); // Обновляем значение в react-hook-form
              if (onChangeText) {
                onChangeText(text); // Вызываем дополнительный обработчик
              }
            }}
            value={value}
            secureTextEntry={secureTextEntry}
            error={!!error}
            right={
              rightIcon && (
                <TextInput.Icon
                  forceTextInputFocus={false}
                  icon={rightIcon}
                  onPress={onRightIconPress}
                />
              )
            }
            style={styles.input}
            {...inputProps}
          />
          <Text style={[styles.errorText, { color: errorColor }, errorStyles]}>
            {!!error && error.message}
          </Text>
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  errorText: {
    marginBottom: 2,
    minHeight: 20,
  },
  input: {
    marginBottom: 2,
  },
});

export default FormInput;
