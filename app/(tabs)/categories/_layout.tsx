import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";

function CategoryLayout() {
  const { primary, text, secondaryBackground } = useThemeColor();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: secondaryBackground,
        },
        headerTintColor: text,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Categories",
          headerRight: () => (
            <Ionicons color={primary} size={22} name={"filter"} />
          ),
        }}
      />
      <Stack.Screen
        name="create-category"
        options={{
          headerShown: true,
          presentation: "modal",
          headerTitle: "Create new category",
        }}
      />
      <Stack.Screen
        name="[id]/create-deck-or-subcategory"
        options={{
          headerShown: true,
          presentation: "modal",
          headerTitle: "Create new",
        }}
      />
      <Stack.Screen
        name="[id]/decks/[deckId]/create-card"
        options={{
          headerShown: true,
          presentation: "modal",
          headerTitle: "Create Card",
        }}
      />
      <Stack.Screen
        name="[id]/edit"
        options={{
          headerShown: true,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}

export default CategoryLayout;
