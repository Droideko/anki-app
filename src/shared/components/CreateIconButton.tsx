import React from 'react';
import { Href, Link } from 'expo-router';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useThemeColor } from '@shared/hooks/useThemeColor';

export default function CreateIconButton({
  href,
  size,
  style,
}: {
  href: Href;
  size: number;
  style?: StyleProp<ViewStyle>;
}) {
  const { primary: circleColor, text: plusColor } = useThemeColor();

  const containerStyle = StyleSheet.flatten([
    style,
    { width: size, height: size },
  ]);

  return (
    <Link href={href} asChild>
      <Pressable style={containerStyle}>
        <View
          style={[
            styles.circle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: circleColor,
            },
          ]}
        >
          <MaterialCommunityIcons name="plus" size={24} color={plusColor} />
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
  },
});

// export default function CreateIconButton({
//   href,
//   style,
//   size,
// }: Pick<IconButtonProps, 'style' | 'size'> & { href: Href }) {
//   return (
//     <Link href={href} asChild>
//       <Pressable>
//         <ThemedIconButton style={style} size={size} icon="plus-circle" />
//       </Pressable>
//     </Link>
//   );
// }
