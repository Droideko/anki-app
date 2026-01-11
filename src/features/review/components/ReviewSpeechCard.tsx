import React, { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Audio } from 'expo-av';
import { router, useLocalSearchParams } from 'expo-router';

import { ttsService } from '@shared/api/ttsService';
import ThemedIconButton from '@shared/components/ui/ThemedIconButton';

interface ReviewSpeechCardProps {
  text: string;
  type: 'front' | 'back';
  languageCode?: string;
  style?: StyleProp<ViewStyle>;
}

export default function ReviewSpeechCard({
  text,
  type,
  languageCode,
  style,
}: ReviewSpeechCardProps) {
  const [cachedSound, setCachedSound] = useState<Audio.Sound | null>(null);
  const { deckId } = useLocalSearchParams<{ deckId: string }>();

  useEffect(() => {
    return () => {
      if (cachedSound) {
        cachedSound.unloadAsync();
      }
    };
  }, [cachedSound]);

  const playAudio = async () => {
    if (!languageCode) {
      router.push({
        pathname: `/review/[deckId]/language`,
        params: { deckId, type },
      });
      return;
    }

    try {
      if (cachedSound) {
        await cachedSound.setPositionAsync(0);
        return await cachedSound.playAsync();
      }

      const audioUrl = await ttsService.getSpeech(text, languageCode);
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      setCachedSound(sound);

      await sound.playAsync();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  return (
    <ThemedIconButton
      style={style}
      icon={'volume-high'}
      size={30}
      onPress={() => {
        playAudio();
      }}
    />
  );
}
