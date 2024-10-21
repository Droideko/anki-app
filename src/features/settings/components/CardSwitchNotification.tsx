import React from "react";
import { CardItem } from "./CardItem";
import i18n from "@/src/shared/utils/i18n";
import NotificationSwitch from "@/src/features/settings/components/NotificationSwitch";

function CardSwitchNotification() {
  return (
    <CardItem
      leftText={i18n.t("settings.notification")}
      rightComponent={<NotificationSwitch />}
      // style={{ marginBottom: 0 }}
    />
  );
}

export default CardSwitchNotification;
