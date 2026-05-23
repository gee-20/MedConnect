import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { AppContext } from '../../app/_layout';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../AnimatedButton';

export default function DoctorFooter() {
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];
  const router = useRouter();
  const segments = useSegments();

  return (
    <View style={[styles.footer, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
      <AnimatedButton onPress={() => router.push('/(doctor)/queue')} style={styles.navItem}>
        <Text style={[styles.navIcon, { color: segments.includes('queue') ? activeColors.primary : '#9CA3AF' }]}>📋</Text>
        <Text style={[styles.navText, { color: segments.includes('queue') ? activeColors.primary : '#9CA3AF' }]}>Foleni</Text>
      </AnimatedButton>

      <AnimatedButton onPress={() => router.push('/(doctor)/prescription')} style={styles.navItem}>
        <Text style={[styles.navIcon, { color: segments.includes('prescription') ? activeColors.primary : '#9CA3AF' }]}>✍️</Text>
        <Text style={[styles.navText, { color: segments.includes('prescription') ? activeColors.primary : '#9CA3AF' }]}>Andika Dawa</Text>
      </AnimatedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1 },
  navItem: { alignItems: 'center', flex: 1 },
  navIcon: { fontSize: 20 },
  navText: { fontSize: 11, marginTop: 2 }
});