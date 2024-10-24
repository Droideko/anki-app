import React from 'react';
import { BlurView } from 'expo-blur';
import Animated from 'react-native-reanimated';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import SubcategoryCard from '@features/categories/components/SubcategoryCard';
import CategoryModalMenu from '@features/categories/components/CategoryModalMenu';
import { useModalStore } from '@shared/store/useModalStore';
import useAnimationModal from '@shared/hooks/useAnimationModal';

const BlurModalContent = () => {
  const { isModalVisible, elementPosition, selectedCategory } = useModalStore();

  const { animatedOverlayStyle, closeModal, scale } = useAnimationModal();

  if (!isModalVisible || !elementPosition || !selectedCategory) {
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
                <SubcategoryCard
                  item={selectedCategory}
                  style={{
                    position: 'absolute',
                    top: elementPosition.y,
                    left: elementPosition.x,
                    width: elementPosition.width,
                    height: elementPosition.height,
                  }}
                />
                <CategoryModalMenu scale={scale} />
              </View>
            </Pressable>
          </BlurView>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default function CategoryBlurModal() {
  const { elementPosition, selectedCategory } = useModalStore();

  if (elementPosition === null || selectedCategory === null) {
    return null;
  }

  return <BlurModalContent />;
}

const styles = StyleSheet.create({
  // menu: {
  //   backgroundColor: 'white',
  //   padding: 10,
  //   borderRadius: 5,
  //   width: 150,
  //   // Shadows for iOS
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 4,
  //   // Elevation for Android
  //   elevation: 5,
  // },
  modalOverlay: {
    flex: 1,
  },
});
