import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { StyleSheet } from "react-native";
import DecksList from "./DecksList";
import CreateIconButton from "../CreateIconButton";
import { WaveIconWrapper } from "@/components/WaveIconWrapper";

const ICON_SIZE = 50;

export default function DecksContent() {
  return (
    <ThemedView style={styles.container}>
      <DecksList />
      <WaveIconWrapper
        style={styles.iconWrapper}
        isActivePulse={true}
        iconSize={ICON_SIZE} // было бы хорошо убрать от привязки size и чтобы он автоматически вычислял границы анимации
      >
        <CreateIconButton size={ICON_SIZE} />
      </WaveIconWrapper>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  iconWrapper: {
    right: 0,
    bottom: 0,
    width: 75,
    height: 75,
  },
});
