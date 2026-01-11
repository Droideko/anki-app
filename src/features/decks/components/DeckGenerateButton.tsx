import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Href, Link } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { useThemeColor } from '@shared/hooks/useThemeColor';

export default function DeckGenerateButton({ href }: { href: Href }) {
  const { primary, onPrimary } = useThemeColor();

  return (
    <Link
      asChild
      href={href}
      style={[styles.container, { backgroundColor: primary }]}
    >
      <Pressable>
        <MaterialCommunityIcons
          name="star-four-points"
          size={16}
          color={onPrimary}
        />
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 50,
    bottom: 32,
    display: 'flex',
    height: 40,
    justifyContent: 'center',
    left: 16,
    marginBottom: 0,
    position: 'absolute',
    width: 40,
  },
});
