import { ThemedView } from "@/src/shared/components/ui/ThemedView";
import React from "react";
import { StyleSheet } from "react-native";
import DecksList from "./DecksList";
import { WaveIconWrapper } from "@/src/shared/components/WaveIconWrapper";
import CreateIconButton from "../../../src/shared/components/CreateIconButton";

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
        <CreateIconButton href="" size={ICON_SIZE} />
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
