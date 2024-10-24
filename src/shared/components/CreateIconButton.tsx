import React from 'react';
import { IconButtonProps } from 'react-native-paper';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';

import ThemedIconButton from '@shared/components/ui/ThemedIconButton';

export default function CreateIconButton({
  href,
  style,
  size,
}: Pick<IconButtonProps, 'style' | 'size'> & { href: string }) {
  return (
    <Link href={href} asChild>
      <Pressable>
        <ThemedIconButton style={style} size={size} icon="plus-circle" />
      </Pressable>
    </Link>
  );
}

// Остановился на моменте использование модалок, и куда поместить компонент с модальным окном? Возможно стоит использовать состояние (цуштанд)
