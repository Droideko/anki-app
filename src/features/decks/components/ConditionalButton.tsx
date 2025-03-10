import React, { useMemo, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { useDeckCards } from '../hooks/useDeckCards';

import ThemedButton from '@shared/components/ui/ThemedButton';
import { Text } from '@shared/components/ui/ThemedText';
import { ThemedView } from '@shared/components/ui/ThemedView';
import { useThemeColor } from '@shared/hooks/useThemeColor';

const ConditionalButton = () => {
  const { name, deckId } = useLocalSearchParams<{
    id: string;
    name: string;
    deckId: string;
  }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { background, border } = useThemeColor();
  const cards = useDeckCards(Number(deckId));

  const isAllCardsReviewed = useMemo(() => {
    return cards.every((card) => {
      const date = card.progress[0]?.nextReview;
      if (!date) return false;
      return new Date(date).getTime() > Date.now();
    });
  }, [cards]);

  const redirect = () => {
    router.push(`/review/${deckId}?name=${name}`);
  };

  const onContinue = () => {
    setIsModalVisible(false);
    redirect();
  };

  const onStart = () => {
    if (isAllCardsReviewed) {
      setIsModalVisible(true);
      return;
    }

    redirect();
  };

  return (
    <>
      <ThemedButton
        mode="contained"
        onPress={onStart}
        contentStyle={styles.buttonContent}
        style={styles.button}
      >
        <Text>Start</Text>
      </ThemedButton>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <ThemedView
              style={[
                styles.modalContent,
                { backgroundColor: background, borderColor: border },
              ]}
            >
              <Text style={styles.modalText}>
                Today we studied all your cards. Do you want to start again?
              </Text>
              <View style={styles.buttonRow}>
                <ThemedButton onPress={() => setIsModalVisible(false)}>
                  <Text>Cancel</Text>
                </ThemedButton>
                <ThemedButton onPress={onContinue}>
                  <Text>Start</Text>
                </ThemedButton>
              </View>
            </ThemedView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    bottom: 0,
    left: '50%',
    position: 'absolute',
    transform: [{ translateX: '-50%' }],
    width: '40%',
  },
  buttonContent: {
    padding: 0,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContainer: {
    width: '80%',
  },
  modalContent: {
    borderRadius: 15,
    borderWidth: 1,
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  overlay: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default ConditionalButton;
