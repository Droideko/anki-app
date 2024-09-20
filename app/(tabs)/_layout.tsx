import { Tabs } from "expo-router";
import React from "react";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useTheme } from "@/components/CustomThemeProvide";
import { BottomNavigation, Text } from "react-native-paper";
import HomeScreen from ".";
import DecksScreen from "./decks";
import SettingsScreen from "./settings";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import i18n from "@/global/i18n";
import { getLocales } from "expo-localization";

// export default function TabLayout() {
//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     {
//       key: "index",
//       title: "Home",
//       focusedIcon: "home",
//       unfocusedIcon: "home-outline",
//     },
//     {
//       key: "decks",
//       title: "Decks",
//       focusedIcon: "folder",
//       unfocusedIcon: "folder-outline",

//     },
//     {
//       key: "settings",
//       title: "Settings",
//       focusedIcon: "cog",
//       unfocusedIcon: "cog-outline",
//     },
//   ]);

//   const renderScene = BottomNavigation.SceneMap({
//     index: HomeScreen,
//     decks: DecksScreen,
//     settings: SettingsScreen,
//   });

//   return (
//     <BottomNavigation
//       navigationState={{ index, routes }}
//       onIndexChange={setIndex}
//       renderScene={renderScene}
//     />
//   );
// }

export default function TabLayout() {
  const { theme } = useTheme();

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
          title: `${i18n.t("tabs.home")}`,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="decks"
        options={{
          title: `${i18n.t("tabs.decks")}`, // NOT NEED (just example)
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
          title: `${i18n.t("tabs.settings")}`,
          headerShown: false,
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
