// import React, { useContext } from 'react';
// import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
// import { AppContext } from '../_layout';
// import { Colors } from '../../constants/colors';
// import { Translations } from '../../constants/language';
// import AnimatedButton from '../../Components/AnimatedButton';
// import { useRouter } from 'expo-router';

// export default function PatientDashboard() {
//   const { theme, lang } = useContext(AppContext);
//   const activeColors = Colors[theme];
//   const t = Translations[lang];
//   const router = useRouter();

//   const recommendedDoctors = [
//     { id: '1', name: 'Dr. Kwesi Mensah', specialty: 'Senior Cardiologist', rate: 'TZS 35,000', rating: '⭐ 4.9' },
//     { id: '2', name: 'Dr. Juma Ally', specialty: 'General Practitioner', rate: 'TZS 20,000', rating: '⭐ 4.7' }
//   ];

//   return (
//     <ScrollView style={[styles.container, { backgroundColor: activeColors.background }]}>
//       {/* Welcome Banner */}
//       <View style={[styles.welcomeCard, { backgroundColor: activeColors.primary }]}>
//         <Text style={styles.greeting}>Habari, Salome</Text>
//         <Text style={styles.subGreeting}>Feeling unwell? Connect instantly with our standby medical team.</Text>
//         <AnimatedButton 
//           style={styles.consultBtn} 
//           onPress={() => router.push('/(patient)/book_consultation')}
//         >
//           <Text style={[styles.consultBtnText, { color: activeColors.primary }]}>⚡ Talk to a Doctor Now</Text>
//         </AnimatedButton>
//       </View>

//       {/* Quick Access Grid */}
//       <Text style={[styles.sectionTitle, { color: activeColors.text }]}>Quick Actions</Text>
//       <View style={styles.gridRow}>
//         <AnimatedButton style={[styles.gridCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
//           <Text style={styles.gridIcon}>📅</Text>
//           <Text style={[styles.gridLabel, { color: activeColors.text }]}>Book Consult</Text>
//         </AnimatedButton>
//         <AnimatedButton style={[styles.gridCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
//           <Text style={styles.gridIcon}>💊</Text>
//           <Text style={[styles.gridLabel, { color: activeColors.text }]}>Prescriptions</Text>
//         </AnimatedButton>
//       </View>

//       {/* Recommended Section */}
//       <Text style={[styles.sectionTitle, { color: activeColors.text }]}>Recommended Doctors</Text>
//       {recommendedDoctors.map((doc) => (
//         <View key={doc.id} style={[styles.docCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
//           <View style={styles.docAvatarPlaceholder}>
//             <Text style={styles.avatarText}>{doc.name.charAt(4)}</Text>
//           </View>
//           <View style={styles.docInfo}>
//             <Text style={[styles.docName, { color: activeColors.text }]}>{doc.name}</Text>
//             <Text style={styles.docSpecialty}>{doc.specialty}</Text>
//             <Text style={[styles.docRate, { color: activeColors.primary }]}>{doc.rate} / session</Text>
//           </View>
//           <View style={styles.rightInfo}>
//             <Text style={styles.ratingText}>{doc.rating}</Text>
//             <AnimatedButton 
//               style={[styles.bookSmallBtn, { backgroundColor: activeColors.primary }]}
//               onPress={() => router.push({ pathname: '/(patient)/doctor_profile', params: { id: doc.id }})}
//             >
//               <Text style={styles.bookSmallText}>View</Text>
//             </AnimatedButton>
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   welcomeCard: { padding: 20, borderRadius: 20, marginBottom: 24, marginTop: 10 },
//   greeting: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
//   subGreeting: { color: '#E2E8F0', fontSize: 14, marginTop: 6, marginBottom: 16, lineHeight: 20 },
//   consultBtn: { backgroundColor: '#FFF', padding: 14, borderRadius: 12, alignItems: 'center' },
//   consultBtnText: { fontWeight: 'bold', fontSize: 15 },
//   sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 14 },
//   gridRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
//   gridCard: { flex: 1, padding: 16, borderRadius: 16, borderWidth: 1, alignItems: 'center' },
//   gridIcon: { fontSize: 24, marginBottom: 8 },
//   gridLabel: { fontSize: 14, fontWeight: '600' },
//   docCard: { flexDirection: 'row', padding: 14, borderRadius: 16, borderWidth: 1, marginBottom: 12, alignItems: 'center' },
//   docAvatarPlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#D1FAE5', justifyContent: 'center', alignItems: 'center' },
//   avatarText: { fontWeight: 'bold', color: '#0F766E' },
//   docInfo: { flex: 1, marginLeft: 12 },
//   docName: { fontSize: 16, fontWeight: 'bold' },
//   docSpecialty: { color: '#6B7280', fontSize: 13, marginTop: 2 },
//   docRate: { fontSize: 13, fontWeight: '600', marginTop: 4 },
//   rightInfo: { alignItems: 'flex-end', justifyContent: 'space-between', height: '100%', minHeight: 50 },
//   ratingText: { fontSize: 13, fontWeight: 'bold', color: '#F59E0B' },
//   bookSmallBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginTop: 6 },
//   bookSmallText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' }
// });


