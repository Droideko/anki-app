import { Tabs } from "expo-router";
import { TabBarIcon } from "@/src/shared/components/TabBarIcon";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import i18n from "@/src/shared/utils/i18n";

export default function TabLayout() {
  const { tint, background } = useThemeColor();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tint,
        tabBarActiveBackgroundColor: background,
        tabBarInactiveBackgroundColor: background,
        headerShown: false,
        tabBarStyle: {
          // borderTopColor: "red",
          backgroundColor: background, // TODO сделать немного другой бэк (добавить более светлый глобальный бэк)
        },
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
        name="categories"
        options={{
          title: `Categories`, // NOT NEED (just example)
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
    </Tabs>
  );
}
