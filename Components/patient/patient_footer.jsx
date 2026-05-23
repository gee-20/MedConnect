import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { AppContext } from '../../app/_layout';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../AnimatedButton';

export default function PatientFooter() {
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];
  const router = useRouter();
  const segments = useSegments();

  // Active state checking
  const isHome = segments.includes('dashboard');

  return (
    <View style={[styles.footer, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
      <AnimatedButton onPress={() => router.push('/(patient)/dashboard')} style={styles.navItem}>
        <Text style={[styles.navIcon, { color: isHome ? activeColors.primary : '#9CA3AF' }]}>🏠</Text>
        <Text style={[styles.navText, { color: isHome ? activeColors.primary : '#9CA3AF' }]}>Nyumbani</Text>
      </AnimatedButton>
      
      <AnimatedButton onPress={() => router.push('/(patient)/book_consultation')} style={styles.navItem}>
        <Text style={[styles.navIcon, { color: !isHome ? activeColors.primary : '#9CA3AF' }]}>📅</Text>
        <Text style={[styles.navText, { color: !isHome ? activeColors.primary : '#9CA3AF' }]}>Weka Nafasi</Text>
      </AnimatedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1 },
  navItem: { alignItems: 'center', flex: 1 },
  navIcon: { fontSize: 20 },
  navText: { fontSize: 11, marginTop: 2, fontWeight: '500' }
});