// import React, { useState, useContext } from 'react';
// import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
// import { AppContext } from '../_layout';
// import { Colors } from '../../constants/colors';
// import AnimatedButton from '../../Components/AnimatedButton';

// export default function UserManagement() {
//   const { theme } = useContext(AppContext);
//   const activeColors = Colors[theme];

//   const [pendingDoctors, setPendingDoctors] = useState([
//     { id: '1', name: 'Dr. Michael John', license: 'MD-20641-TZ', specialty: 'Cardiology' },
//     { id: '2', name: 'Dr. Sarah M. Kiswahili', license: 'MD-88123-TZ', specialty: 'Pediatrics' },
//   ]);

//   const handleVerify = (id, name) => {
//     Alert.alert("Doctor Approved", `${name} has been verified and activated successfully.`);
//     setPendingDoctors(prev => prev.filter(doc => doc.id !== id));
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: activeColors.background }]}>
//       <Text style={[styles.title, { color: activeColors.text }]}>Pending Verifications (Admins Only)</Text>
//       <Text style={styles.subtitle}>Review doctor credentials carefully before system approval.</Text>

//       <FlatList
//         data={pendingDoctors}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={[styles.card, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
//             <Text style={[styles.docName, { color: activeColors.text }]}>{item.name}</Text>
//             <Text style={styles.details}>License: {item.license}</Text>
//             <Text style={styles.details}>Specialty: {item.specialty}</Text>

//             <View style={styles.btnGroup}>
//               <AnimatedButton style={[styles.verifyBtn, { backgroundColor: activeColors.primary }]} onPress={() => handleVerify(item.id, item.name)}>
//                 <Text style={styles.btnText}>Verify</Text>
//               </AnimatedButton>
//               <AnimatedButton style={styles.rejectBtn}>
//                 <Text style={styles.btnText}>Reject</Text>
//               </AnimatedButton>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
//   subtitle: { color: '#9CA3AF', fontSize: 13, marginBottom: 20, marginTop: 4 },
//   card: { padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 14 },
//   docName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
//   details: { color: '#6B7280', fontSize: 14, marginBottom: 2 },
//   btnGroup: { flexDirection: 'row', gap: 10, marginTop: 14 },
//   verifyBtn: { flex: 1, padding: 10, borderRadius: 8, alignItems: 'center' },
//   rejectBtn: { flex: 1, padding: 10, borderRadius: 8, backgroundColor: '#EF4444', alignItems: 'center' },
//   btnText: { color: '#FFF', fontWeight: 'bold' }
// });



import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import AdminHeader from '../../Components/admin/admin_header';
import AnimatedButton from '../../Components/AnimatedButton';

