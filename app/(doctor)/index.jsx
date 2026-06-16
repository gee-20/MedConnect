import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import { Translations } from '../../constants/language';
import DoctorHeader from '../../Components/doctor/doctor_header';
import DoctorFooter from '../../Components/doctor/admin_footer';
import AnimatedButton from '../../Components/AnimatedButton';

export default function DoctorDashboardMain() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const t = Translations[lang];
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safeFillContainer, { backgroundColor: activeColors.background }]}>
      <DoctorHeader title={t.dashboard} />
      
      <ScrollView contentContainerStyle={styles.scrollLayoutGapping} showsVerticalScrollIndicator={false}>
        <View style={styles.introContainerBlock}>
          <Text style={[styles.welcomeHeroTextTitle, { color: activeColors.text }]}>{t.welcome}</Text>
          <Text style={styles.subtextMetaRowDescription}>{t.subWelcome}</Text>
        </View>

        {/* Live Status Cards Grid Grid */}
        <View style={styles.metricGridTwoColumnFlexRow}>
          <View style={[styles.metricCardHousingFrame, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <Text style={styles.metricLabelOverheadHeader}>{t.queueCount}</Text>
            <Text style={[styles.metricHeroNumericalLabel, { color: activeColors.text }]}>12</Text>
            <Text style={styles.metricStatusFooterLabelSpan}>● 4 {t.waiting}</Text>
          </View>
          
          <View style={[styles.metricCardHousingFrame, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <Text style={styles.metricLabelOverheadHeader}>{t.earnings}</Text>
            <Text style={[styles.metricHeroNumericalLabel, { color: '#10B981', fontSize: 20, marginTop: 6 }]}>TZS 1.2M</Text>
            <Text style={styles.metricStatusFooterLabelSpan}>This Month</Text>
          </View>
        </View>

        {/* Action Panel Matrix Grid */}
        <Text style={[styles.sectionHeadingStandardTextLabel, { color: activeColors.text }]}>{t.quickActions}</Text>
        
        <AnimatedButton 
          style={[styles.quickActionButtonContainer, { backgroundColor: activeColors.primary }]} 
          onPress={() => router.push('/(doctor)/video_consult')}
        >
          <Text style={styles.quickActionWhiteLabelText}>📹  {t.startNewConsult}</Text>
        </AnimatedButton>

        <AnimatedButton 
          style={[styles.quickActionButtonContainer, { backgroundColor: activeColors.surface, borderWidth: 1, borderColor: activeColors.border }]} 
          onPress={() => router.push('/(doctor)/prescription')}
        >
          <Text style={[styles.quickActionWhiteLabelText, { color: activeColors.text }]}>📝  {t.writePrescription}</Text>
        </AnimatedButton>

        {/* Upcoming Patient Appointments Section List */}
        <Text style={[styles.sectionHeadingStandardTextLabel, { color: activeColors.text, marginTop: 12 }]}>{t.upcomingAppts}</Text>
        {[
          { name: 'Amani Juma', time: '14:30', issue: 'Chronic Migraine Review' },
          { name: 'Salome K.', time: '15:15', issue: 'Post-op Follow-up' }
        ].map((appt, idx) => (
          <View key={idx} style={[styles.patientConsultationAppointmentCardFrame, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <View style={styles.patientAvatarPlaceholderCircle}><Text style={{ fontSize: 14 }}>👤</Text></View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.patientNameMainLabelText, { color: activeColors.text }]}>{appt.name}</Text>
              <Text style={styles.patientIssueMetaDescriptionSubtext}>{appt.issue}</Text>
            </View>
            <Text style={[styles.appointmentScheduledTimeBadgeLabel, { color: activeColors.primary }]}>{appt.time}</Text>
          </View>
        ))}
      </ScrollView>

      <DoctorFooter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeFillContainer: { flex: 1 },
  scrollLayoutGapping: { padding: 16, paddingBottom: 40 },
  introContainerBlock: { marginBottom: 20 },
  welcomeHeroTextTitle: { fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  subtextMetaRowDescription: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  metricGridTwoColumnFlexRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  metricCardHousingFrame: { flex: 1, padding: 16, borderRadius: 14, borderWidth: 1 },
  metricLabelOverheadHeader: { fontSize: 11, fontWeight: '700', color: '#9CA3AF', letterSpacing: 0.2 },
  metricHeroNumericalLabel: { fontSize: 28, fontWeight: '800', marginTop: 4 },
  metricStatusFooterLabelSpan: { fontSize: 11, color: '#6B7280', marginTop: 4 },
  sectionHeadingStandardTextLabel: { fontSize: 14, fontWeight: '800', marginBottom: 12, letterSpacing: 0.3 },
  quickActionButtonContainer: { paddingVertical: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  quickActionWhiteLabelText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  patientConsultationAppointmentCardFrame: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, borderWidth: 1, marginBottom: 8 },
  patientAvatarPlaceholderCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.03)', alignItems: 'center', justifyContent: 'center' },
  patientNameMainLabelText: { fontSize: 14, fontWeight: '700' },
  patientIssueMetaDescriptionSubtext: { fontSize: 12, color: '#9CA3AF', marginTop: 1 },
  appointmentScheduledTimeBadgeLabel: { fontSize: 13, fontWeight: '700' }
});