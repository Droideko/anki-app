import React from 'react';
import { Card, Icon } from 'react-native-paper';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { useThemeColor } from '@shared/hooks/useThemeColor';
import { SubCategoryItemTypeWithoutAddSubcategory } from '@shared/types/category';
import { HEIGHT_CATEGORY_CAROUSEL } from '@shared/constants/category';

interface SubcategoryCardProps {
  item: SubCategoryItemTypeWithoutAddSubcategory;
  style?: StyleProp<ViewStyle>;
  iconSize?: number;
  onPress?: (event: GestureResponderEvent) => void;
}

function SubcategoryCard({
  item,
  style,
  onPress,
  iconSize,
}: SubcategoryCardProps) {
  const { border, secondary, elevation } = useThemeColor();

  return (
    <Card
      onPress={onPress}
      mode="elevated"
      style={[
        {
          height: HEIGHT_CATEGORY_CAROUSEL,
          borderBlockEndColor: border,
          backgroundColor: elevation.level1,
        },
        styles.card,
        style,
      ]}
    >
      <Card.Title
        style={styles.cardInner}
        titleStyle={styles.cardTitle}
        title={item.name}
        left={() => (
          <Icon
            source={item.type === 'CATEGORY' ? 'folder' : 'cards'}
            color={secondary}
            size={iconSize || 30}
          />
        )}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
  },
  cardInner: {
    minHeight: 'auto',
  },
  cardTitle: {
    alignContent: 'center',
    marginBottom: 0,
  },
});

export default SubcategoryCard;
