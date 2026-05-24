import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { AppContext } from '../../app/_layout';
import { Colors } from '../../constants/colors';
import { Translations } from '../../constants/language';
import AnimatedButton from '../AnimatedButton';

export default function PatientFooter() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const router = useRouter();
  const segments = useSegments();
  const t = Translations[lang];

  // Active route checking
  const currentTab = segments[segments.length - 1];

  const tabs = [
    { name: 'dashboard', label: t.home, icon: '🏠' },
    { name: 'book_consultation', label: t.consults, icon: '🩺' },
    { name: 'transactions', label: t.wallet, icon: '💼' },
    { name: 'profile', label: t.profile, icon: '👤' }
  ];

  return (
    <View style={[styles.footer, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.name;
        return (
          <AnimatedButton 
            key={tab.name} 
            onPress={() => router.push(`/(patient)/${tab.name}`)} 
            style={styles.navItem}
          >
            <Text style={[styles.navIcon, { color: isActive ? activeColors.primary : '#9CA3AF' }]}>
              {tab.icon}
            </Text>
            <Text style={[styles.navText, { color: isActive ? activeColors.primary : '#9CA3AF', fontWeight: isActive ? '700' : '500' }]}>
              {tab.label}
            </Text>
          </AnimatedButton>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, height: 65, alignItems: 'center' },
  navItem: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  navIcon: { fontSize: 20 },
  navText: { fontSize: 11, marginTop: 2 }
});