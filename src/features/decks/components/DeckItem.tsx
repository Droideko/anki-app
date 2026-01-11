import React, { ElementRef, useRef } from 'react';
import { router } from 'expo-router';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Card, Icon } from 'react-native-paper';

import { Deck } from '@shared/types/deck';
import { useModalStore } from '@shared/store/useModalStore';
import { useThemeColor } from '@shared/hooks/useThemeColor';
import { HEIGHT_CATEGORY_CAROUSEL } from '@shared/constants/category';

function DeckItem({ item }: { item: Deck }) {
  const elementRef = useRef<ElementRef<typeof TouchableHighlight> | null>(null);

  const { showModal } = useModalStore();

  const onLongPress = (item: Deck) => {
    elementRef.current?.measureInWindow((x, y, width, height) => {
      const position = { x, y, width, height };
      showModal(position, item);
    });
  };

  const { border, secondary, elevation } = useThemeColor();

  return (
    <View style={styles.deckItem}>
      <TouchableHighlight
        ref={elementRef}
        onLongPress={() => onLongPress(item)}
        onPress={() => {
          router.push({
            pathname: `/deck/[deckId]`,
            params: {
              name: item.name,
              deckId: String(item.id),
            },
          });
          // router.push({
          //   pathname: `/categories/[id]/decks/[deckId]`,
          //   params: {
          //     name: item.name,
          //     id: String(item.categoryId),
          //     deckId: String(item.id),
          //   },
          // });
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
          <Card.Title
            style={{ minHeight: HEIGHT_CATEGORY_CAROUSEL }}
            titleStyle={styles.cardTitle}
            title={item.name}
            left={() => <Icon source={'cards'} color={secondary} size={30} />}
          />
        </Card>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    alignContent: 'center',
    marginBottom: 0,
  },
  deckItem: {
    marginBottom: 8,
  },
});

export default DeckItem;
