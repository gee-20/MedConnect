import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import { Translations } from '../../constants/language';
import DoctorHeader from '../../Components/doctor/doctor_header';
import DoctorFooter from '../../Components/doctor/admin_footer';

export default function PatientQueueScreen() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const t = Translations[lang];
  const router = useRouter();

  const [activeTabSegment, setActiveTabSegment] = useState('waiting');

  // Added dynamic 'status' state allocation to track local action interactions
  const [queueDataList, setQueueDataList] = useState([
    { 
      id: '1', 
      initials: 'JM', 
      name: 'Juma Maziku', 
      age: '45 Years', 
      gender: 'Male',
      issue: 'Severe chest pain, Shortness of breath',
      timeSlot: '09:45 AM',
      delayStatus: '(Delayed)',
      priority: 'URGENT',
      colorTheme: '#EF4444',
      status: 'PENDING' // Initial state requires approval
    },
    { 
      id: '2', 
      initials: 'AK', 
      name: 'Amina Khalfan', 
      age: '29 Years', 
      gender: 'Female',
      issue: 'Routine prenatal follow-up',
      timeSlot: '10:30 AM',
      delayStatus: '(In 15m)',
      priority: 'STABLE',
      colorTheme: '#10B981',
      status: 'ACCEPTED' // Pre-accepted for immediate call access
    },
    { 
      id: '3', 
      initials: 'EM', 
      name: 'Elias Mwangi', 
      age: '52 Years', 
      gender: 'Male',
      issue: 'Post-surgery review (Stent)',
      timeSlot: '11:00 AM',
      delayStatus: '',
      priority: 'FOLLOW-UP',
      colorTheme: '#3B82F6',
      status: 'PENDING'
    }
  ]);

  const laterTodayAgendaList = [
    { id: 't1', initials: 'SN', name: 'Sarah Njau', service: 'High Blood Pressure Check', time: '01:30 PM', status: 'Confirmed' },
    { id: 't2', initials: 'DK', name: 'David Kimani', service: 'Annual Physical', time: '02:15 PM', status: 'Confirmed' }
  ];

  // Action Handler: Accept Appointment Lifecycle
  const handleAcceptAppointment = (id, name) => {
    setQueueDataList(prevList => 
      prevList.map(item => item.id === id ? { ...item, status: 'ACCEPTED' } : item)
    );
    Alert.alert(
      lang === 'en' ? 'Appointment Accepted' : 'Miadi Imekubaliwa',
      lang === 'en' ? `You can now initiate the consultation session with ${name}.` : `Sasa unaweza kuanza miadi na ${name}.`
    );
  };

  // Action Handler: Reject/Cancel Appointment Lifecycle
  const handleRejectAppointment = (id, name) => {
    Alert.alert(
      lang === 'en' ? 'Reject Appointment?' : 'Kataa Miadi?',
      lang === 'en' ? `Are you sure you want to reject the appointment for ${name}?` : `Je, una uhakika unataka kukataa miadi ya ${name}?`,
      [
        { text: lang === 'en' ? 'Cancel' : 'Ghairi', style: 'cancel' },
        { 
          text: lang === 'en' ? 'Reject' : 'Kataa', 
          style: 'destructive',
          onPress: () => {
            setQueueDataList(prevList => 
              prevList.map(item => item.id === id ? { ...item, status: 'REJECTED' } : item)
            );
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeFillContainer, { backgroundColor: activeColors.background }]}>
      <DoctorHeader title={t.queue} />

      <ScrollView contentContainerStyle={styles.scrollLayoutGapping} showsVerticalScrollIndicator={false}>
        
        <View style={styles.titleContextBlockHeader}>
          <Text style={[styles.mainScreenTitleText, { color: activeColors.text }]}>Patient Queue</Text>
          <Text style={styles.subtitleDateMetaSpan}>Tuesday, Oct 24 • Active Lifecycle Actions</Text>
        </View>

        {/* Tab switch component wrapper segment */}
        <View style={[styles.tabSegmentContainerRow, { backgroundColor: theme === 'dark' ? '#1F2937' : '#F3F4F6' }]}>
          <TouchableOpacity style={[styles.segmentInteractiveCellButton, activeTabSegment === 'waiting' && styles.segmentActiveInteractiveCellButton]} onPress={() => setActiveTabSegment('waiting')}>
            <Text style={[styles.segmentCellLabelText, activeTabSegment === 'waiting' ? { color: '#10B981', fontWeight: '700' } : { color: '#6B7280' }]}>Waiting{"\n"}(8)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.segmentInteractiveCellButton, activeTabSegment === 'progress' && styles.segmentActiveInteractiveCellButton]} onPress={() => setActiveTabSegment('progress')}>
            <Text style={[styles.segmentCellLabelText, activeTabSegment === 'progress' ? { color: activeColors.text, fontWeight: '700' } : { color: '#6B7280' }]}>In Progress{"\n"}(1)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.segmentInteractiveCellButton, activeTabSegment === 'completed' && styles.segmentActiveInteractiveCellButton]} onPress={() => setActiveTabSegment('completed')}>
            <Text style={[styles.segmentCellLabelText, activeTabSegment === 'completed' ? { color: activeColors.text, fontWeight: '700' } : { color: '#6B7280' }]}>Completed{"\n"}(3)</Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic Card Generation Mapping */}
        {queueDataList.map((patient) => (
          <View 
            key={patient.id} 
            style={[
              styles.queueCardContainer, 
              { 
                backgroundColor: activeColors.surface, 
                borderColor: patient.status === 'REJECTED' ? activeColors.border : (patient.priority === 'URGENT' ? '#EF4444' : activeColors.border),
                opacity: patient.status === 'REJECTED' ? 0.5 : 1
              }
            ]}
          >
            <View style={[styles.priorityRibbonBadgeHeaderTag, { backgroundColor: patient.status === 'REJECTED' ? '#9CA3AF' : patient.colorTheme }]}>
              <Text style={styles.priorityRibbonBadgeHeaderTagLabelText}>
                {patient.status === 'REJECTED' ? 'REJECTED' : patient.priority}
              </Text>
            </View>

            <View style={styles.queueCardHeaderRow}>
              <View style={[styles.avatarInitialsCircleWrapperNode, { backgroundColor: patient.status === 'REJECTED' ? '#E5E7EB' : `${patient.colorTheme}15` }]}>
                <Text style={[styles.avatarInitialsTextValue, { color: patient.status === 'REJECTED' ? '#9CA3AF' : patient.colorTheme }]}>{patient.initials}</Text>
              </View>
              <View style={styles.patientMetaTextIdentityColumnBox}>
                <Text style={[styles.patientNameTextLabelTitle, { color: activeColors.text }]}>{patient.name}</Text>
                <Text style={styles.patientMetaSubtextDescriptionLine}>{patient.age} • {patient.gender}</Text>
              </View>
            </View>

            <View style={[styles.symptomsBoxFrame, { backgroundColor: theme === 'dark' ? '#111827' : '#F9FAFB' }]}>
              <Text style={styles.symptomsHeaderLabel}>Symptoms</Text>
              <Text style={[styles.symptomsBodyText, { color: activeColors.text }]}>{patient.issue}</Text>
            </View>

            <View style={styles.timeScheduleLabelRowInfoBlock}>
              <Text style={[styles.timeScheduleLabelRowInfoBlockTextSpan, { color: patient.status === 'REJECTED' ? '#9CA3AF' : (patient.priority === 'URGENT' ? '#EF4444' : '#10B981') }]}>
                🕒 {patient.timeSlot} {patient.delayStatus}
              </Text>
            </View>

            {/* DYNAMIC ACTION CONTROL LAYER */}
            <View style={styles.actionButtonColumnContainerGrid}>
              {patient.status === 'PENDING' && (
                <View style={styles.dualGridRowActionButtonFrameFlexBox}>
                  {/* Accept Appointment Control Trigger Button */}
                  <TouchableOpacity 
                    style={[styles.splitSecondaryActionCellButton, { backgroundColor: '#046A38', borderColor: '#046A38' }]}
                    onPress={() => handleAcceptAppointment(patient.id, patient.name)}
                  >
                    <Text style={[styles.splitSecondaryActionCellButtonLabelText, { color: '#FFF' }]}>
                      {lang === 'en' ? 'Accept ✅' : 'Kubali ✅'}
                    </Text>
                  </TouchableOpacity>

                  {/* Reject Appointment Control Trigger Button */}
                  <TouchableOpacity 
                    style={[styles.splitSecondaryActionCellButton, { backgroundColor: '#FEE2E2', borderColor: '#FCA5A5' }]}
                    onPress={() => handleRejectAppointment(patient.id, patient.name)}
                  >
                    <Text style={[styles.splitSecondaryActionCellButtonLabelText, { color: '#DC2626' }]}>
                      {lang === 'en' ? 'Reject ❌' : 'Kataa ❌'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {patient.status === 'ACCEPTED' && (
                <>
                  <TouchableOpacity 
                    style={[styles.primaryActionCallInteractiveButtonCell, { backgroundColor: patient.priority === 'URGENT' ? '#EF4444' : '#046A38' }]}
                    onPress={() => router.push({ pathname: '/(doctor)/video_consult', params: { patientName: patient.name } })}
                  >
                    <Text style={styles.primaryActionCallInteractiveButtonCellLabelText}>📹 Join Call</Text>
                  </TouchableOpacity>

                  <View style={styles.dualGridRowActionButtonFrameFlexBox}>
                    <TouchableOpacity 
                      style={[styles.splitSecondaryActionCellButton, { borderColor: activeColors.border }]}
                      onPress={() => router.push('/(doctor)/records')}
                    >
                      <Text style={[styles.splitSecondaryActionCellButtonLabelText, { color: activeColors.text }]}>Records</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={[styles.splitSecondaryActionCellButton, { borderColor: activeColors.border }]}
                      onPress={() => router.push({
                        pathname: '/(doctor)/reschedule',
                        params: { patientId: patient.id, patientName: patient.name }
                      })}
                    >
                      <Text style={[styles.splitSecondaryActionCellButtonLabelText, { color: activeColors.text }]}>Reschedule</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {patient.status === 'REJECTED' && (
                <View style={[styles.primaryActionCallInteractiveButtonCell, { backgroundColor: '#E5E7EB' }]}>
                  <Text style={{ color: '#9CA3AF', fontSize: 11, fontWeight: '700' }}>
                    {lang === 'en' ? 'Appointment Cancelled/Rejected' : 'Miadi Imekataliwa'}
                  </Text>
                </View>
              )}
            </View>

          </View>
        ))}

        {/* Later Today Context Panel */}
        <View style={styles.laterTodayHeaderRowFlexLine}>
          <Text style={[styles.laterTodayHeaderTitleLabel, { color: activeColors.text }]}>Later Today</Text>
          <TouchableOpacity onPress={() => Alert.alert('Timeline Log', 'Displaying schedule timeline...')}>
            <Text style={styles.viewAllShortcutTextLinkAction}>View All ➔</Text>
          </TouchableOpacity>
        </View>

        {laterTodayAgendaList.map((agendaItem) => (
          <View key={agendaItem.id} style={[styles.agendaItemRowContainerCell, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <View style={styles.agendaItemLeftMetaRowBlockGroup}>
              <View style={styles.agendaInitialsSquareBoxAvatarFrame}>
                <Text style={styles.agendaInitialsSquareBoxAvatarFrameTextValue}>{agendaItem.initials}</Text>
              </View>
              <View style={styles.agendaDescriptionTextHousingDetailsColumn}>
                <Text style={[styles.agendaItemPatientNameTitleLabel, { color: activeColors.text }]}>{agendaItem.name}</Text>
                <Text style={styles.agendaItemPatientServiceMetaSubtitleDescription}>{agendaItem.service}</Text>
                <View style={styles.agendaItemInnerStatusTimestampRowFlex}>
                  <Text style={styles.agendaItemTimeLabelTextSpan}>Time: <Text style={{fontWeight: '700', color: activeColors.text}}>{agendaItem.time}</Text></Text>
                  <Text style={styles.agendaItemStatusLabelTextSpan}>Status: <Text style={{fontWeight: '700', color: '#E67E22'}}>{agendaItem.status}</Text></Text>
                </View>
              </View>
            </View>
          </View>
        ))}

      </ScrollView>

      <TouchableOpacity style={styles.floatingActionButtonCircularTrigger} onPress={() => router.push('/(doctor)/prescription')}>
        <Text style={styles.floatingActionButtonCircularTriggerGlyphIconText}>+</Text>
      </TouchableOpacity>

      <DoctorFooter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeFillContainer: { flex: 1 },
  scrollLayoutGapping: { padding: 14, paddingBottom: 60 },
  titleContextBlockHeader: { marginBottom: 14, marginTop: 4 },
  mainScreenTitleText: { fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
  subtitleDateMetaSpan: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  tabSegmentContainerRow: { flexDirection: 'row', borderRadius: 10, padding: 4, marginBottom: 16 },
  segmentInteractiveCellButton: { flex: 1, paddingVertical: 6, alignItems: 'center', justifyContent: 'center', borderRadius: 8 },
  segmentActiveInteractiveCellButton: { backgroundColor: '#FFF', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1 },
  segmentCellLabelText: { fontSize: 10, textAlign: 'center', lineHeight: 14, fontWeight: '500' },
  queueCardContainer: { borderRadius: 12, padding: 14, marginBottom: 16, position: 'relative', overflow: 'hidden', borderWidth: 1 },
  priorityRibbonBadgeHeaderTag: { position: 'absolute', top: 0, right: 0, paddingHorizontal: 10, paddingVertical: 3, borderBottomLeftRadius: 8 },
  priorityRibbonBadgeHeaderTagLabelText: { color: '#FFF', fontSize: 8, fontWeight: '800', letterSpacing: 0.4 },
  queueCardHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  avatarInitialsCircleWrapperNode: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarInitialsTextValue: { fontSize: 14, fontWeight: '700' },
  patientMetaTextIdentityColumnBox: { flex: 1 },
  patientNameTextLabelTitle: { fontSize: 15, fontWeight: '700' },
  patientMetaSubtextDescriptionLine: { fontSize: 11, color: '#6B7280', marginTop: 1 },
  symptomsBoxFrame: { borderRadius: 8, padding: 10, marginTop: 12 },
  symptomsHeaderLabel: { fontSize: 9, fontWeight: '700', color: '#9CA3AF', marginBottom: 2 },
  symptomsBodyText: { fontSize: 12, lineHeight: 16 },
  timeScheduleLabelRowInfoBlock: { marginTop: 10, marginBottom: 4 },
  timeScheduleLabelRowInfoBlockTextSpan: { fontSize: 11, fontWeight: '700' },
  actionButtonColumnContainerGrid: { gap: 8, marginTop: 10 },
  primaryActionCallInteractiveButtonCell: { paddingVertical: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  primaryActionCallInteractiveButtonCellLabelText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  dualGridRowActionButtonFrameFlexBox: { flexDirection: 'row', gap: 8, width: '100%' },
  splitSecondaryActionCellButton: { flex: 1, paddingVertical: 10, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  splitSecondaryActionCellButtonLabelText: { fontSize: 11, fontWeight: '700' },
  laterTodayHeaderRowFlexLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, marginBottom: 12 },
  laterTodayHeaderTitleLabel: { fontSize: 15, fontWeight: '800' },
  viewAllShortcutTextLinkAction: { fontSize: 11, color: '#10B981', fontWeight: '700' },
  agendaItemRowContainerCell: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 12, borderWidth: 1, padding: 12, marginBottom: 10 },
  agendaItemLeftMetaRowBlockGroup: { flexDirection: 'row', gap: 10, flex: 1 },
  agendaInitialsSquareBoxAvatarFrame: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  agendaInitialsSquareBoxAvatarFrameTextValue: { fontSize: 12, fontWeight: '700', color: '#4B5563' },
  agendaDescriptionTextHousingDetailsColumn: { flex: 1 },
  agendaItemPatientNameTitleLabel: { fontSize: 13, fontWeight: '700' },
  agendaItemPatientServiceMetaSubtitleDescription: { fontSize: 11, color: '#6B7280', marginTop: 1 },
  agendaItemInnerStatusTimestampRowFlex: { flexDirection: 'row', gap: 12, marginTop: 4 },
  agendaItemTimeLabelTextSpan: { fontSize: 10, color: '#6B7280' },
  agendaItemStatusLabelTextSpan: { fontSize: 10, color: '#6B7280' },
  floatingActionButtonCircularTrigger: { position: 'absolute', bottom: 80, right: 16, width: 46, height: 46, borderRadius: 23, backgroundColor: '#046A38', alignItems: 'center', justifyContent: 'center', elevation: 4 },
  floatingActionButtonCircularTriggerGlyphIconText: { color: '#FFF', fontSize: 22, fontWeight: '400', marginTop: -2 }
});