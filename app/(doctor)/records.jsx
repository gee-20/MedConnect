import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { AppContext } from '../_layout';
import { Translations } from '../../constants/language';
import { Colors } from '../../constants/colors';
import DoctorHeader from '../../Components/doctor/doctor_header';
import DoctorFooter from '../../Components/doctor/admin_footer';

export default function PatientRecordsDashboard() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const [searchQueryStr, setSearchQueryStr] = useState('');
  const t = Translations[lang];

  // Structured dataset mirroring the patient records listed in image_9f95c3.png
  const patientRecordsList = [
    {
      id: 'r1',
      initials: 'JK',
      name: 'Juma Kapuya',
      patientId: 'AFD-2024-8812',
      status: 'Active',
      statusColor: '#10B981',
      statusBg: 'rgba(16, 185, 129, 0.1)',
      tag: 'Malaria',
      lastVisit: 'Oct 24, 2023',
      diagnosis: 'Acute Malaria',
      primaryBtn: true
    },
    {
      id: 'r2',
      initials: 'ZA',
      name: 'Zuwena Ali',
      patientId: 'AFD-2024-9104',
      status: 'Completed',
      statusColor: '#6B7280',
      statusBg: 'rgba(107, 114, 128, 0.1)',
      tag: 'Hypertension',
      lastVisit: 'Sep 15, 2023',
      diagnosis: 'Stage 1 HTN',
      primaryBtn: false
    },
    {
      id: 'r3',
      initials: 'BM',
      name: 'Bakari Mwinyi',
      patientId: 'AFD-2024-7721',
      status: 'High Priority',
      statusColor: '#EF4444',
      statusBg: 'rgba(239, 68, 68, 0.1)',
      tag: 'Asthma',
      lastVisit: 'Oct 30, 2023',
      diagnosis: 'Acute Exacerbation',
      primaryBtn: true
    }
  ];

  return (
    <SafeAreaView style={[styles.safeContainer, { backgroundColor: activeColors.background }]}>
      <DoctorHeader title="Patient Records" />

      <ScrollView contentContainerStyle={styles.scrollLayoutGapping} showsVerticalScrollIndicator={false}>
        
        {/* Section Heading Title Header */}
        <View style={styles.titleBannerBlockHeader}>
          <Text style={[styles.screenTitleText, { color: activeColors.text }]}>Patient Records</Text>
          <Text style={styles.screenSubtitleMetaSpan}>Manage and review medical histories for your patients.</Text>
        </View>

        {/* Global Registry Registry Lookup Search Bar Input element */}
        <View style={[styles.searchFieldWrapperFrame, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <Text style={{ fontSize: 14, color: '#9CA3AF' }}>🔍</Text>
          <TextInput
            style={[styles.searchInputElementField, { color: activeColors.text }]}
            placeholder="Search by name or ID..."
            placeholderTextColor="#9CA3AF"
            value={searchQueryStr}
            onChangeText={setSearchQueryStr}
          />
        </View>

        {/* 2x2 Metric Framework Grid Summary Cells matrix */}
        <View style={styles.metricsTwoColumnGridRowContainer}>
          <View style={[styles.metricGridSquareCellBox, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <Text style={styles.metricGridSquareCellBoxLabelHeader}>Total Patients</Text>
            <Text style={[styles.metricGridSquareCellBoxHeroNumerical, { color: '#046A38' }]}>1,284</Text>
          </View>

          <View style={[styles.metricGridSquareCellBox, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <Text style={styles.metricGridSquareCellBoxLabelHeader}>Visits Today</Text>
            <Text style={[styles.metricGridSquareCellBoxHeroNumerical, { color: '#10B981' }]}>12</Text>
          </View>
        </View>

        <View style={styles.metricsTwoColumnGridRowContainer}>
          <View style={[styles.metricGridSquareCellBox, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <Text style={styles.metricGridSquareCellBoxLabelHeader}>Active Cases</Text>
            <Text style={[styles.metricGridSquareCellBoxHeroNumerical, { color: '#E67E22' }]}>45</Text>
          </View>

          <View style={[styles.metricGridSquareCellBox, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <Text style={styles.metricGridSquareCellBoxLabelHeader}>Completed</Text>
            <Text style={[styles.metricGridSquareCellBoxHeroNumerical, { color: '#6B7280' }]}>892</Text>
          </View>
        </View>

        {/* Patient Case File Row Render Mapping Cluster */}
        {/* Patient File Item 1 */}
        {renderPatientRecordCard(patientRecordsList[0], activeColors, theme)}

        {/* Clinical Laboratories Context banner matching image_9f95c3.png */}
        <View style={styles.recentAlertsHighlightBannerBox}>
          <View style={{ flex: 1 }}>
            <Text style={styles.recentAlertsHighlightBannerBoxTitleHeading}>Recent Alerts</Text>
            <Text style={styles.recentAlertsHighlightBannerBoxSubDescriptionLine}>
              3 patients require immediate follow-up on laboratory results.
            </Text>
            <TouchableOpacity 
              style={styles.recentAlertsHighlightBannerBoxInteractiveActionBtn}
              onPress={() => Alert.alert('Lab Workflows', 'Routing to clinical diagnostic vault panels...')}
            >
              <Text style={styles.recentAlertsHighlightBannerBoxInteractiveActionBtnLabel}>Review Results</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.recentAlertsGraphicIconWatermarkWrapper}>
            <Text style={{ fontSize: 44, opacity: 0.15, color: '#FFF' }}>📋</Text>
          </View>
        </View>

        {/* Patient File Item 2 */}
        {renderPatientRecordCard(patientRecordsList[1], activeColors, theme)}

        {/* Data Export Center Panel Card Box */}
        <View style={[styles.dataExportCenterHousingFrame, { backgroundColor: theme === 'dark' ? '#1F2937' : '#E5E7EB' }]}>
          <Text style={[styles.dataExportCenterTitleLabelHeading, { color: activeColors.text }]}>Data Export</Text>
          <Text style={styles.dataExportCenterSubtitleMetaDescriptionLine}>
            Generate monthly patient summary reports for MoH reporting compliance vectors.
          </Text>

          <TouchableOpacity 
            style={[styles.dataExportCenterFileDownloadRowBlockCell, { backgroundColor: activeColors.surface }]}
            onPress={() => Alert.alert('Document Export System', 'Downloading Oct Summary Statement PDF file...')}
          >
            <Text style={[styles.dataExportCenterFileDownloadRowBlockCellFilename, { color: activeColors.text }]}>Oct Summary.pdf</Text>
            <Text style={{ fontSize: 14, color: '#046A38' }}>📥</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.dataExportCenterFileDownloadRowBlockCell, { backgroundColor: activeColors.surface }]}
            onPress={() => Alert.alert('Analytics Matrix Export', 'Compiling spreadsheet spreadsheet array arrays...')}
          >
            <Text style={[styles.dataExportCenterFileDownloadRowBlockCellFilename, { color: activeColors.text }]}>Analytics_Q3.csv</Text>
            <Text style={{ fontSize: 14, color: '#046A38' }}>📥</Text>
          </TouchableOpacity>
        </View>

        {/* Patient File Item 3 */}
        {renderPatientRecordCard(patientRecordsList[2], activeColors, theme)}

      </ScrollView>

      <DoctorFooter />
    </SafeAreaView>
  );
}

// Global scope reusable layout function renderer module instance for Patient records card entries mapping
function renderPatientRecordCard(patientItem, activeColors, theme) {
  return (
    <View key={patientItem.id} style={[styles.patientRecordCardHousing, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
      <View style={styles.patientRecordCardHeaderFlexRow}>
        <View style={[styles.patientAvatarInitialsCircleBadgeBox, { backgroundColor: patientItem.id === 'r1' ? '#86EFAC' : patientItem.id === 'r2' ? '#DBEAFE' : '#BFDBFE' }]}>
          <Text style={[styles.patientAvatarInitialsCircleBadgeBoxText, { color: patientItem.id === 'r1' ? '#046A38' : '#1E40AF' }]}>{patientItem.initials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.patientRecordCardPatientNameTitleText, { color: activeColors.text }]}>{patientItem.name}</Text>
          <Text style={styles.patientRecordCardPatientIdSubtitleMetaText}>ID: {patientItem.patientId}</Text>
          
          <View style={styles.patientRecordCardStatusChipsFlexRowBlockCluster}>
            <View style={[styles.patientRecordCardStatusChipTagBadge, { backgroundColor: patientItem.statusBg }]}>
              <Text style={[styles.patientRecordCardStatusChipTagBadgeTextLabel, { color: patientItem.statusColor }]}>{patientItem.status}</Text>
            </View>
            <View style={[styles.patientRecordCardStatusChipTagBadge, { backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6' }]}>
              <Text style={[styles.patientRecordCardStatusChipTagBadgeTextLabel, { color: '#6B7280' }]}>{patientItem.tag}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.cardInternalDividerLineSpacer} />

      <View style={styles.cardClinicalContextDataGridTwoColumnFlexRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardClinicalContextDataGridTwoColumnFlexRowLabelHeading}>Last Visit</Text>
          <Text style={[styles.cardClinicalContextDataGridTwoColumnFlexRowValueText, { color: activeColors.text }]}>{patientItem.lastVisit}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardClinicalContextDataGridTwoColumnFlexRowLabelHeading}>Primary Diagnosis</Text>
          <Text style={[styles.cardClinicalContextDataGridTwoColumnFlexRowValueText, { color: activeColors.text }]}>{patientItem.diagnosis}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[
          styles.cardContextNavigationPrimaryTriggerActionButton, 
          patientItem.primaryBtn ? { backgroundColor: '#046A38' } : { backgroundColor: theme === 'dark' ? '#374151' : '#EFF6FF', borderWidth: 1, borderColor: activeColors.border }
        ]}
        onPress={() => Alert.alert('Case Records Vault', `Fetching absolute historical timelines for ${patientItem.name}`)}
      >
        <Text style={[styles.cardContextNavigationPrimaryTriggerActionButtonLabelText, patientItem.primaryBtn ? { color: '#FFF' } : { color: activeColors.text }]}>
          {patientItem.primaryBtn ? 'View Full History ➔' : 'View Full History 🔄'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1 },
  scrollLayoutGapping: { padding: 14, paddingBottom: 40 },
  titleBannerBlockHeader: { marginBottom: 14, marginTop: 4 },
  screenTitleText: { fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
  screenSubtitleMetaSpan: { fontSize: 11, color: '#6B7280', marginTop: 2, lineHeight: 15 },
  searchFieldWrapperFrame: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, height: 44, marginBottom: 16 },
  searchInputElementField: { flex: 1, fontSize: 13 },
  metricsTwoColumnGridRowContainer: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  metricGridSquareCellBox: { flex: 1, borderRadius: 10, borderWidth: 1, padding: 14 },
  metricGridSquareCellBoxLabelHeader: { fontSize: 10, fontWeight: '700', color: '#9CA3AF' },
  metricGridSquareCellBoxHeroNumerical: { fontSize: 20, fontWeight: '800', marginTop: 4 },
  patientRecordCardHousing: { borderRadius: 12, borderWidth: 1, padding: 14, marginBottom: 14 },
  patientRecordCardHeaderFlexRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  patientAvatarInitialsCircleBadgeBox: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  patientAvatarInitialsCircleBadgeBoxText: { fontSize: 13, fontWeight: '700' },
  patientRecordCardPatientNameTitleText: { fontSize: 15, fontWeight: '700' },
  patientRecordCardPatientIdSubtitleMetaText: { fontSize: 10, color: '#9CA3AF', marginTop: 1 },
  patientRecordCardStatusChipsFlexRowBlockCluster: { flexDirection: 'row', gap: 6, marginTop: 6, alignItems: 'center' },
  patientRecordCardStatusChipTagBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  patientRecordCardStatusChipTagBadgeTextLabel: { fontSize: 9, fontWeight: '700' },
  cardInternalDividerLineSpacer: { height: 1, backgroundColor: 'rgba(0,0,0,0.05)', marginVertical: 12 },
  cardClinicalContextDataGridTwoColumnFlexRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  cardClinicalContextDataGridTwoColumnFlexRowLabelHeading: { fontSize: 9, fontWeight: '700', color: '#9CA3AF', marginBottom: 2 },
  cardClinicalContextDataGridTwoColumnFlexRowValueText: { fontSize: 12, fontWeight: '700' },
  cardContextNavigationPrimaryTriggerActionButton: { height: 38, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  cardContextNavigationPrimaryTriggerActionButtonLabelText: { fontSize: 12, fontWeight: '700' },
  recentAlertsHighlightBannerBox: { backgroundColor: '#046A38', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', position: 'relative', overflow: 'hidden', marginBottom: 14 },
  recentAlertsHighlightBannerBoxTitleHeading: { color: '#FFF', fontSize: 15, fontWeight: '800' },
  recentAlertsHighlightBannerBoxSubDescriptionLine: { color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 4, lineHeight: 15, maxWidth: '85%' },
  recentAlertsHighlightBannerBoxInteractiveActionBtn: { backgroundColor: '#FFF', alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 18, marginTop: 12 },
  recentAlertsHighlightBannerBoxInteractiveActionBtnLabel: { color: '#046A38', fontSize: 11, fontWeight: '700' },
  recentAlertsGraphicIconWatermarkWrapper: { position: 'absolute', right: -10, bottom: -10 },
  dataExportCenterHousingFrame: { borderRadius: 12, padding: 16, marginBottom: 14 },
  dataExportCenterTitleLabelHeading: { fontSize: 14, fontWeight: '800' },
  dataExportCenterSubtitleMetaDescriptionLine: { fontSize: 11, color: '#6B7280', marginTop: 4, marginBottom: 14, lineHeight: 15 },
  dataExportCenterFileDownloadRowBlockCell: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 8, marginBottom: 8, elevation: 1 },
  dataExportCenterFileDownloadRowBlockCellFilename: { fontSize: 12, fontWeight: '600' }
});