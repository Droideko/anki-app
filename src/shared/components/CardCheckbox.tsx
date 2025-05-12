import React, { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Checkbox, Divider } from 'react-native-paper';
import { Control, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import AccordionSimple from './AccordionSimple';
import { Text } from './ui/ThemedText';

import { useThemeColor } from '@shared/hooks/useThemeColor';
import { Card } from '@shared/api/openaiService';

type CreatedCardFormValues = {
  deckId: number;
  cards: {
    selected: boolean; // сама карточка
    examples: boolean[]; // её примеры
  }[];
};

export default function CardCheckbox({
  card,
  control,
  index,
  expanded,
  onExpandChange,
}: {
  card: Card;
  control: Control<CreatedCardFormValues>;
  index: number;
  expanded: boolean;
  onExpandChange: (idx: number, value: boolean) => void;
}) {
  const { border, background } = useThemeColor();

  const isExpanded = useSharedValue(expanded);

  useEffect(() => {
    isExpanded.value = expanded;
  }, [expanded, isExpanded]);

  const arrowRotation = useDerivedValue(() =>
    withTiming(isExpanded.value ? 180 : 0, { duration: 300 }),
  );

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${arrowRotation.value}deg` }],
  }));

  const onHeaderPress = () => {
    const next = !expanded;
    onExpandChange(index, next); // сообщаем родителю
  };

  // const isExpanded = useSharedValue(false);

  // const arrowRotation = useDerivedValue(() => {
  //   return withTiming(isExpanded.value ? 180 : 0, { duration: 300 });
  // });

  // const arrowStyle = useAnimatedStyle(() => ({
  //   transform: [{ rotate: `${arrowRotation.value}deg` }],
  // }));

  // const onHeaderPress = () => {
  //   isExpanded.value = !isExpanded.value;
  // };

  const hasExamples = Number(card.examples?.length) > 0;

  return (
    <>
      <Controller
        control={control}
        name={`cards.${index}.selected`}
        // defaultValue={true}
        render={({ field: { onChange, value } }) => (
          <Pressable onPress={() => onChange(!value)}>
            <View
              style={[
                styles.card,
                { borderColor: border, position: 'relative' },
              ]}
            >
              <View style={styles.checkboxContainer}>
                <Checkbox status={value ? 'checked' : 'unchecked'} />
              </View>
              <View style={styles.iconContainer}>
                <Text variant="bodyLarge" style={styles.centeredText}>
                  {card.front}
                </Text>
                <Divider />
                <Text variant="bodyLarge" style={styles.centeredText}>
                  {card.back}
                </Text>
              </View>
              {hasExamples && (
                <Animated.View style={[styles.chevronIcon, arrowStyle]}>
                  <Ionicons
                    onPress={onHeaderPress}
                    name="chevron-down"
                    size={20}
                    color="#fff"
                  />
                </Animated.View>
              )}
            </View>
          </Pressable>
        )}
      />
      {hasExamples && (
        <AccordionSimple open={isExpanded}>
          <View style={[styles.exampleWrapper, { borderColor: border }]}>
            {card.examples!.map((ex, exIdx) => (
              <Controller
                key={exIdx}
                control={control}
                name={`cards.${index}.examples.${exIdx}`}
                render={({ field: { value, onChange } }) => (
                  <Pressable
                    onPress={() => onChange(!value)}
                    style={
                      exIdx === 0
                        ? styles.example
                        : [styles.example, styles.exampleWithMargin]
                    }
                  >
                    <View
                      style={[
                        styles.exampleCheckboxContainer,
                        {
                          backgroundColor: background,
                        },
                      ]}
                    >
                      <Checkbox status={value ? 'checked' : 'unchecked'} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.centeredText}>{ex.front}</Text>
                      <Divider />
                      <Text style={styles.centeredText}>{ex.back}</Text>
                    </View>
                  </Pressable>
                )}
              />
            ))}
          </View>
        </AccordionSimple>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    padding: 8,
    width: '100%',
  },
  centeredText: {
    textAlign: 'center',
  },
  checkboxContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
  },
  chevronIcon: {
    bottom: 0,
    padding: 8,
    position: 'absolute',
    right: 0,
    zIndex: 2,
  },
  iconContainer: {
    flex: 1,
    gap: 4,
  },
  example: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  exampleCheckboxContainer: {
    borderRadius: 16,
    padding: 2,
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: '-50%' }],
    zIndex: 2,
    // backgroundColor, borderRadius, padding задаются inline
  },
  exampleWrapper: {
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 4,
    padding: 6,
  },
  exampleWithMargin: {
    marginTop: 12,
  },
});
