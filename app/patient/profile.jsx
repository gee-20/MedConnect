import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import { Translations } from '../../constants/language';
import AnimatedButton from '../../Components/AnimatedButton';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const t = Translations[lang];
  const router = useRouter();

  return (
    <View style={[styles.layoutWrapperViewContainer, { backgroundColor: activeColors.background }]}>
      <Text style={[styles.headerTitle, { color: activeColors.text }]}>{t.profile}</Text>

      <View style={[styles.identitySummaryCardBox, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
        <Text style={styles.avatarInlineIconField}>👤</Text>
        <Text style={[styles.nameTagTitle, { color: activeColors.text }]}>Salome Kalonge</Text>
        <Text style={styles.userMetadataDetailsLabel}>salome.kalonge@example.tz</Text>
      </View>

      <AnimatedButton 
        style={[styles.logoutActionButton, { backgroundColor: '#EF4444' }]}
        onPress={() => router.replace('/(auth)/login')}
      >
        <Text style={styles.logoutActionLabelText}>Log Out</Text>
      </AnimatedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  layoutWrapperViewContainer: { flex: 1, padding: 20, paddingTop: 60 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 24 },
  identitySummaryCardBox: { padding: 24, borderRadius: 16, borderWidth: 1, alignItems: 'center', marginBottom: 30 },
  avatarInlineIconField: { fontSize: 50, marginBottom: 12 },
  nameTagTitle: { fontSize: 18, fontWeight: 'bold' },
  userMetadataDetailsLabel: { color: '#9CA3AF', fontSize: 14, marginTop: 4 },
  logoutActionButton: { padding: 16, borderRadius: 12, alignItems: 'center' },
  logoutActionLabelText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 }
});