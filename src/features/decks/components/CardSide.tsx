import React from 'react';
import Animated, { AnimatedStyle } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native';

import { useThemeColor } from '@shared/hooks/useThemeColor';

interface CardSideProps {
  text: string;
  gradientColors: [string, string];
  animatedStyles: AnimatedStyle<StyleProp<ViewStyle>>[];
}

function CardSide({ text, gradientColors, animatedStyles }: CardSideProps) {
  const { surface, onSurface } = useThemeColor();

  return (
    <Animated.View style={[styles.innerCard, ...animatedStyles]}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        <View style={[styles.contentCard, { backgroundColor: surface }]}>
          <Text
            style={[styles.text, { color: onSurface }]}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {text}
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

export default CardSide;

const styles = StyleSheet.create({
  contentCard: {
    borderRadius: 12,
    elevation: 5,
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  gradientContainer: {
    borderRadius: 16,
    flex: 1,
    padding: 4,
    width: '100%',
  },
  innerCard: {
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
