import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { RootState } from '../../scripts/store';
import TodosScreen from '../TodosScreen';
import AnotherScreen from '../AnotherScreen';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const incompleteCount = useSelector((state: RootState) =>
    state.tasks.tasks.filter(task => !task.completed).length
  );

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Tasks"
        component={TodosScreen}
        options={{ tabBarBadge: incompleteCount > 0 ? incompleteCount : undefined }}
      />
      <Tab.Screen
        name="More"
        component={AnotherScreen}
      />
    </Tab.Navigator>
  );
}
