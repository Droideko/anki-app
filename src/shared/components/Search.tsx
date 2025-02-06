import React from 'react';
import { Searchbar } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { DebouncedState } from 'use-debounce';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';

import { useThemeColor } from '@shared/hooks/useThemeColor';

interface SearchProps {
  onChangeCallback: DebouncedState<(value: string) => void>;
  style?: StyleProp<TextStyle>;
}

function Search({ onChangeCallback, style }: SearchProps) {
  const { text, onSurfaceVariant } = useThemeColor();

  const { control } = useForm({
    defaultValues: {
      searchQuery: '',
    },
  });

  return (
    <Controller
      name="searchQuery"
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <Searchbar
          style={style as StyleProp<TextStyle> as never}
          placeholder="Search"
          placeholderTextColor={onSurfaceVariant}
          onChangeText={(text) => {
            onChange(text); // Обновляем значение в react-hook-form
            onChangeCallback(text); // Вызываем дебаунс-функцию
          }}
          onBlur={onBlur}
          value={value}
          inputStyle={[{ color: text }, styles.input]}
        />
      )}
    />
  );
}

export default Search;

const styles = StyleSheet.create({
  input: {
    minHeight: 45,
  },
});
