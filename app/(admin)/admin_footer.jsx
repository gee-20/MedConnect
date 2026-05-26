import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { AppContext } from '../../app/_layout';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../../Components/AnimatedButton';

export default function AdminFooter() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const router = useRouter();
  const segments = useSegments();

  const currentTab = segments[segments.length - 1];

  // Admin Navigation Array matching design spec
  const navigationTabs = [
    { name: 'user_management', labelEn: 'Users', labelSw: 'Watumiaji', icon: '👥' },
    { name: 'verify', labelEn: 'Verify', labelSw: 'Hakiki', icon: '✅' },
    { name: 'payments', labelEn: 'Payments', labelSw: 'Malipo', icon: '💳' },
    { name: 'history', labelEn: 'History', labelSw: 'Historia', icon: '📜' },
    { name: 'profile', labelEn: 'Profile', labelSw: 'Wasifu', icon: '👤' }
  ];

  return (
    <View style={[styles.footer, { backgroundColor: activeColors.surface, borderTopColor: activeColors.border }]}>
      {navigationTabs.map((tab) => {
        const isActive = currentTab === tab.name;
        return (
          <AnimatedButton 
            key={tab.name}
            onPress={() => router.push(`/(admin)/${tab.name}`)}
            style={styles.tabCell}
          >
            <Text style={[styles.tabIcon, { color: isActive ? activeColors.primary : '#9CA3AF' }]}>
              {tab.icon}
            </Text>
            <Text style={[styles.tabLabel, { color: isActive ? activeColors.primary : '#9CA3AF', fontWeight: isActive ? '700' : '500' }]}>
              {lang === 'en' ? tab.labelEn : tab.labelSw}
            </Text>
          </AnimatedButton>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, height: 65, alignItems: 'center' },
  tabCell: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  tabIcon: { fontSize: 18 },
  tabLabel: { fontSize: 10, marginTop: 3 }
});