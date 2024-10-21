import React, { useRef } from "react";
import { useModalStore } from "@/src/shared/store/useModalStore";
import { Deck } from "@/src/shared/types/deck";
import { router } from "expo-router";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { Card, Icon } from "react-native-paper";
import { HEIGHT_CATEGORY_CAROUSEL } from "@/src/features/categories/constants";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";

function DeckItem({ item }: { item: Deck }) {
  const elementRefs = useRef<TouchableHighlight | null>(null);

  const { showModal } = useModalStore();

  const onLongPress = (item: Deck) => {
    elementRefs.current?.measureInWindow((x, y, width, height) => {
      const position = { x, y, width, height };
      showModal(position, item);
    });
  };

  const { border, secondary, elevation } = useThemeColor();

  return (
    <View style={styles.deckItem}>
      <TouchableHighlight
        ref={elementRefs}
        onLongPress={() => onLongPress(item)}
        onPress={() => {
          router.push({
            pathname: `/categories/${item.categoryId}/decks/${item.id}`,
            params: { name: item.name },
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
          <Card.Title
            style={{ minHeight: HEIGHT_CATEGORY_CAROUSEL }}
            titleStyle={{ marginBottom: 0, alignContent: "center" }}
            title={item.name}
            left={() => <Icon source={"cards"} color={secondary} size={30} />}
          />
        </Card>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  deckItem: {
    marginBottom: 8,
  },
});

export default DeckItem;
