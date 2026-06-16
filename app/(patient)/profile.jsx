import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import { Translations } from '../../constants/language';
import AnimatedButton from '../../Components/AnimatedButton';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { theme, lang, setLang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const t = Translations[lang];
  const router = useRouter();

  // Mock data representing historical/real-time feedback updates from the doctor dashboard context
  const [patientNotifications, setPatientNotifications] = useState([
    {
      id: 'p_notif_1',
      doctorName: 'Dr. David Mwemba',
      status: 'ACCEPTED', // ACCEPTED, REJECTED, RESCHEDULED
      timeLabel: 'Today, 09:00 AM',
      note: 'Please arrive 15 minutes before your slot.'
    },
    {
      id: 'p_notif_2',
      doctorName: 'Dr. David Mwemba',
      status: 'RESCHEDULED',
      timeLabel: 'Yesterday',
      note: 'Moved from 10:00 AM to 11:30 AM due to surgery.'
    },
    {
      id: 'p_notif_3',
      doctorName: 'Dr. Neema Swai',
      status: 'REJECTED',
      timeLabel: '2 days ago',
      note: 'Doctor unavailable. Please choose another day.'
    }
  ]);

  // Helper mapping matrix to output matching visibility status colors and badges
  const getStatusStyleDetails = (status) => {
    switch (status) {
      case 'ACCEPTED':
        return { label: lang === 'en' ? 'Accepted' : 'Imekubaliwa', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', icon: '✅' };
      case 'REJECTED':
        return { label: lang === 'en' ? 'Rejected' : 'Imekataliwa', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', icon: '❌' };
      case 'RESCHEDULED':
        return { label: lang === 'en' ? 'Rescheduled' : 'Imepangwa Tena', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', icon: '⏳' };
      default:
        return { label: status, color: '#9CA3AF', bg: 'rgba(156, 163, 175, 0.1)', icon: '🔔' };
    }
  };

  return (
    <SafeAreaView style={[styles.safeFillContainer, { backgroundColor: activeColors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollLayoutGapping} showsVerticalScrollIndicator={false}>
        
        {/* Core Header Section Title */}
        <Text style={[styles.headerTitle, { color: activeColors.text }]}>{t.profile}</Text>

        {/* Identity Summary Profile Card Box */}
        <View style={[styles.identitySummaryCardBox, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <Text style={styles.avatarInlineIconField}>👤</Text>
          <Text style={[styles.nameTagTitle, { color: activeColors.text }]}>Salome Kalonge</Text>
          <Text style={styles.userMetadataDetailsLabel}>salome.kalonge@example.tz</Text>
        </View>

        {/* --- SECTION 1: APPOINTMENTS NOTIFICATION PANEL --- */}
        <Text style={[styles.sectionHeadingTitleText, { color: activeColors.text }]}>
          {lang === 'en' ? 'Appointment Status Updates' : 'Hali ya Miadi Yako'}
        </Text>

        <View style={styles.notificationsGridVerticalStack}>
          {patientNotifications.map((notif) => {
            const statusConfig = getStatusStyleDetails(notif.status);
            return (
              <View 
                key={notif.id} 
                style={[styles.notificationCardCell, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}
              >
                <View style={styles.notificationCellTopRowLine}>
                  <Text style={[styles.doctorReferenceLabel, { color: activeColors.text }]}>
                    {notif.doctorName}
                  </Text>
                  
                  {/* Status Indicator Badge Frame */}
                  <View style={[styles.statusBadgePillFrame, { backgroundColor: statusConfig.bg }]}>
                    <Text style={[styles.statusBadgeTextLabel, { color: statusConfig.color }]}>
                      {statusConfig.icon} {statusConfig.label}
                    </Text>
                  </View>
                </View>

                <Text style={styles.timestampMetaTextLabel}>{notif.timeLabel}</Text>
                
                {notif.note && (
                  <Text style={[styles.doctorFeedbackNoteMessage, { color: activeColors.text }]}>
                    {notif.note}
                  </Text>
                )}
              </View>
            );
          })}
        </View>

        {/* --- SECTION 2: ACCOUNT SETTINGS MATRIX & LANGUAGE CHANGE --- */}
        <Text style={[styles.sectionHeadingTitleText, { color: activeColors.text, marginTop: 14 }]}>
          {lang === 'en' ? 'Account Settings' : 'Mipangilio ya Akaunti'}
        </Text>

        <View style={[styles.settingsContainerBlock, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          
          {/* Language Switch Row Controller */}
          <View style={styles.settingsRowItemCell}>
            <View style={styles.settingsRowItemLeftCluster}>
              <View style={[styles.settingsIconWrapperCircle, { backgroundColor: theme === 'dark' ? '#1F2937' : '#F3F4F6' }]}>
                <Text style={{ fontSize: 14 }}>🌐</Text>
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={[styles.settingsItemMainLabel, { color: activeColors.text }]}>
                  {lang === 'en' ? 'System Language' : 'Lugha ya Mfumo'}
                </Text>
                <Text style={styles.settingsItemSubtextMeta}>
                  {lang === 'en' ? 'English Language Active' : 'Kiswahili Kimechaguliwa'}
                </Text>
              </View>
            </View>

            {/* Language Switch Pill Option (Matches AfyaDirect Pro styles pattern) */}
            <View style={[styles.languageTogglePillFrame, { backgroundColor: theme === 'dark' ? '#1F2937' : '#E5E7EB' }]}>
              <TouchableOpacity 
                style={[styles.languageToggleHalfCell, lang === 'en' && { backgroundColor: '#10B981' }]} 
                onPress={() => setLang('en')}
              >
                <Text style={[styles.languageToggleText, lang === 'en' ? { color: '#FFF', fontWeight: '700' } : { color: '#6B7280' }]}>EN</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.languageToggleHalfCell, lang === 'sw' && { backgroundColor: '#10B981' }]} 
                onPress={() => setLang('sw')}
              >
                <Text style={[styles.languageToggleText, lang === 'sw' ? { color: '#FFF', fontWeight: '700' } : { color: '#6B7280' }]}>SW</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>

        {/* Core System Logout Execution Trigger */}
        <AnimatedButton 
          style={[styles.logoutActionButton, { backgroundColor: '#FEE2E2', borderWidth: 1, borderColor: '#FCA5A5' }]}
          onPress={() => router.replace('/(auth)/login')}
        >
          <Text style={styles.logoutActionLabelText}>
            🚪 {lang === 'en' ? 'Log Out' : 'Ondoka Kwenye Mfumo'}
          </Text>
        </AnimatedButton>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeFillContainer: { flex: 1 },
  scrollLayoutGapping: { padding: 20, paddingBottom: 40 },
  headerTitle: { fontSize: 24, fontWeight: '900', marginBottom: 18, letterSpacing: -0.5 },
  identitySummaryCardBox: { padding: 20, borderRadius: 16, borderWidth: 1, alignItems: 'center', marginBottom: 20 },
  avatarInlineIconField: { fontSize: 50, marginBottom: 8 },
  nameTagTitle: { fontSize: 18, fontWeight: '800', letterSpacing: -0.2 },
  userMetadataDetailsLabel: { color: '#9CA3AF', fontSize: 13, marginTop: 2 },
  
  // Section Typography Styles
  sectionHeadingTitleText: { fontSize: 14, fontWeight: '800', marginBottom: 10, paddingLeft: 2 },
  
  // Notification Layout Subcomponents
  notificationsGridVerticalStack: { gap: 10, marginBottom: 20 },
  notificationCardCell: { padding: 14, borderRadius: 12, borderWidth: 1, gap: 4 },
  notificationCellTopRowLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  doctorReferenceLabel: { fontSize: 13, fontWeight: '700' },
  statusBadgePillFrame: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusBadgeTextLabel: { fontSize: 11, fontWeight: '800' },
  timestampMetaTextLabel: { fontSize: 10, color: '#9CA3AF' },
  doctorFeedbackNoteMessage: { fontSize: 11, opacity: 0.8, lineHeight: 15, marginTop: 2 },

  // Settings Layout Styles Block
  settingsContainerBlock: { borderRadius: 14, borderWidth: 1, overflow: 'hidden', marginBottom: 24 },
  settingsRowItemCell: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14 },
  settingsRowItemLeftCluster: { flexDirection: 'row', alignItems: 'center' },
  settingsIconWrapperCircle: { width: 34, height: 34, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  settingsItemMainLabel: { fontSize: 13, fontWeight: '700' },
  settingsItemSubtextMeta: { fontSize: 11, color: '#9CA3AF', marginTop: 1 },

  // Brand Standard Language Switcher Pill Frame
  languageTogglePillFrame: { flexDirection: 'row', borderRadius: 6, padding: 2, width: 90, height: 32 },
  languageToggleHalfCell: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 4 },
  languageToggleText: { fontSize: 11, fontWeight: '700' },

  // Action Triggers
  logoutActionButton: { height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  logoutActionLabelText: { color: '#DC2626', fontWeight: '700', fontSize: 14 }
});