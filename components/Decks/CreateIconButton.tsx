import React from "react";
import ThemedIconButton from "../ThemedIconButton";
import { IconButtonProps } from "react-native-paper";
import { Link } from "expo-router";
import { Pressable } from "react-native";

export default function CreateIconButton({
  style,
  size,
}: Pick<IconButtonProps, "style" | "size">) {
  return (
    <Link href="/decks/create-deck" asChild>
      <Pressable>
        <ThemedIconButton style={style} size={size} icon="plus-circle" />
      </Pressable>
    </Link>
  );
}

// Остановился на моменте использование модалок, и куда поместить компонент с модальным окном? Возможно стоит использовать состояние (цуштанд)
