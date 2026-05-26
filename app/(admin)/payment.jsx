import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import AdminHeader from '../../Components/admin/admin_header';
import AnimatedButton from '../../Components/AnimatedButton';

export default function PaymentsManagement() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const [search, setSearch] = useState('');

  const transactions = [
    {
      id: 'tx102',
      name: 'M-Pesa Escrow Payout',
      role: 'SUCCESS',
      roleColor: '#D1FAE5',
      roleTextColor: '#059669',
      meta: lang === 'en' ? 'Ref: T628HJS72 • Appt #492' : 'Kumb: T628HJS72 • Miadi #492',
      avatar: '💰',
      actionLeft: lang === 'en' ? 'Audit' : 'Kagua',
      actionRight: lang === 'en' ? 'Refund' : 'Rejesha'
    }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: activeColors.background }}>
      <AdminHeader title={lang === 'en' ? 'Payment Ledger' : 'Daftari la Malipo'} />

      <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
        <View style={[styles.searchWrapper, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput 
            style={[styles.inputField, { color: activeColors.text }]}
            placeholder={lang === 'en' ? 'Search collections by Reference...' : 'Tafuta malipo kwa namba ya kumbukumbu...'}
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {transactions.map((tx) => (
          <View key={tx.id} style={[styles.userCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.avatarContainer}><Text style={styles.avatarEmoji}>{tx.avatar}</Text></View>
              <View style={styles.userInfoBlock}>
                <View style={styles.nameBadgeRow}>
                  <Text style={[styles.userNameText, { color: activeColors.text }]}>{tx.name}</Text>
                  <View style={[styles.roleBadge, { backgroundColor: tx.roleColor }]}>
                    <Text style={[styles.roleBadgeText, { color: tx.roleTextColor }]}>{tx.role}</Text>
                  </View>
                </View>
                <Text style={styles.userMetaText}>{tx.meta}</Text>
              </View>
            </View>
            <View style={styles.cardActionRow}>
              <AnimatedButton style={[styles.actionBtnLeft, { backgroundColor: activeColors.primary }]}>
                <Text style={styles.btnTextWhite}>{tx.actionLeft}</Text>
              </AnimatedButton>
              <AnimatedButton style={[styles.actionBtnRight, { borderColor: '#EF4444' }]}>
                <Text style={styles.btnTextRed}>{tx.actionRight}</Text>
              </AnimatedButton>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollBody: { flex: 1, paddingHorizontal: 20, paddingTop: 15 },
  searchWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, height: 48, marginBottom: 20 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  inputField: { flex: 1, fontSize: 14 },
  userCard: { padding: 16, borderRadius: 16, borderWidth: 1, marginBottom: 16 },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center' },
  avatarContainer: { width: 46, height: 46, borderRadius: 23, backgroundColor: 'rgba(0,0,0,0.03)', alignItems: 'center', justifyContent: 'center' },
  avatarEmoji: { fontSize: 26 },
  userInfoBlock: { flex: 1, marginLeft: 12 },
  nameBadgeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  userNameText: { fontSize: 15, fontWeight: 'bold' },
  roleBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  roleBadgeText: { fontSize: 10, fontWeight: 'bold' },
  userMetaText: { fontSize: 12, color: '#9CA3AF', marginTop: 3 },
  cardActionRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  actionBtnLeft: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  actionBtnRight: { flex: 1, paddingVertical: 10, borderWidth: 1, borderRadius: 8, alignItems: 'center' },
  btnTextWhite: { color: '#FFF', fontSize: 13, fontWeight: 'bold' },
  btnTextRed: { color: '#EF4444', fontSize: 13, fontWeight: 'bold' }
});