export default function UserManagement() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];

  const [search, setSearch] = useState('');
  const [activeSegment, setActiveSegment] = useState('All'); // 'All' | 'Patients' | 'Doctors'

  // Mock data mirroring the blueprint items exactly
  const platformUsers = [
    {
      id: '1',
      name: 'Salome Kalonge',
      role: 'PATIENT',
      roleColor: '#E0F2FE',
      roleTextColor: '#0284C7',
      meta: lang === 'en' ? 'Joined 01/05/26' : 'Amejiunga 01/05/26',
      avatar: '👩🏾',
      status: 'online',
      actionLeft: lang === 'en' ? 'View' : 'Angalia',
      actionRight: lang === 'en' ? 'Block' : 'Zuia'
    },
    {
      id: '2',
      name: 'Dr. Sarah Kimathi',
      role: 'DOCTOR',
      roleColor: '#EEF2FF',
      roleTextColor: '#4F46E5',
      meta: lang === 'en' ? '✓ Verified Specialist' : '✓ Bingwa Aliyethibitishwa',
      avatar: '👩‍⚕️',
      status: 'verified',
      actionLeft: lang === 'en' ? 'View' : 'Angalia',
      actionRight: lang === 'en' ? 'Unverify' : 'Batilisha'
    }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: activeColors.background }}>
      <AdminHeader title={lang === 'en' ? 'User Management' : 'Usimamizi wa Watumiaji'} />

      <ScrollView style={styles.scrollBody} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        
        {/* 1. Search Component Area */}
        <View style={[styles.searchWrapper, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput 
            style={[styles.inputField, { color: activeColors.text }]}
            placeholder={lang === 'en' ? 'Search users by name or ID...' : 'Tafuta watumiaji kwa jina au ID...'}
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* 2. Segmented Pill Selection Matrix */}
        <View style={[styles.segmentedBar, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          {['All Users', 'Patients', 'Doctors'].map((tab, idx) => {
            const key = ['All', 'Patients', 'Doctors'][idx];
            const isSelected = activeSegment === key;
            return (
              <AnimatedButton
                key={key}
                style={[styles.segmentPill, isSelected && { backgroundColor: activeColors.primary }]}
                onPress={() => setActiveSegment(key)}
              >
                <Text style={[styles.segmentText, { color: isSelected ? '#FFF' : '#6B7280' }]}>
                  {lang === 'en' ? tab : (key === 'All' ? 'Wote' : key === 'Patients' ? 'Wagonjwa' : 'Madaktari')}
                </Text>
              </AnimatedButton>
            );
          })}
        </View>

        {/* 3. User Cards Rendering Container */}
        {platformUsers.map((user) => (
          <View key={user.id} style={[styles.userCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarEmoji}>{user.avatar}</Text>
                {user.status === 'online' && <View style={styles.onlineIndicatorPip} />}
              </View>
              
              <View style={styles.userInfoBlock}>
                <View style={styles.nameBadgeRow}>
                  <Text style={[styles.userNameText, { color: activeColors.text }]}>{user.name}</Text>
                  <View style={[styles.roleBadge, { backgroundColor: user.roleColor }]}>
                    <Text style={[styles.roleBadgeText, { color: user.roleTextColor }]}>{user.role}</Text>
                  </View>
                </View>
                <Text style={styles.userMetaText}>{user.meta}</Text>
              </View>
            </View>

            {/* Twin Action Row buttons */}
            <View style={styles.cardActionRow}>
              <AnimatedButton style={[styles.actionBtnLeft, { backgroundColor: activeColors.primary }]}>
                <Text style={styles.btnTextWhite}>{user.actionLeft}</Text>
              </AnimatedButton>
              <AnimatedButton style={[styles.actionBtnRight, { borderColor: '#EF4444' }]}>
                <Text style={styles.btnTextRed}>{user.actionRight}</Text>
              </AnimatedButton>
            </View>
          </View>
        ))}

        {/* 4. Metric Grid Summary blocks */}
        <View style={styles.metricsGrid}>
          <View style={[styles.metricBox, { backgroundColor: theme === 'light' ? '#F0FDF4' : activeColors.surface, borderColor: activeColors.border }]}>
            <Text style={[styles.metricValue, { color: '#16A34A' }]}>12,482</Text>
            <Text style={styles.metricLabel}>{lang === 'en' ? 'Total Users' : 'Watumiaji Wote'}</Text>
          </View>

          <View style={[styles.metricBox, { backgroundColor: theme === 'light' ? '#EFF6FF' : activeColors.surface, borderColor: activeColors.border }]}>
            <Text style={[styles.metricValue, { color: '#2563EB' }]}>142</Text>
            <Text style={styles.metricLabel}>{lang === 'en' ? 'Active Now' : 'Wapo Mtandaoni'}</Text>
          </View>

          <View style={[styles.metricBox, { backgroundColor: theme === 'light' ? '#F9FAFB' : activeColors.surface, borderColor: activeColors.border }]}>
            <Text style={[styles.metricValue, { color: activeColors.text }]}>24</Text>
            <Text style={styles.metricLabel}>{lang === 'en' ? 'New Today' : 'Wapya Leo'}</Text>
          </View>

          <View style={[styles.metricBox, { backgroundColor: theme === 'light' ? '#FEF2F2' : activeColors.surface, borderColor: activeColors.border }]}>
            <Text style={[styles.metricValue, { color: '#DC2626' }]}>8</Text>
            <Text style={styles.metricLabel}>{lang === 'en' ? 'Pending' : 'Wanaosubiri'}</Text>
          </View>
        </View>

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
  avatarContainer: { width: 46, height: 46, borderRadius: 23, backgroundColor: 'rgba(0,0,0,0.03)', alignItems: 'center', justifyContent: 'center', position: 'relative' },
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