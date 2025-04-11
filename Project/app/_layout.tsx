import React from 'react';
import { Slot } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../scripts/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
