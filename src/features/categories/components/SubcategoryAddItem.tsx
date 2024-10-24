import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Card, Icon } from 'react-native-paper';

import { ITEM_SPACING, ITEM_WIDTH } from '@features/categories/constants';
import { useThemeColor } from '@shared/hooks/useThemeColor';
import { Category } from '@shared/types/category';
import { HEIGHT_CATEGORY_CAROUSEL } from '@shared/constants/category';

interface SubcategoryAddItemProps {
  parentCategoryId: Category['id'];
}

export default function SubcategoryAddItem({
  parentCategoryId,
}: SubcategoryAddItemProps) {
  const { primary, border, elevation } = useThemeColor();
  const router = useRouter();

  return (
    <Pressable
      style={styles.subcategoryItem}
      onPress={() => {
        router.push({
          pathname: `/categories/${parentCategoryId}/create-deck-or-subcategory`,
          // params: { parentCategoryId },
        });
      }}
    >
      <Card
        mode="elevated"
        style={{
          height: HEIGHT_CATEGORY_CAROUSEL,
          borderBlockEndColor: border,
          backgroundColor: elevation.level1,
        }}
      >
        <Card.Content style={styles.contentIcon}>
          <Icon color={primary} source="plus" size={36} />
        </Card.Content>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contentIcon: {
    alignItems: 'center',
    display: 'flex',
  },
  subcategoryItem: {
    marginRight: ITEM_SPACING,
    width: ITEM_WIDTH,
  },
});
