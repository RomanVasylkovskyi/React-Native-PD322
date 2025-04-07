import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { RootState } from '@/scripts/store';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // ✅ Підрахунок невиконаних завдань з Redux
  const incompleteCount = useSelector((state: RootState) =>
    state.tasks.tasks.filter((task) => !task.completed).length
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          tabBarBadge: incompleteCount > 0 ? incompleteCount : undefined, // ✅ Додано
        }}
      />
    </Tabs>
  );
}
