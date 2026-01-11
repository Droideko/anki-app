import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Href, Link } from 'expo-router';

import { Text } from '@shared/components/ui/ThemedText';
import { useThemeColor } from '@shared/hooks/useThemeColor';

interface CardLanguageLinkProps {
  label: string;
  href: Href;
  language: string;
}

export default function CardLanguageLink({
  label,
  href,
  language,
}: CardLanguageLinkProps) {
  const { border } = useThemeColor();

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 8 }}>{label}</Text>
      <Link href={href}>
        <View style={[styles.card, { borderColor: border }]}>
          <Text variant="bodyLarge">{language}</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </View>
      </Link>
    </View>
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
    padding: 12,
    width: '100%',
  },
  container: {
    flex: 1,
    marginBottom: 12,
  },
});
