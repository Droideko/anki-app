import React from 'react';
import { IconButtonProps } from 'react-native-paper';
import { Href, Link } from 'expo-router';
import { Pressable } from 'react-native';

import ThemedIconButton from '@shared/components/ui/ThemedIconButton';

export default function CreateIconButton({
  href,
  style,
  size,
}: Pick<IconButtonProps, 'style' | 'size'> & { href: Href }) {
  return (
    <Link href={href} asChild>
      <Pressable>
        <ThemedIconButton style={style} size={size} icon="plus-circle" />
      </Pressable>
    </Link>
  );
}
