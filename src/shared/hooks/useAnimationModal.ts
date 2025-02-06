import { useEffect } from 'react';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useModalStore } from '../store/useModalStore';

const useAnimationModal = () => {
  const {
    isModalVisible,
    elementPosition,
    hideModal,
    // setElementPosition,
    // selectedCategory,
    // selectedItem
  } = useModalStore();

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    if (isModalVisible) {
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withTiming(1, { duration: 200 });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      scale.value = withTiming(0.9, { duration: 200 });
    }
  }, [isModalVisible, opacity, scale]);

  const closeModal = () => {
    opacity.value = withTiming(0, { duration: 200 }, () => {
      runOnJS(hideModal)();
      // TODO поскольку возможность что будет открыта модалка удаления нужно этот момент продумать
      // runOnJS(setElementPosition)(null);
    });
    scale.value = withTiming(0.9, { duration: 200 });
  };

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return { animatedOverlayStyle, closeModal, scale };
};

export default useAnimationModal;
