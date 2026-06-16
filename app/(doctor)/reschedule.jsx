import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import { Translations } from '../../constants/language';
import DoctorHeader from '../../Components/doctor/doctor_header';
import DoctorFooter from '../../Components/doctor/admin_footer';


export default function RescheduleScreen() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const t = Translations[lang];
  const router = useRouter();
  
  // Extract parameters passed from the patient queue card
  const { patientId, patientName } = useLocalSearchParams();

  // Local state for tracking schedule slot adjustments
  const [selectedDate, setSelectedDate] = useState('Oct 26, 2023');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');

  const availableDates = ['Oct 26, 2023', 'Oct 27, 2023', 'Oct 28, 2023'];
  const availableTimes = ['09:00 AM', '11:00 AM', '02:30 PM', '04:00 PM'];

  const handleConfirmReschedule = () => {
    const title = lang === 'en' ? 'Confirm Reschedule' : 'Thibitisha Mabadiliko';
    const message = lang === 'en' 
      ? `Move consultation for ${patientName || 'Patient'} to ${selectedDate} at ${selectedTime}?`
      : `Sogeza miadi ya ${patientName || 'Mgonjwa'} kwenda ${selectedDate} saa ${selectedTime}?`;

    Alert.alert(
      title,
      message,
      [
        { text: lang === 'en' ? 'Cancel' : 'Ghairi', style: 'cancel' },
        { 
          text: 'OK', 
          onPress: () => {
            Alert.alert(
              lang === 'en' ? 'Success' : 'Imefanikiwa', 
              lang === 'en' ? 'Appointment updated successfully!' : 'Miadi imerekebishwa kikamilifu!'
            );
            router.back(); // Dismisses screen and navigates safely back to the queue dashboard
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeFillContainer, { backgroundColor: activeColors.background }]}>
      {/* Reusable Global Layout Header component */}
      <DoctorHeader title={lang === 'en' ? "Reschedule Appointment" : "Badili Miadi"} />

      <ScrollView contentContainerStyle={styles.scrollLayoutGapping} showsVerticalScrollIndicator={false}>
        
        {/* Patient Context Overview Card */}
        <View style={[styles.contextOverviewCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <Text style={[styles.sectionHeaderLabelText, { color: '#9CA3AF' }]}>
            {lang === 'en' ? 'PATIENT CONTEXT' : 'MUKTADHA WA MGONJWA'}
          </Text>
          <Text style={[styles.patientIdentityHeadlineTitle, { color: activeColors.text }]}>
            {patientName || 'Selected Patient'}
          </Text>
          <Text style={styles.patientMetaIdentificationSubtext}>
            Reference ID: {patientId || 'AFD-GENERIC-NODE'}
          </Text>
        </View>

        {/* Date Selection Grid Box */}
        <View style={styles.inputSegmentBlockWrapper}>
          <Text style={[styles.sectionHeaderLabelText, { color: activeColors.text, marginBottom: 10 }]}>
            {lang === 'en' ? 'Select New Consultation Date' : 'Chagua Tarehe Mpya ya Miadi'}
          </Text>
          <View style={styles.interactiveChipsFlexRowMatrix}>
            {availableDates.map((date) => {
              const isSelected = selectedDate === date;
              return (
                <TouchableOpacity 
                  key={date} 
                  style={[
                    styles.chipInteractiveCellButton, 
                    isSelected 
                      ? { backgroundColor: '#046A38', borderColor: '#046A38' } 
                      : { backgroundColor: activeColors.surface, borderColor: activeColors.border }
                  ]}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text style={[styles.chipInteractiveCellButtonLabelText, isSelected ? { color: '#FFF' } : { color: activeColors.text }]}>
                    {date}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Time Slot Selection Grid Box */}
        <View style={styles.inputSegmentBlockWrapper}>
          <Text style={[styles.sectionHeaderLabelText, { color: activeColors.text, marginBottom: 10 }]}>
            {lang === 'en' ? 'Select Available Time Slot' : 'Chagua Muda wa Miadi'}
          </Text>
          <View style={styles.interactiveChipsFlexRowMatrix}>
            {availableTimes.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <TouchableOpacity 
                  key={time} 
                  style={[
                    styles.chipInteractiveCellButton, 
                    isSelected 
                      ? { backgroundColor: '#046A38', borderColor: '#046A38' } 
                      : { backgroundColor: activeColors.surface, borderColor: activeColors.border }
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text style={[styles.chipInteractiveCellButtonLabelText, isSelected ? { color: '#FFF' } : { color: activeColors.text }]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Alert Context Notice Panel */}
        <View style={[styles.notificationAlertNoticeCallout, { backgroundColor: theme === 'dark' ? '#1F2937' : '#EFF6FF', borderColor: '#3B82F6' }]}>
          <Text style={[styles.notificationAlertNoticeCalloutBodyText, { color: theme === 'dark' ? '#9CA3AF' : '#1E40AF' }]}>
            {lang === 'en' 
              ? '💡 Rescheduling will automatically update the patient notification stream feed channel.' 
              : '💡 Kubadilisha muda kutatuma taarifa moja kwa moja kwenye mfumo wa mgonjwa.'}
          </Text>
        </View>

        {/* Master Confirmation Button Action Trigger */}
        <TouchableOpacity 
          style={styles.masterActionCommitSubmissionButton} 
          onPress={handleConfirmReschedule}
          activeOpacity={0.8}
        >
          <Text style={styles.masterActionCommitSubmissionButtonLabelText}>
            {lang === 'en' ? 'Confirm & Save Changes' : 'Thibitisha & Hifadhi Mabadiliko'}
          </Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Persistent Bottom Tab Shell Layout */}
      <DoctorFooter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeFillContainer: { flex: 1 },
  scrollLayoutGapping: { padding: 16, gap: 20 },
  contextOverviewCard: { padding: 16, borderRadius: 12, borderWidth: 1 },
  sectionHeaderLabelText: { fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  patientIdentityHeadlineTitle: { fontSize: 18, fontWeight: '800', marginTop: 6 },
  patientMetaIdentificationSubtext: { fontSize: 11, color: '#9CA3AF', marginTop: 3 },
  inputSegmentBlockWrapper: { width: '100%' },
  interactiveChipsFlexRowMatrix: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chipInteractiveCellButton: { paddingHorizontal: 14, paddingVertical: 12, borderRadius: 8, borderWidth: 1, minWidth: '47%', alignItems: 'center', justifyContent: 'center' },
  chipInteractiveCellButtonLabelText: { fontSize: 12, fontWeight: '700' },
  notificationAlertNoticeCallout: { padding: 12, borderRadius: 8, borderWidth: 1, marginTop: 4 },
  notificationAlertNoticeCalloutBodyText: { fontSize: 11, lineHeight: 16, fontWeight: '500' },
  masterActionCommitSubmissionButton: { backgroundColor: '#046A38', height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41 },
  masterActionCommitSubmissionButtonLabelText: { color: '#FFF', fontWeight: '700', fontSize: 14, letterSpacing: -0.1 }
});