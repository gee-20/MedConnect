import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import AdminHeader from '../../Components/admin/admin_header';
import AnimatedButton from '../../Components/AnimatedButton';

export default function AdminProfile() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: activeColors.background }}>
      <AdminHeader title={lang === 'en' ? 'Admin Profile' : 'Wasifu wa Admin'} />

      <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
        <View style={[styles.userCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border, alignItems: 'center', paddingVertical: 30 }]}>
          <View style={[styles.avatarContainer, { width: 80, height: 80, borderRadius: 40, marginBottom: 12 }]}>
            <Text style={{ fontSize: 44 }}>👨‍💻</Text>
          </View>
          <Text style={[styles.userNameText, { color: activeColors.text, fontSize: 18 }]}>minah@afyadirect</Text>
          <Text style={[styles.userMetaText, { marginBottom: 20 }]}>Root Administrator • Dar es Salaam</Text>
          
          <View style={[styles.roleBadge, { backgroundColor: '#FEE2E2' }]}>
            <Text style={[styles.roleBadgeText, { color: '#EF4444' }]}>SUPER ADMIN SECURITY TOKEN</Text>
          </View>
        </View>

        <AnimatedButton 
          style={[styles.actionBtnLeft, { backgroundColor: '#EF4444', marginTop: 10, paddingVertical: 14 }]}
          onPress={() => router.replace('/(auth)/login')}
        >
          <Text style={styles.btnTextWhite}>{lang === 'en' ? 'Exit Control Panel' : 'Ondoka kwenye Mfumo'}</Text>
        </AnimatedButton>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollBody: { flex: 1, paddingHorizontal: 20, paddingTop: 15 },
  userCard: { padding: 16, borderRadius: 16, borderWidth: 1, marginBottom: 16 },
  avatarContainer: { backgroundColor: 'rgba(0,0,0,0.03)', alignItems: 'center', justifyContent: 'center' },
  userNameText: { fontSize: 15, fontWeight: 'bold' },
  userMetaText: { fontSize: 12, color: '#9CA3AF', marginTop: 3 },
  roleBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  roleBadgeText: { fontSize: 10, fontWeight: 'bold' },
  actionBtnLeft: { paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  btnTextWhite: { color: '#FFF', fontSize: 13, fontWeight: 'bold' }
});