import React from 'react';
import { Card } from 'react-native-paper';
import { Pressable, StyleSheet, View } from 'react-native';
import { Control, FieldValues, Path } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { CardFormValues } from './DeckCardsContainer';

import { useThemeColor } from '@shared/hooks/useThemeColor';
import FormTextarea from '@shared/components/forms/FormTextarea';

// type ArrayKey<T> = {
//   [K in keyof T]: T[K] extends any[] ? K : never;
// }[keyof T] &
//   string;

// type NameFor<T extends FieldValues, P extends ArrayKey<T>> =
//   | `${P}.${number}.front`
//   | `${P}.${number}.back`;

// interface DeckCardProps<
//   TFieldValues extends FieldValues,
//   P extends ArrayKey<TFieldValues>,
// > {
//   control: Control<TFieldValues>;
//   index: number;
//   namePrefix: P;
//   autoFocus?: boolean;
//   onEdit?: () => void;
//   onAddExample?: () => void;
// }

interface DeckCardProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  index: number;
  namePrefix: string; // ← было P extends ArrayKey<…>
  autoFocus?: boolean;
  onEdit?: () => void;
  onAddExample?: () => void;
}

export default function DeckCard<TFieldValues extends FieldValues>({
  control,
  index,
  namePrefix, // теперь это просто строка-префикс
  autoFocus,
  onEdit,
  onAddExample,
}: DeckCardProps<TFieldValues>) {
  const { border, elevation, primary } = useThemeColor();

  const makeName = <K extends 'front' | 'back'>(field: K) =>
    `${namePrefix}.${index}.${field}` as Path<TFieldValues>;

  return (
    <Card
      mode="elevated"
      style={[
        styles.card,
        { borderBlockEndColor: border, backgroundColor: elevation.level1 },
      ]}
    >
      <Card.Content style={styles.content}>
        <View style={styles.textareaWrapper}>
          <FormTextarea<TFieldValues>
            control={control}
            name={makeName('front')}
            label="Front"
            autoFocus={autoFocus}
            onChangeText={onEdit}
          />
          {onAddExample && (
            <Pressable onPress={onAddExample} style={styles.icon}>
              <Ionicons name="add-circle-outline" size={20} color={primary} />
            </Pressable>
          )}
        </View>

        <View style={styles.textareaWrapper}>
          <FormTextarea<TFieldValues>
            control={control}
            name={makeName('back')}
            label="Back"
            onChangeText={onEdit}
          />
          {onAddExample && (
            <Pressable onPress={onAddExample} style={styles.icon}>
              <Ionicons name="add-circle-outline" size={20} color={primary} />
            </Pressable>
          )}
        </View>
      </Card.Content>
    </Card>
  );
}

// interface DeckCardProps {
//   control: Control<CardFormValues>;
//   index: number;
//   autoFocus?: boolean;
//   onEdit?: () => void;
//   onAddExample?: () => void;
//   namePrefix?: string;
// }

// export default function DeckCard({
//   control,
//   index,
//   autoFocus,
//   onEdit,
//   onAddExample,
//   namePrefix,
// }: DeckCardProps) {
//   const { border, elevation, primary } = useThemeColor();

//   return (
//     <Card
//       mode="elevated"
//       style={[
//         styles.card,
//         { borderBlockEndColor: border, backgroundColor: elevation.level1 },
//       ]}
//     >
//       <Card.Content style={styles.content}>
//         <View style={styles.textareaWrapper}>
//           <FormTextarea
//             style={styles.textArea}
//             control={control}
//             label="Front"
//             name={`cards.${index}.front`}
//             autoFocus={autoFocus}
//             onChangeText={() => {
//               onEdit?.();
//             }}
//           />
//           {onAddExample && (
//             <Pressable onPress={onAddExample} style={styles.icon}>
//               <Ionicons name="add-circle-outline" size={20} color={primary} />
//             </Pressable>
//           )}
//         </View>
//         <View style={styles.textareaWrapper}>
//           <FormTextarea
//             control={control}
//             label="Back"
//             name={`cards.${index}.back`}
//             onChangeText={() => {
//               onEdit?.();
//             }}
//           />
//           {onAddExample && (
//             <Pressable onPress={onAddExample} style={styles.icon}>
//               <Ionicons name="add-circle-outline" size={20} color={primary} />
//             </Pressable>
//           )}
//         </View>
//       </Card.Content>
//     </Card>
//   );
// }

const styles = StyleSheet.create({
  card: { borderRadius: 8, marginBottom: 8 },
  content: { paddingTop: 8 },
  icon: { bottom: 4, padding: 4, position: 'absolute', right: 4 },
  textArea: {
    // marginBottom: 8,
  },
  textareaWrapper: { marginBottom: 8, position: 'relative' },
});
