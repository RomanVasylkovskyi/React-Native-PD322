import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'; 
import TodosScreen from '../TodosScreen';


export default function App() {
  return (
    <SafeAreaProvider>
      <TodosScreen />
    </SafeAreaProvider>
  );
}
