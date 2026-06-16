import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import { Translations } from '../../constants/language';
import DoctorHeader from '../../Components/doctor/doctor_header';
import DoctorFooter from '../../Components/doctor/admin_footer';

export default function DigitalPrescriptionScreen() {
  const { theme, lang, setLang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const t = Translations[lang];
  const params = useLocalSearchParams();
  const router = useRouter();

  const [durationDays, setDurationDays] = useState(7);
  const [selectedTiming, setSelectedTiming] = useState('After Food');
  const [formState, setFormState] = useState({
    patient: params.patientName || 'Amani Juma',
    diagnosis: '',
    medication: 'Amlodipine 5mg',
    dosage: '2 tablets twice daily for 7 days',
    notes: ''
  });

  const handleDispatch = () => {
    Alert.alert(
      lang === 'en' ? 'Prescription Dispatched' : 'Cheti Kimepatikana',
      lang === 'en' ? 'Sent to patient app successfully.' : 'Maelezo yamesainiwa na kutumwa kwa mgonjwa.'
    );
  };

  return (
    <SafeAreaView style={[styles.safeFill, { backgroundColor: activeColors.background }]}>
      <DoctorHeader title="Prescription Builder" />

      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        
        {/* Top Consultation Meta Tags */}
        <View style={styles.metaHeaderRow}>
          <Text style={styles.consultationIdText}>CONSULTATION ID: <Text style={{fontWeight:'700'}}>#6829-K</Text></Text>
          <Text style={[styles.mainHeading, { color: activeColors.text }]}>Digital Prescription Builder</Text>
          <TouchableOpacity style={[styles.recentRxButton, { borderColor: activeColors.border }]}>
            <Text style={[styles.recentRxButtonText, { color: activeColors.text }]}>🔄 Recent Rx</Text>
          </TouchableOpacity>
        </View>

        {/* Patient Short Summary Box Frame */}
        <View style={[styles.patientSummaryBox, { backgroundColor: theme === 'dark' ? '#1F2937' : '#EBF5FF' }]}>
          <View style={styles.avatarMock}><Text style={{fontSize: 14}}>👤</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.patientNameTitle, { color: activeColors.text }]}>{formState.patient}</Text>
            <Text style={styles.patientMetaText}>28Y • Male • Weight: 74kg</Text>
          </View>
          <View style={styles.allergyBadge}>
            <Text style={styles.allergyBadgeText}>Allergy: Penicillin</Text>
          </View>
        </View>

        {/* Input Fields Content Stack */}
        <Text style={[styles.fieldLabel, { color: activeColors.text }]}>📋 Diagnosis & Clinical Notes</Text>
        <TextInput 
          style={[styles.inputBox, styles.textArea, { backgroundColor: activeColors.surface, color: activeColors.text, borderColor: activeColors.border }]}
          multiline numberOfLines={3}
          placeholder="Enter clinical diagnosis and relevant findings..."
          placeholderTextColor="#9CA3AF"
          value={formState.diagnosis}
          onChangeText={(txt) => setFormState(p => ({ ...p, diagnosis: txt }))}
        />

        <Text style={[styles.fieldLabel, { color: activeColors.text }]}>Medication Name</Text>
        <TextInput 
          style={[styles.inputBox, { backgroundColor: activeColors.surface, color: activeColors.text, borderColor: activeColors.border }]}
          placeholder="🔍 Search drug registry..."
          placeholderTextColor="#9CA3AF"
          value={formState.medication}
          onChangeText={(txt) => setFormState(p => ({ ...p, medication: txt }))}
        />

        <Text style={[styles.fieldLabel, { color: activeColors.text }]}>Dosage Instructions</Text>
        <TextInput 
          style={[styles.inputBox, { backgroundColor: activeColors.surface, color: activeColors.text, borderColor: activeColors.border }]}
          placeholder="e.g. 2 tablets twice daily"
          placeholderTextColor="#9CA3AF"
          value={formState.dosage}
          onChangeText={(txt) => setFormState(p => ({ ...p, dosage: txt }))}
        />

        {/* Interactive Duration Days Counter Section */}
        <Text style={[styles.fieldLabel, { color: activeColors.text }]}>Duration (Days)</Text>
        <View style={styles.counterRowGrid}>
          <TouchableOpacity style={[styles.counterBtn, { borderColor: activeColors.border }]} onPress={() => setDurationDays(Math.max(1, durationDays - 1))}>
            <Text style={[styles.counterBtnText, { color: activeColors.text }]}>-</Text>
          </TouchableOpacity>
          <View style={[styles.counterDisplay, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <Text style={[styles.counterDisplayText, { color: activeColors.text }]}>{durationDays}</Text>
          </View>
          <TouchableOpacity style={[styles.counterBtn, { borderColor: activeColors.border }]} onPress={() => setDurationDays(durationDays + 1)}>
            <Text style={[styles.counterBtnText, { color: activeColors.text }]}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Administration Timing Segment Controls */}
        <Text style={[styles.fieldLabel, { color: activeColors.text }]}>Administration Timing</Text>
        <View style={styles.timingRowFlex}>
          {['Before Food', 'After Food', 'Bedtime'].map((timeOption) => {
            const isSelected = selectedTiming === timeOption;
            return (
              <TouchableOpacity 
                key={timeOption} 
                style={[styles.timingChip, isSelected ? { backgroundColor: activeColors.primary } : { backgroundColor: 'rgba(0,0,0,0.04)' }]}
                onPress={() => setSelectedTiming(timeOption)}
              >
                <Text style={[styles.timingChipText, isSelected ? { color: '#FFF', fontWeight: '700' } : { color: '#4B5563' }]}>
                  {timeOption}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Allergy Cross-check Warning Box Context Alert */}
        <View style={styles.warningBannerBox}>
          <Text style={styles.warningBannerText}>
            ⚠️ Patient has a recorded allergy to Beta-lactams. Please verify if Amlodipine is a safe alternative.
          </Text>
        </View>

        <Text style={[styles.fieldLabel, { color: activeColors.text }]}>Additional Pharmacy Notes</Text>
        <TextInput 
          style={[styles.inputBox, { backgroundColor: activeColors.surface, color: activeColors.text, borderColor: activeColors.border }]}
          placeholder="Optional notes for the pharmacist..."
          placeholderTextColor="#9CA3AF"
          value={formState.notes}
          onChangeText={(txt) => setFormState(p => ({ ...p, notes: txt }))}
        />

        {/* Live Preview Sheet Box Panel matching image_a07a06.png */}
        <View style={[styles.previewPaperDashedFrame, { borderColor: '#10B981', backgroundColor: activeColors.surface }]}>
          <Text style={styles.previewWatermarkTitle}>📝 Live Preview</Text>
          <Text style={styles.previewMetaLabel}>DATE: 24 OCT 2026          Rx# RX-00129</Text>
          <View style={styles.dividerLine} />
          <Text style={[styles.previewRxDrugText, { color: activeColors.primary }]}>Rx: {formState.medication}</Text>
          <Text style={styles.previewRxDetailsText}>{formState.dosage} • {selectedTiming}</Text>
          <Text style={styles.previewSignatureText}>Electronically signed by Dr. Mwemba</Text>
        </View>

        {/* Action Button Controls Chain Grid */}
        <TouchableOpacity style={[styles.actionBtnPrimary, { backgroundColor: '#046A38' }]} onPress={handleDispatch}>
          <Text style={styles.actionBtnPrimaryText}>🚀 Send to Patient App</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtnSecondary, { borderColor: '#046A38' }]} onPress={() => Alert.alert('PDF Engine', 'Generating document copies...')}>
          <Text style={{ color: '#046A38', fontWeight: '700', fontSize: 13 }}>📄 Download as PDF</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtnSecondary, { borderColor: activeColors.border }]} onPress={() => Alert.alert('Print System', 'Sending job array data to queue...')}>
          <Text style={[styles.actionBtnSecondaryText, { color: activeColors.text }]}>🖨️ Print for In-Person</Text>
        </TouchableOpacity>

       
      </ScrollView>

      <DoctorFooter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeFill: { flex: 1 },
  scrollContainer: { padding: 14, paddingBottom: 40 },
  metaHeaderRow: { marginBottom: 16 },
  consultationIdText: { fontSize: 9, color: '#9CA3AF', fontWeight: '600', letterSpacing: 0.5 },
  mainHeading: { fontSize: 18, fontWeight: '800', marginTop: 2, marginBottom: 8 },
  recentRxButton: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, borderWidth: 1 },
  recentRxButtonText: { fontSize: 11, fontWeight: '600' },
  patientSummaryBox: { flexDirection: 'row', padding: 12, borderRadius: 10, alignItems: 'center', gap: 10, marginBottom: 16 },
  avatarMock: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.05)', alignItems:'center', justifyContent:'center' },
  patientNameTitle: { fontSize: 13, fontWeight: '700' },
  patientMetaText: { fontSize: 11, color: '#6B7280', marginTop: 1 },
  allergyBadge: { backgroundColor: '#FEE2E2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  allergyBadgeText: { color: '#EF4444', fontSize: 10, fontWeight: '700' },
  fieldLabel: { fontSize: 11, fontWeight: '700', marginTop: 12, marginBottom: 6 },
  inputBox: { height: 44, borderRadius: 8, borderWidth: 1, paddingHorizontal: 12, fontSize: 13 },
  textArea: { height: 70, paddingTop: 10, textAlignVertical: 'top' },
  counterRowGrid: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  counterBtn: { width: 36, height: 36, borderRadius: 6, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  counterBtnText: { fontSize: 16, fontWeight: '600' },
  counterDisplay: { width: 80, height: 36, borderRadius: 6, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  counterDisplayText: { fontSize: 13, fontWeight: '700' },
  timingRowFlex: { flexDirection: 'row', gap: 8, marginBottom: 4 },
  timingChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16 },
  timingChipText: { fontSize: 11 },
  warningBannerBox: { backgroundColor: '#FFF7ED', borderRadius: 8, padding: 10, borderLeftWidth: 3, borderLeftColor: '#EA580C', marginTop: 14, marginBottom: 4 },
  warningBannerText: { color: '#C2410C', fontSize: 11, lineHeight: 15, fontWeight: '500' },
  previewPaperDashedFrame: { borderRadius: 10, borderWidth: 1.5, borderStyle: 'dashed', padding: 14, marginTop: 20, marginBottom: 20 },
  previewWatermarkTitle: { fontSize: 11, fontWeight: '700', color: '#9CA3AF', textAlign: 'center', marginBottom: 4 },
  previewMetaLabel: { fontSize: 9, color: '#6B7280', textAlign: 'center' },
  dividerLine: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 8 },
  previewRxDrugText: { fontSize: 14, fontWeight: '800' },
  previewRxDetailsText: { fontSize: 12, color: '#4B5563', marginTop: 2 },
  previewSignatureText: { fontSize: 10, color: '#9CA3AF', fontStyle: 'italic', marginTop: 10 },
  actionBtnPrimary: { height: 44, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  actionBtnPrimaryText: { color: '#FFF', fontWeight: '700', fontSize: 13 },
  actionBtnSecondary: { height: 44, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  actionBtnSecondaryText: { fontWeight: '600', fontSize: 13 },
  languageToggleRowBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 8, marginTop: 14 },
  langSwitchToggleFrameBtn: { flexDirection: 'row', backgroundColor: '#E5E7EB', borderRadius: 6, padding: 2 },
  langCell: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  langCellActive: { backgroundColor: '#FFF' },
  langText: { fontSize: 10, color: '#6B7280' }
});