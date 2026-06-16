import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import DoctorHeader from '../../Components/doctor/doctor_header';
import DoctorFooter from '../../Components/doctor/admin_footer';

export default function NotificationsScreen() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const router = useRouter();

  // Mock data representing platform appointment creation signals
  const [notificationsList, setNotificationsList] = useState([
    {
      id: 'n1',
      type: 'APPOINTMENT_BOOKED',
      patientName: 'Juma Maziku',
      metaInfo: 'Severe chest pain, Shortness of breath',
      timestamp: '5 mins ago',
      isUnread: true
    },
    {
      id: 'n2',
      type: 'APPOINTMENT_BOOKED',
      patientName: 'Elias Mwangi',
      metaInfo: 'Post-surgery review (Stent)',
      timestamp: '25 mins ago',
      isUnread: true
    },
    {
      id: 'n3',
      type: 'APPOINTMENT_RESCHEDULED',
      patientName: 'Amina Khalfan',
      metaInfo: 'Moved from 10:00 AM to 10:30 AM',
      timestamp: '2 hours ago',
      isUnread: false
    }
  ]);

  const handleMarkAllAsRead = () => {
    setNotificationsList(prev => prev.map(item => ({ ...item, isUnread: false })));
    Alert.alert(
      lang === 'en' ? 'Updated' : 'Imesafishwa',
      lang === 'en' ? 'All alerts marked as read.' : 'Taarifa zote zimewekwa alama ya kusomwa.'
    );
  };

  const handleNotificationActionTap = (notification) => {
    // Automatically flag item as read when interacted with
    setNotificationsList(prev => 
      prev.map(item => item.id === notification.id ? { ...item, isUnread: false } : item)
    );
    
    // Route doctor straight to queue dashboard workspace to take real action
    Alert.alert(
      lang === 'en' ? 'Incoming Booking View' : 'Angalia Uhifadhi',
      lang === 'en' ? `Opening lifecycle panel context for ${notification.patientName}` : `Inafungua muktadha wa ${notification.patientName}`,
      [
        { text: 'OK', onPress: () => router.push('/(doctor)/queue') }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeFillViewContainer, { backgroundColor: activeColors.background }]}>
      <DoctorHeader title={lang === 'en' ? "System Alerts" : "Taarifa za Mfumo"} />

      <ScrollView contentContainerStyle={styles.scrollLayoutGapping} showsVerticalScrollIndicator={false}>
        
        {/* Header Summary Tool Row */}
        <View style={styles.metaToolActionBarSummaryRow}>
          <Text style={[styles.summaryHeadlineTextLabel, { color: activeColors.text }]}>
            {lang === 'en' ? 'Recent Appointments Activity' : 'Shughuli za Miadi ya Karibuni'}
          </Text>
          {notificationsList.some(n => n.isUnread) && (
            <TouchableOpacity onPress={handleMarkAllAsRead}>
              <Text style={styles.clearAllTextButtonLink}>
                {lang === 'en' ? 'Mark read' : 'Soma zote'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Empty State Fallback Layout */}
        {notificationsList.length === 0 && (
          <View style={styles.emptyFeedPlaceholderCenterBox}>
            <Text style={{ fontSize: 32, marginBottom: 8 }}>📭</Text>
            <Text style={{ color: '#9CA3AF', fontSize: 13, fontWeight: '600' }}>
              {lang === 'en' ? 'No system notifications found.' : 'Hakuna taarifa mpya kwa sasa.'}
            </Text>
          </View>
        )}

        {/* Feed Notifications Loop Matrix Render */}
        {notificationsList.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationFeedCardCellWrapper,
              { 
                backgroundColor: activeColors.surface, 
                borderColor: notification.isUnread ? '#046A38' : activeColors.border,
                borderLeftWidth: notification.isUnread ? 4 : 1
              }
            ]}
            onPress={() => handleNotificationActionTap(notification)}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeaderFlexBoxRow}>
              <View style={styles.iconIndicatorCircleBadgeFrame}>
                <Text style={{ fontSize: 14 }}>
                  {notification.type === 'APPOINTMENT_BOOKED' ? '📅' : '⏳'}
                </Text>
              </View>
              
              <View style={styles.cardContentInformationTextColumn}>
                <View style={styles.titleAndTimestampHeaderInlineFlexRow}>
                  <Text style={[styles.notificationAlertContextHeadlineTextLabel, { color: activeColors.text }]}>
                    {notification.type === 'APPOINTMENT_BOOKED' 
                      ? (lang === 'en' ? 'New Appointment Request' : 'Ombi Jipya la Miadi')
                      : (lang === 'en' ? 'Appointment Modified' : 'Miadi Imerebreshwa')}
                  </Text>
                  <Text style={styles.timestampMetaLabelSpanText}>{notification.timestamp}</Text>
                </View>

                <Text style={[styles.patientTargetReferenceHighlightSpan, { color: '#046A38' }]}>
                  {notification.patientName}
                </Text>

                <Text style={[styles.medicalSummaryDetailDescriptionLine, { color: activeColors.text }]}>
                  {notification.metaInfo}
                </Text>
                
                {notification.isUnread && (
                  <Text style={styles.actionPromptIndicatorHintBadgeSpanText}>
                    {lang === 'en' ? '➔ Tap to review or accept request' : '➔ Gusa ili ukubali ombi'}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>

      {/* Persistent Bottom Tab Engine */}
      <DoctorFooter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeFillViewContainer: { flex: 1 },
  scrollLayoutGapping: { padding: 14, paddingBottom: 80, gap: 12 },
  metaToolActionBarSummaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, marginBottom: 4 },
  summaryHeadlineTextLabel: { fontSize: 13, fontWeight: '800', letterSpacing: -0.1 },
  clearAllTextButtonLink: { fontSize: 12, color: '#046A38', fontWeight: '700' },
  emptyFeedPlaceholderCenterBox: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  notificationFeedCardCellWrapper: { padding: 14, borderRadius: 10, borderWidth: 1, position: 'relative' },
  cardHeaderFlexBoxRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  iconIndicatorCircleBadgeFrame: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
  cardContentInformationTextColumn: { flex: 1, gap: 2 },
  titleAndTimestampHeaderInlineFlexRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  notificationAlertContextHeadlineTextLabel: { fontSize: 12, fontWeight: '800' },
  timestampMetaLabelSpanText: { fontSize: 10, color: '#9CA3AF' },
  patientTargetReferenceHighlightSpan: { fontSize: 13, fontWeight: '700', marginTop: 2 },
  medicalSummaryDetailDescriptionLine: { fontSize: 11, lineHeight: 15, opacity: 0.8 },
  actionPromptIndicatorHintBadgeSpanText: { fontSize: 10, fontWeight: '700', color: '#10B981', marginTop: 6 }
});