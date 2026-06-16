import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { AppContext } from '../../app/_layout';
import { Colors } from '../../constants/colors';

export default function DoctorFooter() {
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];
  const router = useRouter();
  const pathname = usePathname();

  // Updated navigation items matching your layout rule specs exactly
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/(doctor)', icon: '📊' },
    { id: 'queue', label: 'Queue', path: '/(doctor)/queue', icon: '📋' },
    { id: 'records', label: 'Records', path: '/(doctor)/records', icon: '📁' },
    { id: 'earnings', label: 'Earnings', path: '/(doctor)/earnings', icon: '💵' },
    { id: 'profile', label: 'Profile', path: '/(doctor)/profile', icon: '👤' },
  ];

  return (
    <View style={[styles.footerContainer, { backgroundColor: activeColors.surface, borderTopColor: activeColors.border }]}>
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <TouchableOpacity 
            key={item.id} 
            style={styles.navButton} 
            onPress={() => router.push(item.path)}
          >
            <Text style={[styles.iconText, isActive && { opacity: 1 }]}>{item.icon}</Text>
            <Text style={[styles.labelText, { color: isActive ? activeColors.primary : '#6B7280', fontWeight: isActive ? '700' : '500' }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    height: 64,
    borderTopWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 4,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconText: {
    fontSize: 18,
    opacity: 0.6,
  },
  labelText: {
    fontSize: 10,
    marginTop: 2,
  },
});