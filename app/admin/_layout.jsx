import React, { useContext } from 'react';
import { View } from 'react-native';
import { Slot } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import AdminHeader from '../../Components/admin/admin_header';
import AdminFooter from '../../Components/admin/admin_footer';

export default function AdminLayout() {
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];

  return (
    <View style={{ flex: 1, backgroundColor: activeColors.background }}>
      <AdminHeader />
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
      <AdminFooter />
    </View>
  );
}