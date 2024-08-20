import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
// import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTheme } from "@/components/CustomThemeProvide";

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  const { theme } = useTheme();

  // console.log("Tabs: ", colorScheme);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.tint,
        // headerTintColor: "red",
        // tabBarInactiveTintColor: "red",
        // tabBarActiveBackgroundColor: "red",
        // headerPressColor: "red",
        // tabBarInactiveBackgroundColor: "red",
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="desks"
        options={{
          title: "Desks", // NOT NEED (just example)
          headerShown: false, // NOT NEED (just example)
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "folder-open" : "folder-open-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
