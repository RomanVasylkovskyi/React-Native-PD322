import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="artist/index" options={{ title: 'Художник' }} />
      <Stack.Screen name="artist/gallery" options={{ title: 'Галерея' }} />
    </Stack>
  );
}