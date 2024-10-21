import { Text } from "@/src/shared/components/ui/ThemedText";
import React from "react";
import { Card, Icon } from "react-native-paper";
import { DeckItem } from "../DecksList";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import { Link } from "expo-router";
import { Pressable } from "react-native";

function Deck({ id, name }: DeckItem) {
  const { secondary } = useThemeColor();

  return (
    <Link href={`decks/${id}`} asChild>
      <Pressable>
        <Card mode="elevated">
          <Card.Title
            titleStyle={{ marginBottom: 0, alignContent: "center" }}
            title={name}
            left={() => <Icon source="folder" color={secondary} size={30} />}
          />
        </Card>
      </Pressable>
    </Link>
  );
}

export default Deck;
