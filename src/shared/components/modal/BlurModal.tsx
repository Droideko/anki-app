import React from 'react';
import { StyleSheet, View, Pressable, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated from 'react-native-reanimated';

import BlurModalItemFactory from '../factory/BlurModalItemFactory';
import MenuContentFactory from '../factory/MenuContentFactory';

import { useModalStore } from '@shared/store/useModalStore';
import useAnimationModal from '@shared/hooks/useAnimationModal';
import ModalMenuWrapper from '@shared/components/modal/ModalMenuWrapper';

export default function BlurModal() {
  const { isModalVisible, elementPosition, selectedItem } = useModalStore();
  const { animatedOverlayStyle, closeModal, scale } = useAnimationModal();

  console.log('BlurModal refactored');

  if (!isModalVisible || !elementPosition || !selectedItem) {
    return null;
  }

  return (
    <Modal transparent={true} animationType="none" visible={isModalVisible}>
      <Pressable onPress={closeModal} style={{ flex: 1 }}>
        <Animated.View style={[styles.modalOverlay, animatedOverlayStyle]}>
          <BlurView
            intensity={35}
            tint="light"
            style={StyleSheet.absoluteFill}
            pointerEvents="box-none"
          >
            <Pressable style={{ flex: 1 }} pointerEvents="box-none">
              <View style={{ flex: 1 }} pointerEvents="box-none">
                <BlurModalItemFactory />
                <ModalMenuWrapper scale={scale}>
                  <MenuContentFactory />
                </ModalMenuWrapper>
              </View>
            </Pressable>
          </BlurView>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
  },
});
