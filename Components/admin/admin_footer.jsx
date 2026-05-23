import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../../app/_layout';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../AnimatedButton';

export default function AdminFooter() {
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];
  const router = useRouter();

  return (
    <View style={[styles.footer, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
      <AnimatedButton onPress={() => router.push('/(admin)/user_management')} style={styles.navItem}>
        <Text style={styles.navIcon}>🛡️</Text>
        <Text style={[styles.navText, { color: activeColors.text }]}>Verifications</Text>
      </AnimatedButton>
      
      <AnimatedButton onPress={() => router.replace('/login')} style={styles.navItem}>
        <Text style={styles.navIcon}>🚪</Text>
        <Text style={[styles.navText, { color: '#EF4444' }]}>Log Out</Text>
      </AnimatedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1 },
  navItem: { alignItems: 'center', flex: 1 },
  navIcon: { fontSize: 18 },
  navText: { fontSize: 11, marginTop: 2 }
});