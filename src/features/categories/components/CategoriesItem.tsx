import React from 'react';
import { StyleSheet } from 'react-native';

import CategoryListHeader from './CategoryListHeader';

import { ListItem, RenderersCategoryFactory } from '@features/categories/types';
import { CategoryItem } from '@features/categories/components/CategoryItem';
import DeckItem from '@features/decks/components/DeckItem';

const CATEGORIES_FACTORY = {
  header: (item: Extract<ListItem, { type: 'header' }>) => (
    <CategoryListHeader item={item} />
  ),
  category: (item: Extract<ListItem, { type: 'category' }>) => (
    <CategoryItem item={item.item} />
  ),
  deck: (item: Extract<ListItem, { type: 'deck' }>) => (
    <DeckItem item={item.item} />
  ),
} satisfies RenderersCategoryFactory;

export default function CategoriesItem(props: ListItem) {
  const Component = CATEGORIES_FACTORY[props.type] as React.ComponentType<
    Extract<ListItem, { type: typeof props.type }>
  >;

  return <Component {...props} />;
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#000',
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
