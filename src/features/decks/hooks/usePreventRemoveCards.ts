import { useNavigation, usePreventRemove } from '@react-navigation/native';
import { useState } from 'react';
import { Alert } from 'react-native';

import isWeb from '@shared/utils/isWeb';

export default function usePreventRemoveCards() {
  const navigation = useNavigation();
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  usePreventRemove(unsavedChanges, ({ data }) => {
    if (isWeb()) {
      const discard = confirm(
        'You have unsaved changes. Discard them and leave the screen?',
      );

      if (discard) {
        navigation.dispatch(data.action);
      }
    }

    Alert.alert(
      'Discard changes?',
      'You have unsaved changes. Discard them and leave the screen?',
      [
        {
          text: "Don't leave",
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => navigation.dispatch(data.action),
        },
      ],
    );
  });

  return setUnsavedChanges;
}
