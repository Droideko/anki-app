import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

export default function TestingFlat() {
  // Создаём массив из 300 элементов (каждый элемент — объект с уникальным id)
  const data = Array.from({ length: 300 }, (_, i) => ({ id: i.toString() }));

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        // Меняем количество колонок на 4
        numColumns={2}
        initialNumToRender={40}
        windowSize={40}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          console.log('rerender');
          return (
            <View style={styles.itemContainer}>
              <Text>Item {item.id}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    minHeight: 100, // Минимальная высота
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
});
