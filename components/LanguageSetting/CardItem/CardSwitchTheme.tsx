import React from "react";
import { CardItem } from ".";
import i18n from "@/global/i18n";
import CustomSwitch from "@/components/CustomSwitch";

function CardSwitchTheme() {
  return (
    <CardItem
      leftText={i18n.t("settings.nightTheme")}
      rightComponent={<CustomSwitch />}
    />
  );
}

export default CardSwitchTheme;
