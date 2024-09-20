import React from "react";
import { CardItem } from ".";
import i18n from "@/global/i18n";
import NotificationSwitch from "@/components/CustomSwitch/NotificationSwitch";

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
