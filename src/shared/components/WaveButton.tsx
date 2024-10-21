import CreateIconButton from "@/src/shared/components/CreateIconButton";
import { WaveIconWrapper } from "@/src/shared/components/WaveIconWrapper";
import React from "react";
import { StyleSheet } from "react-native";

const ICON_SIZE = 50;

function WaveButton({ href, style }: { href: string; style?: any }) {
  return (
    <WaveIconWrapper
      style={styles.iconWrapper}
      isActivePulse={true}
      iconSize={ICON_SIZE} // было бы хорошо убрать от привязки size и чтобы он автоматически вычислял границы анимации
    >
      <CreateIconButton href={href} size={ICON_SIZE} />
    </WaveIconWrapper>
  );
}

export default WaveButton;

const styles = StyleSheet.create({
  iconWrapper: {
    right: 0,
    bottom: 0,
    width: 75,
    height: 75,
  },
});
