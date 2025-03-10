import { Alert } from 'react-native';

import isWeb from './isWeb';

type ShowAlertArguments = {
  preAction?: () => void;
  alertTitle: string;
  alertMessage?: string;
  onConfirm: () => void;
  postAction?: () => void;
};

export default async function showAlert({
  preAction, // Функция, выполняющаяся до подтверждения (например, closeMenu или hideModal)
  alertTitle, // Заголовок для Alert в native
  alertMessage, // Сообщение для Alert в native
  onConfirm, // Асинхронная функция, которая выполняет удаление
  postAction, // Дополнительное действие после удаления (например, router.back())
}: ShowAlertArguments) {
  if (preAction) preAction();

  if (isWeb()) {
    // В web-версии используем confirm
    const result = confirm(alertTitle);
    if (result) {
      await onConfirm();
    }
    if (postAction) postAction();
    return;
  }

  Alert.alert(alertTitle, alertMessage, [
    {
      text: 'Cancel',
      style: 'cancel',
      onPress: () => {
        if (postAction) postAction();
      },
    },
    {
      text: 'Delete',
      style: 'destructive',
      onPress: async () => {
        await onConfirm();
        if (postAction) postAction();
      },
    },
  ]);
}
