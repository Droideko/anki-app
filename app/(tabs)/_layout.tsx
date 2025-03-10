import React from 'react';
import { Tabs } from 'expo-router';

import { TabBarIcon } from '@shared/components/TabBarIcon';
import { useThemeColor } from '@shared/hooks/useThemeColor';
import i18n from '@shared/utils/i18n';

export default function TabLayout() {
  const { tint, background } = useThemeColor();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tint,
        tabBarActiveBackgroundColor: background,
        tabBarInactiveBackgroundColor: background,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          // borderTopColor: "red",
          backgroundColor: background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: `${i18n.t('tabs.home')}`,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="categories"
        options={{
          title: `Categories`,
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'folder-open' : 'folder-open-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: `${i18n.t('tabs.settings')}`,
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'settings' : 'settings-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
