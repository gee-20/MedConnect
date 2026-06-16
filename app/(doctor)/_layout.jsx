import React, { useContext } from 'react';
import { View, StatusBar } from 'react-native';
import { Slot } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';

export default function DoctorLayout() {
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];

  return (
    <View style={{ flex: 1, backgroundColor: activeColors.background }}>
      <StatusBar 
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={activeColors.surface} 
      />
      <Slot />
    </View>
  );
}