import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import { Translations } from '../../constants/language';
import AnimatedButton from '../../Components/AnimatedButton';

export default function PatientDashboard() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const t = Translations[lang];

  return (
    <ScrollView style={[styles.mainScrollContainer, { backgroundColor: activeColors.background }]}>
      <View style={styles.topProfileSummaryRow}>
        <View>
          <Text style={[styles.userNameTitle, { color: activeColors.text }]}>Hi, Salome</Text>
          <Text style={styles.dateSub}>How are you feeling today?</Text>
        </View>
        <Text style={styles.userAvatarEmoji}>👤</Text>
      </View>

      {/* AI Symptoms Diagnostic Banner Panel */}
      <View style={styles.aiSymptomsDiagnosticBannerCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerHeadlineText}>{t.feelingUnwell}</Text>
          <Text style={styles.bannerSecondaryText}>{t.checkSymptoms}</Text>
          <AnimatedButton style={styles.bannerInteractiveActionBtn}>
            <Text style={styles.bannerBtnLabelText}>{t.checkNow}</Text>
          </AnimatedButton>
        </View>
        <Text style={styles.bannerDecorIcon}>🧠</Text>
      </View>

      {/* Recommended Doctors Layout Module Array */}
      <View style={styles.sectionHeaderRowFlex}>
        <Text style={[styles.sectionHeadingText, { color: activeColors.text }]}>{t.recommendedDoctors}</Text>
        <Text style={{ color: activeColors.primary, fontWeight: '600' }}>{t.seeAll}</Text>
      </View>

      {/* Single Unified Healthcare Practitioner Block layout token */}
      <View style={[styles.practitionerCardItem, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
        <Text style={styles.docImgPlaceholder}>🩺</Text>
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text style={[styles.docNameTitle, { color: activeColors.text }]}>Dr. Juma Bakari</Text>
          <Text style={styles.docCategorySubText}>General Physician • 12 yrs exp</Text>
          <Text style={[styles.docPricingDetailsTag, { color: activeColors.primary }]}>TZS 35,000</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainScrollContainer: { flex: 1, padding: 20, paddingTop: 60 },
  topProfileSummaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  userNameTitle: { fontSize: 22, fontWeight: 'bold' },
  dateSub: { color: '#9CA3AF', fontSize: 14, marginTop: 2 },
  userAvatarEmoji: { fontSize: 32 },
  aiSymptomsDiagnosticBannerCard: { backgroundColor: '#0F766E', padding: 20, borderRadius: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 28 },
  bannerHeadlineText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  bannerSecondaryText: { color: '#E2E8F0', fontSize: 13, marginTop: 4, marginBottom: 16, lineHeight: 18 },
  bannerInteractiveActionBtn: { backgroundColor: '#FFF', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, alignSelf: 'flex-start' },
  bannerBtnLabelText: { color: '#0F766E', fontWeight: 'bold', fontSize: 13 },
  bannerDecorIcon: { fontSize: 50, opacity: 0.15 },
  sectionHeaderRowFlex: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionHeadingText: { fontSize: 16, fontWeight: '700' },
  practitionerCardItem: { flexDirection: 'row', padding: 16, borderRadius: 14, borderWidth: 1, alignItems: 'center' },
  docImgPlaceholder: { fontSize: 36, padding: 8, backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: 12 },
  docNameTitle: { fontSize: 16, fontWeight: 'bold' },
  docCategorySubText: { color: '#9CA3AF', fontSize: 13, marginTop: 2 },
  docPricingDetailsTag: { fontSize: 14, fontWeight: '700', marginTop: 6 }
});