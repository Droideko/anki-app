import { useCallback, useEffect } from 'react';
import {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useModalStore } from '../store/useModalStore';

export const DEFAULT_ANIMATION_DURATION_MS = 200;

type UseAnimationModalOptions = {
  durationMs?: number;
};

const useAnimationModal = ({ durationMs = DEFAULT_ANIMATION_DURATION_MS }: UseAnimationModalOptions = {}) => {
  const {
    isModalVisible,
    hideModal,
  } = useModalStore();

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    if (isModalVisible) {
      cancelAnimation(opacity);
      cancelAnimation(scale);
      opacity.value = withTiming(1, { duration: durationMs });
      scale.value = withTiming(1, { duration: durationMs });
    } else {
      cancelAnimation(opacity);
      cancelAnimation(scale);
      opacity.value = withTiming(0, { duration: durationMs });
      scale.value = withTiming(0.9, { duration: durationMs });
    }
  }, [isModalVisible, opacity, scale, durationMs]);

  const closeModal = useCallback(() => {
    cancelAnimation(opacity);
    cancelAnimation(scale);
    opacity.value = withTiming(0, { duration: durationMs }, () => {
      runOnJS(hideModal)();
    });
    scale.value = withTiming(0.9, { duration: durationMs });
  }, [hideModal, opacity, scale, durationMs]);

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return { animatedOverlayStyle, closeModal, scale };
};

export default useAnimationModal;
