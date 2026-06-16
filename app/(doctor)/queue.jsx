import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
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

  // Active sub-tab state matching layout matrix
  const [activeTabSegment, setActiveTabSegment] = useState('waiting');

  const currentActiveQueueDataList = [
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
      colorTheme: '#EF4444' // Red color code theme
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
      colorTheme: '#10B981' // Emerald color code theme
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
      colorTheme: '#3B82F6' // Sky blue color code theme
    }
  ];

  const laterTodayAgendaList = [
    { id: 't1', initials: 'SN', name: 'Sarah Njau', service: 'High Blood Pressure Check', time: '01:30 PM', status: 'Confirmed' },
    { id: 't2', initials: 'DK', name: 'David Kimani', service: 'Annual Physical', time: '02:15 PM', status: 'Confirmed' }
  ];

  return (
    <SafeAreaView style={[styles.safeFillContainer, { backgroundColor: activeColors.background }]}>
      <DoctorHeader title={t.queue} />

      <ScrollView contentContainerStyle={styles.scrollLayoutGapping} showsVerticalScrollIndicator={false}>
        
        {/* Title block banner section matching image_a0dc76.png */}
        <View style={styles.titleContextBlockHeader}>
          <Text style={[styles.mainScreenTitleText, { color: activeColors.text }]}>Patient Queue</Text>
          <Text style={styles.subtitleDateMetaSpan}>Tuesday, Oct 24 • 12 Active Appointments</Text>
        </View>

        {/* Horizontal segment control tab cluster matrix */}
        <View style={[styles.tabSegmentContainerRow, { backgroundColor: theme === 'dark' ? '#1F2937' : '#F3F4F6' }]}>
          <TouchableOpacity 
            style={[styles.segmentInteractiveCellButton, activeTabSegment === 'waiting' && styles.segmentActiveInteractiveCellButton]} 
            onPress={() => setActiveTabSegment('waiting')}
          >
            <Text style={[styles.segmentCellLabelText, activeTabSegment === 'waiting' ? { color: '#10B981', fontWeight: '700' } : { color: '#6B7280' }]}>Waiting{"\n"}(8)</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.segmentInteractiveCellButton, activeTabSegment === 'progress' && styles.segmentActiveInteractiveCellButton]} 
            onPress={() => setActiveTabSegment('progress')}
          >
            <Text style={[styles.segmentCellLabelText, activeTabSegment === 'progress' ? { color: activeColors.text, fontWeight: '700' } : { color: '#6B7280' }]}>In Progress{"\n"}(1)</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.segmentInteractiveCellButton, activeTabSegment === 'completed' && styles.segmentActiveInteractiveCellButton]} 
            onPress={() => setActiveTabSegment('completed')}
          >
            <Text style={[styles.segmentCellLabelText, activeTabSegment === 'completed' ? { color: activeColors.text, fontWeight: '700' } : { color: '#6B7280' }]}>Completed{"\n"}(3)</Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic patient card mapping iterator layout */}
        {currentActiveQueueDataList.map((patient) => (
          <View 
            key={patient.id} 
            style={[
              styles.queueCardContainer, 
              { 
                backgroundColor: activeColors.surface, 
                borderColor: patient.priority === 'URGENT' ? '#EF4444' : activeColors.border,
                borderWidth: patient.priority === 'URGENT' ? 1.5 : 1
              }
            ]}
          >
            {/* Top ribbon badge layout tag context */}
            <View style={[styles.priorityRibbonBadgeHeaderTag, { backgroundColor: patient.colorTheme }]}>
              <Text style={styles.priorityRibbonBadgeHeaderTagLabelText}>{patient.priority}</Text>
            </View>

            <View style={styles.queueCardHeaderRow}>
              <View style={[styles.avatarInitialsCircleWrapperNode, { backgroundColor: `${patient.colorTheme}15` }]}>
                <Text style={[styles.avatarInitialsTextValue, { color: patient.colorTheme }]}>{patient.initials}</Text>
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

            {/* Time scheduling stamp status info panel */}
            <View style={styles.timeScheduleLabelRowInfoBlock}>
              <Text style={[styles.timeScheduleLabelRowInfoBlockTextSpan, { color: patient.priority === 'URGENT' ? '#EF4444' : '#10B981' }]}>
                🕒 {patient.timeSlot} {patient.delayStatus}
              </Text>
            </View>

            <View style={styles.actionButtonColumnContainerGrid}>
              <TouchableOpacity 
                style={[styles.primaryActionCallInteractiveButtonCell, { backgroundColor: patient.priority === 'URGENT' ? '#EF4444' : '#046A38' }]}
                onPress={() => router.push({ pathname: '/(doctor)/video_consult', params: { patientName: patient.name } })}
              >
                <Text style={styles.primaryActionCallInteractiveButtonCellLabelText}>📹 Join Call</Text>
              </TouchableOpacity>

              <View style={styles.dualGridRowActionButtonFrameFlexBox}>
                <TouchableOpacity 
                  style={[styles.splitSecondaryActionCellButton, { borderColor: activeColors.border }]}
                  onPress={() => Alert.alert('Records Vault', `Opening history for ${patient.name}`)}
                >
                  <Text style={[styles.splitSecondaryActionCellButtonLabelText, { color: activeColors.text }]}>Records</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.splitSecondaryActionCellButton, { borderColor: activeColors.border }]}
                  onPress={() => Alert.alert('Reschedule', 'Opening scheduling engine updates...')}
                >
                  <Text style={[styles.splitSecondaryActionCellButtonLabelText, { color: activeColors.text }]}>Reschedule</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Bottom agenda section title heading mapping */}
        <View style={styles.laterTodayHeaderRowFlexLine}>
          <Text style={[styles.laterTodayHeaderTitleLabel, { color: activeColors.text }]}>Later Today</Text>
          <TouchableOpacity onPress={() => Alert.alert('Navigation', 'Redirecting to complete timeline configuration ledger...')}>
            <Text style={styles.viewAllShortcutTextLinkAction}>View All ➔</Text>
          </TouchableOpacity>
        </View>

        {/* Agenda records matching layout list elements */}
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
            <View style={styles.agendaActionControlsInteractiveNodeBox}>
              <Text style={{ fontSize: 16, color: '#9CA3AF' }}>✏️</Text>
              <Text style={{ fontSize: 16, color: '#9CA3AF', marginTop: 4 }}>⋮</Text>
            </View>
          </View>
        ))}

      </ScrollView>

      {/* Floating Action Button inside screen body context */}
      <TouchableOpacity 
        style={styles.floatingActionButtonCircularTrigger}
        onPress={() => router.push('/(doctor)/prescription')}
      >
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
  queueCardContainer: { borderRadius: 12, padding: 14, marginBottom: 16, position: 'relative', overflow: 'hidden' },
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
  dualGridRowActionButtonFrameFlexBox: { flexDirection: 'row', gap: 8 },
  splitSecondaryActionCellButton: { flex: 1, paddingVertical: 8, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  splitSecondaryActionCellButtonLabelText: { fontSize: 11, fontWeight: '600' },
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
  agendaActionControlsInteractiveNodeBox: { alignItems: 'center', justifyContent: 'center', paddingLeft: 4 },
  floatingActionButtonCircularTrigger: { position: 'absolute', bottom: 80, right: 16, width: 46, height: 46, borderRadius: 23, backgroundColor: '#046A38', alignItems: 'center', justifyContent: 'center', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
  floatingActionButtonCircularTriggerGlyphIconText: { color: '#FFF', fontSize: 22, fontWeight: '400', marginTop: -2 }
});