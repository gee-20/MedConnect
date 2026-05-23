import React, { useContext } from 'react';
import { View } from 'react-native';
import { Slot } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';

// Cleaned up relative imports without extensions
import DoctorHeader from '../../Components/doctor/doctor_header';
import DoctorFooter from '../../Components/doctor/admin_footer';

export default function DoctorLayout() {
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];

  return (
    <View style={{ flex: 1, backgroundColor: activeColors.background }}>
      <DoctorHeader />
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
      <DoctorFooter />
    </View>
  );
}