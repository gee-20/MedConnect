import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import AdminHeader from '../../Components/admin/admin_header';
import AnimatedButton from '../../Components/AnimatedButton';

export default function VerifyManagement() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const [search, setSearch] = useState('');

  const pendingDoctors = [
    {
      id: '3',
      name: 'Dr. David Mvungi',
      role: 'PENDING DOCTOR',
      roleColor: '#FEF3C7',
      roleTextColor: '#D97706',
      meta: lang === 'en' ? 'MCT License Submitted' : 'Leseni ya MCT Imewasilishwa',
      avatar: '👨‍⚕️',
      actionLeft: lang === 'en' ? 'Verify' : 'Thibitisha',
      actionRight: lang === 'en' ? 'Reject' : 'Kataa'
    }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: activeColors.background }}>
      <AdminHeader title={lang === 'en' ? 'Verification Desk' : 'Uthibitishaji'} />

      <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
        <View style={[styles.searchWrapper, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput 
            style={[styles.inputField, { color: activeColors.text }]}
            placeholder={lang === 'en' ? 'Search pending verifications...' : 'Tafuta wanaosubiri kuthibitishwa...'}
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {pendingDoctors.map((doc) => (
          <View key={doc.id} style={[styles.userCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.avatarContainer}><Text style={styles.avatarEmoji}>{doc.avatar}</Text></View>
              <View style={styles.userInfoBlock}>
                <View style={styles.nameBadgeRow}>
                  <Text style={[styles.userNameText, { color: activeColors.text }]}>{doc.name}</Text>
                  <View style={[styles.roleBadge, { backgroundColor: doc.roleColor }]}>
                    <Text style={[styles.roleBadgeText, { color: doc.roleTextColor }]}>{doc.role}</Text>
                  </View>
                </View>
                <Text style={styles.userMetaText}>{doc.meta}</Text>
              </View>
            </View>
            <View style={styles.cardActionRow}>
              <AnimatedButton style={[styles.actionBtnLeft, { backgroundColor: activeColors.primary }]}>
                <Text style={styles.btnTextWhite}>{doc.actionLeft}</Text>
              </AnimatedButton>
              <AnimatedButton style={[styles.actionBtnRight, { borderColor: '#EF4444' }]}>
                <Text style={styles.btnTextRed}>{doc.actionRight}</Text>
              </AnimatedButton>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Layout styles are declared once below in Step 6 to keep the code clean and shared across files.