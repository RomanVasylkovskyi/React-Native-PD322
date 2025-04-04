import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodosScreen from '../TodosScreen';
import AnotherScreen from '../AnotherScreen';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Todos"
        component={TodosScreen}
        options={{ tabBarLabel: 'Завдання' }}
      />
      <Tab.Screen
        name="Another"
        component={AnotherScreen}
        options={{ tabBarLabel: 'Інше' }}
      />
    </Tab.Navigator>
  );
}
