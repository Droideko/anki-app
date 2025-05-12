import React from 'react';
import { Slot, Stack } from 'expo-router';

import { useThemeColor } from '@shared/hooks/useThemeColor';

export const DeckLayout = () => {
  const { text, secondaryBackground } = useThemeColor();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: secondaryBackground },
        headerTintColor: text,
        // headerBackTitleVisible: false,
      }}
    >
      {/* модальное редактирование колоды */}
      <Stack.Screen
        name="[deckId]/edit"
        options={{ presentation: 'modal', headerShown: true }}
      />

      <Stack.Screen
        name="[deckId]/generate"
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Generate',
        }}
      />

      {/* узел /deck/[deckId]/card/*.
         Заголовок скрываем, его покажет дочерний стек */}
      <Stack.Screen
        name="[deckId]/card/_layout"
        options={{ headerShown: false }}
      />

      <Stack.Screen name="[deckId]/card" options={{ headerShown: false }} />

      <Slot />
    </Stack>
  );

  // return (
  //   <Stack
  //     screenOptions={{
  //       headerStyle: {
  //         backgroundColor: secondaryBackground,
  //       },
  //       headerTintColor: text,
  //     }}
  //   >
  //     {/* <Stack.Screen
  //       name="[deckId]/card/create"
  //       options={{
  //         // headerShown: false,
  //         gestureEnabled: false,
  //       }}
  //     /> */}

  //     <Stack.Screen
  //       name="[deckId]/card/generate"
  //       options={{
  //         presentation: 'modal',
  //         headerShown: true,
  //         headerTitle: 'Generate',
  //       }}
  //     />
  //     <Stack.Screen
  //       name="[deckId]/card/language"
  //       options={{
  //         presentation: 'modal',
  //         headerShown: true,
  //         headerTitle: 'Select Language',
  //       }}
  //     />
  //     <Stack.Screen
  //       name="[deckId]/card/[cardId]/add-example"
  //       options={{
  //         headerShown: true,
  //         headerTitle: 'Edit Examples',
  //       }}
  //     />
  //     <Stack.Screen
  //       name="[deckId]/edit"
  //       options={{
  //         presentation: 'modal',
  //         headerShown: true,
  //       }}
  //     />
  //   </Stack>
  // );
};

export default DeckLayout;
