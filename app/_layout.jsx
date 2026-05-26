import React, { createContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Slot } from 'expo-router';

export const AppContext = createContext();

export default function RootLayout() {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState(systemScheme || 'light');
  const [lang, setLang] = useState('en');

  return (
    <AppContext.Provider value={{ theme, setTheme, lang, setLang }}>
      <Slot />
    </AppContext.Provider>
  );
}