import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Href, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-paper';

import { Text } from '@shared/components/ui/ThemedText';
import { useThemeColor } from '@shared/hooks/useThemeColor';

interface CardArrowLinkProps {
  href: Href;
  text: string;
  icon?: string;
  value?: string;
}

export default function CardArrowLink({
  href,
  text,
  value,
  icon,
}: CardArrowLinkProps) {
  const { border } = useThemeColor();

  return (
    <Link href={href}>
      <View style={styles.card}>
        <View style={styles.textContainer}>
          {icon && <Icon source={icon} size={16} />}
          <Text variant="bodyLarge">{text}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Text style={{ opacity: 0.9 }}>{value}</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    // borderRadius: 12,
    // borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: 12,
    width: '100%',
  },
  container: {
    flex: 1,
    marginBottom: 12,
  },
  iconContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  textContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
});
