import React from 'react';
import { Snackbar } from 'react-native-paper';

import { SNACKBAR_TYPE } from '@shared/constants/snackbar';
import { Text } from '@shared/components/ui/ThemedText';
import { useThemeColor } from '@shared/hooks/useThemeColor';
import useSnackbarStore from '@shared/store/useSnackbarStore';
import { useMountedState } from '@shared/hooks/useMountedState';

// TODO Осторожно, так как поверх модалки не открывается снэкбар
function GlobalSnackbar() {
  const { visible, message, hideSnackbar, type } = useSnackbarStore();
  const colors = useThemeColor();

  const inMounted = useMountedState();

  const getSnackbarStyle = () => {
    switch (type) {
      case SNACKBAR_TYPE.SUCCESS:
        return { backgroundColor: colors.success };
      case SNACKBAR_TYPE.ERROR:
        return { backgroundColor: colors.error };
      default:
        return { backgroundColor: colors.surfaceVariant };
    }
  };

  const getTextColor = () => {
    switch (type) {
      case SNACKBAR_TYPE.SUCCESS:
        return colors.onSuccess;
      case SNACKBAR_TYPE.ERROR:
        return colors.onError;
      default:
        return colors.onSurfaceVariant;
    }
  };

  if (!inMounted()) {
    return null;
  }

  return (
    <Snackbar
      style={getSnackbarStyle()}
      visible={visible}
      onDismiss={hideSnackbar}
      duration={Snackbar.DURATION_SHORT}
      action={{
        label: 'Close',
        onPress: hideSnackbar,
        textColor: getTextColor(),
      }}
    >
      <Text style={{ color: getTextColor(), padding: 4 }}>{message}</Text>
    </Snackbar>
  );
}

export default GlobalSnackbar;
