import React, { useMemo } from 'react';
import { Searchbar } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
// import { DebouncedState, useDebouncedCallback } from 'use-debounce';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

import { useThemeColor } from '@shared/hooks/useThemeColor';

interface SearchProps {
  onChange: (value: string) => void;
  debounceTime?: number; // в мс, например, 300 или 0 для отсутствия дебаунса
  // onChangeCallback: (value: string) => void;
  style?: StyleProp<TextStyle>;
}

function Search({ onChange, debounceTime = 0, style }: SearchProps) {
  const { text, onSurfaceVariant } = useThemeColor();

  const { control } = useForm({
    defaultValues: {
      searchQuery: '',
    },
  });

  const debouncedOnChange = useDebouncedCallback((value: string) => {
    onChange(value);
  }, debounceTime);

  const handleChange = useMemo(() => {
    return debounceTime > 0 ? debouncedOnChange : onChange;
  }, [debounceTime, debouncedOnChange, onChange]);

  return (
    <Controller
      name="searchQuery"
      control={control}
      render={({ field: { onChange: formOnChange, onBlur, value } }) => (
        <Searchbar
          style={style as StyleProp<TextStyle> as never}
          placeholder="Search"
          placeholderTextColor={onSurfaceVariant}
          onChangeText={(text) => {
            formOnChange(text); // Обновляем значение в react-hook-form
            handleChange(text); // Вызываем дебаунс-функцию
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
