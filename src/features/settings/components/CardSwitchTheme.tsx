import React from 'react';

import { CardItem } from './CardItem';

import i18n from '@shared/utils/i18n';
import CustomSwitch from '@features/settings/components/CustomSwitch';

function CardSwitchTheme() {
  return (
    <CardItem
      leftText={i18n.t('settings.nightTheme')}
      rightComponent={<CustomSwitch />}
    />
  );
}

export default CardSwitchTheme;
