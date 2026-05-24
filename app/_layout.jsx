import React, { createContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';

export const AppContext = createContext();

export default function RootLayout() {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState(systemScheme || 'light');
  const [lang, setLang] = useState('en');

  return (
    <AppContext.Provider value={{ theme, setTheme, lang, setLang }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(patient)" />
      </Stack>
    </AppContext.Provider>
  );
}