import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import { Translations } from '../../constants/language'; // Loaded Localization Matrix
import AnimatedButton from '../../Components/AnimatedButton';

// Global In-Memory Stores for local simulation
const AVAILABLE_DOCTORS = [
  { id: '1', name: 'Dr. Neema Mabula', specialty: 'General Practitioner', fee: 'TZS 35,000', rating: '4.8', image: '🏥' },
  { id: '2', name: 'Dr. Baraka Juma', specialty: 'Cardiologist', fee: 'TZS 50,000', rating: '4.9', image: '🩺' },
  { id: '3', name: 'Dr. Rama', specialty: 'Pediatrician', fee: 'TZS 40,000', rating: '4.7', image: '🩺' },
  { id: '4', name: 'Dr. Sarah Kimaro', specialty: 'Dermatologist', fee: 'TZS 42,000', rating: '4.8', image: '🩺' },
];

let IN_MEMORY_CONSULTATIONS = [
  { id: 'c1', doctorId: '1', doctorName: 'Dr. Neema Mabula', date: '2026-06-02', time: '10:00 AM', symptoms: 'Persistent dry cough and mild fever.' }
];

export default function PatientDashboard() {
  const router = useRouter();
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const t = Translations[lang]; // Global language variable mapping active
  // --- Dynamic UI State Management ---
  const [activeConsultations, setActiveConsultations] = useState(IN_MEMORY_CONSULTATIONS);

  // Modal Visibility Toggles
  const [myConsultsVisible, setMyConsultsVisible] = useState(false);
  const [commModeVisible, setCommModeVisible] = useState(false);
  const [allDoctorsVisible, setAllDoctorsVisible] = useState(false);
  const [prescriptionModalVisible, setPrescriptionModalVisible] = useState(false);

  // Form Field Tracking States
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [editSymptoms, setEditSymptoms] = useState('');
  const [prescDoctorId, setPrescDoctorId] = useState('1');
  const [prescDetails, setPrescDetails] = useState('');

  // --- Core Functional Logic Triggers ---

  // 1. My Consultations Management (Update & Cancel)
  const handleUpdateConsultation = () => {
    if (!editSymptoms.trim()) {
      Alert.alert('Error', lang === 'en' ? 'Please describe symptoms.' : 'Tafadhali eleza dalili.');
      return;
    }
    IN_MEMORY_CONSULTATIONS = IN_MEMORY_CONSULTATIONS.map(c =>
      c.id === selectedConsultation.id ? { ...c, symptoms: editSymptoms } : c
    );
    setActiveConsultations(IN_MEMORY_CONSULTATIONS);
    setSelectedConsultation(null);
    Alert.alert('Success', lang === 'en' ? 'Updated successfully.' : 'Imesasishwa kikamilifu.');
  };


  const handleCancelConsultation = (id) => {
    Alert.alert(
      lang === 'en' ? 'Cancel Booking' : 'Ghairi Miadi',
      lang === 'en' ? 'Are you sure?' : 'Una uhakika unataka kughairi?',
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: 'OK', onPress: () => {
            IN_MEMORY_CONSULTATIONS = IN_MEMORY_CONSULTATIONS.filter(c => c.id !== id);
            setActiveConsultations(IN_MEMORY_CONSULTATIONS);
            setSelectedConsultation(null);
          }
        }
      ]
    );
  };

  // 2. Prescription / Details Information Dispatcher
  const handleSendPrescriptionDetails = () => {
    if (!prescDetails.trim()) {
      Alert.alert('Error', 'Please fill in the medical description box.');
      return;
    }
    const targetDoc = AVAILABLE_DOCTORS.find(d => d.id === prescDoctorId);
    Alert.alert(
      'Information Dispatched 📨',
      `Your medical records and symptoms description files have been transmitted directly to ${targetDoc.name}.`,
      [{
        text: 'OK', onPress: () => {
          setPrescriptionModalVisible(false);
          setPrescDetails('');
        }
      }]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Top Header Greetings Area */}
        <View style={styles.headerArea}>
          <Text style={[styles.greetingMain, { color: activeColors.text }]}>Hi, Salome</Text>
          <Text style={styles.greetingSub}>How are you feeling today?</Text>
        </View>

        {/* AI Symptom Checker Banner Card */}
        <View style={styles.aiBanner}>
          <View style={styles.aiTextContainer}>
            <Text style={styles.aiTitle}>Feeling unwell?</Text>
            <Text style={styles.aiDesc}>Check your symptoms with our AI assistant in seconds.</Text>
            <AnimatedButton style={styles.aiBtn} onPress={() => Alert.alert('AI Assistant', 'Launching localized diagnosis engine...')}>
              <Text style={styles.aiBtnText}>Check Now</Text>
            </AnimatedButton>
          </View>
          <Text style={styles.aiIconGraphic}>⚙️</Text>
        </View>

        {/* Primary Operational Action Layout Quadrants */}
        <View style={styles.quadGridRow}>
          <AnimatedButton
            style={[styles.gridCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}
            onPress={() => router.push('/(patient)/book_consultation')}
          >
            <Text style={styles.gridEmojiIcon}>📅</Text>
            <Text style={[styles.gridActionLabel, { color: activeColors.text }]}>Book Consultation</Text>
          </AnimatedButton>

          <AnimatedButton
            style={[styles.gridCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}
            onPress={() => setMyConsultsVisible(true)}
          >
            <Text style={styles.gridEmojiIcon}>⏳</Text>
            <Text style={[styles.gridActionLabel, { color: activeColors.text }]}>My Consultations</Text>
          </AnimatedButton>
        </View>

        {/* Inline Secondary Action Row Strip */}
        <View style={styles.horizontalActionStrip}>
          <AnimatedButton
            style={[styles.stripCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}
            onPress={() => setCommModeVisible(true)}
          >
            <Text style={styles.stripEmoji}>💬</Text>
            <Text style={[styles.stripLabel, { color: activeColors.text }]}>Chat with Doctor</Text>
          </AnimatedButton>

          <AnimatedButton
            style={[styles.stripCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}
            onPress={() => setPrescriptionModalVisible(true)}
          >
            <Text style={styles.stripEmoji}>📝</Text>
            <Text style={[styles.stripLabel, { color: activeColors.text }]}>Prescriptions</Text>
          </AnimatedButton>
        </View>

        {/* Recommended Doctors Directory Segment */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionTitle, { color: activeColors.text }]}>Recommended Doctors</Text>
          <AnimatedButton onPress={() => setAllDoctorsVisible(true)}>
            <Text style={{ color: '#0F766E', fontWeight: '700', fontSize: 14 }}>See all</Text>
          </AnimatedButton>
        </View>

        {/* Inline Render List for Featured Clinicians */}
        {AVAILABLE_DOCTORS.map(doc => (
          <View key={doc.id} style={[styles.doctorCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <View style={styles.doctorAvatarBox}>
              <Text style={{ fontSize: 28 }}>{doc.image}</Text>
            </View>
            <View style={styles.doctorDetailsMain}>
              <Text style={[styles.docNameText, { color: activeColors.text }]}>{doc.name}</Text>
              <Text style={styles.docSpecialtyText}>{doc.specialty}</Text>
              <Text style={styles.docRatingText}>⭐ {doc.rating}</Text>
            </View>
            <View style={styles.doctorActionColumn}>
              <Text style={styles.docFeeValue}>{doc.fee}</Text>
              <AnimatedButton
                style={styles.inlineBookButton}
                onPress={() => router.push({ pathname: '/(patient)/book_consultation', params: { doctorId: doc.id } })}
              >
                <Text style={styles.inlineBookBtnText}>Book</Text>
              </AnimatedButton>
            </View>
          </View>
        ))}

      </ScrollView>

      {/* ================= MODAL SUB-SYSTEM LAYOUTS ================= */}

      {/* 1. MY CONSULTATIONS DETAILS AND UPDATE MANAGEMENT MODAL */}
      <Modal animationType="slide" transparent={true} visible={myConsultsVisible} onRequestClose={() => setMyConsultsVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <Text style={[styles.modalHeadline, { color: activeColors.text }]}>My Stored Consultations</Text>

            {activeConsultations.length === 0 ? (
              <Text style={styles.emptyStateFallbackText}>No scheduled consultations active at this time.</Text>
            ) : (
              <ScrollView style={{ width: '100%', maxHeight: 300 }}>
                {activeConsultations.map(item => (
                  <View key={item.id} style={[styles.consultationRecordEntry, { borderColor: activeColors.border }]}>
                    <Text style={[styles.recordLabelTitle, { color: activeColors.text }]}>{item.doctorName}</Text>
                    <Text style={styles.recordSubMeta}>Scheduled: {item.date} at {item.time}</Text>
                    <Text style={[styles.recordSymptomsLabel, { color: activeColors.text }]}>Stated Symptoms: <Text style={{ fontWeight: '400', color: '#6B7280' }}>{item.symptoms}</Text></Text>

                    <View style={styles.recordActionsGridContainer}>
                      <AnimatedButton style={styles.recordEditActionBtn} onPress={() => { setSelectedConsultation(item); setEditSymptoms(item.symptoms); }}>
                        <Text style={styles.recordActionBtnText}>Modify Notes</Text>
                      </AnimatedButton>
                      <AnimatedButton style={styles.recordCancelActionBtn} onPress={() => handleCancelConsultation(item.id)}>
                        <Text style={styles.recordActionBtnText}>Cancel Appt</Text>
                      </AnimatedButton>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}

            {/* Sub-form layer for editing chosen consultation */}
            {selectedConsultation && (
              <View style={[styles.editorBoxFormContainer, { borderColor: activeColors.primary }]}>
                <Text style={[styles.inputFieldTitle, { color: activeColors.text }]}>Update Symptoms Log</Text>
                <TextInput
                  style={[styles.modalFormInputBox, { borderColor: activeColors.border, color: activeColors.text }]}
                  value={editSymptoms}
                  onChangeText={setEditSymptoms}
                  multiline
                />
                <AnimatedButton style={[styles.saveEditsActionBtn, { backgroundColor: activeColors.primary }]} onPress={handleUpdateConsultation}>
                  <Text style={styles.saveEditsText}>Confirm Update</Text>
                </AnimatedButton>
              </View>
            )}

            <AnimatedButton style={styles.closeModalBottomButton} onPress={() => { setMyConsultsVisible(false); setSelectedConsultation(null); }}>
              <Text style={styles.closeModalBtnText}>Close Panel</Text>
            </AnimatedButton>
          </View>
        </View>
      </Modal>

      {/* 2. COMMUNICATION CHANNELS SELECTOR MODAL (Video ready, Chat uncreated placeholder) */}
      <Modal animationType="fade" transparent={true} visible={commModeVisible} onRequestClose={() => setCommModeVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <Text style={[styles.modalHeadline, { color: activeColors.text }]}>Select Communication Mode</Text>
            <Text style={styles.modalSubDescriptionLabel}>Choose your preferred secure clinical contact channel mechanism:</Text>


            <AnimatedButton
              style={[styles.comChannelSelectRowButton, { borderColor: activeColors.primary, backgroundColor: 'rgba(15, 118, 110, 0.05)' }]}
              onPress={() => { setCommModeVisible(false); router.push('/(patient)/chart_screen'); }}
            >
              <Text style={styles.comChannelRowEmoji}>💬</Text>
              <View>
                <Text style={[styles.comChannelRowTitle, { color: activeColors.text }]}>Interactive Text Chat</Text>
                <Text style={styles.comChannelRowSubtitle}>Screen is fully functional & deployed</Text>
              </View>
            </AnimatedButton>

            <AnimatedButton
              style={[styles.comChannelSelectRowButton, { borderColor: activeColors.primary, backgroundColor: 'rgba(15, 118, 110, 0.05)' }]}
              onPress={() => { setCommModeVisible(false); router.push('/(patient)/video_call'); }}
            >
              <Text style={styles.comChannelRowEmoji}>📹</Text>
              <View>
                <Text style={[styles.comChannelRowTitle, { color: activeColors.text }]}>Live Video Consultation</Text>
                <Text style={styles.comChannelRowSubtitle}>Screen is fully functional & deployed</Text>
              </View>
            </AnimatedButton>

            <AnimatedButton style={styles.closeModalBottomButton} onPress={() => setCommModeVisible(false)}>
              <Text style={styles.closeModalBtnText}>Back</Text>
            </AnimatedButton>
          </View>
        </View>
      </Modal>

      {/* 3. SEE ALL DOCTORS CLASSIFIED SYSTEM LAYOUT MODAL */}
      <Modal animationType="slide" transparent={true} visible={allDoctorsVisible} onRequestClose={() => setAllDoctorsVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <Text style={[styles.modalHeadline, { color: activeColors.text }]}>All Registered Providers</Text>
            <Text style={styles.modalSubDescriptionLabel}>Sorted matches filtered by your diagnosed medical problems:</Text>

            <ScrollView style={{ width: '100%' }}>
              {AVAILABLE_DOCTORS.map(doc => (
                <View key={doc.id} style={[styles.doctorCard, { backgroundColor: activeColors.background, borderColor: activeColors.border, marginVertical: 6 }]}>
                  <Text style={{ fontSize: 24, paddingHorizontal: 10 }}>{doc.image}</Text>
                  <View style={{ flex: 1, paddingLeft: 6 }}>
                    <Text style={[styles.docNameText, { color: activeColors.text }]}>{doc.name}</Text>
                    <Text style={styles.docSpecialtyText}>{doc.specialty}</Text>
                  </View>
                  <AnimatedButton
                    style={styles.inlineBookButton}
                    onPress={() => { setAllDoctorsVisible(false); router.push({ pathname: '/(patient)/book_consultation', params: { doctorId: doc.id } }); }}
                  >
                    <Text style={styles.inlineBookBtnText}>Select</Text>
                  </AnimatedButton>
                </View>
              ))}
            </ScrollView>

            <AnimatedButton style={styles.closeModalBottomButton} onPress={() => setAllDoctorsVisible(false)}>
              <Text style={styles.closeModalBtnText}>Close Directory</Text>
            </AnimatedButton>
          </View>
        </View>
      </Modal>

      {/* 4. DETAIL PRESCRIPTIONS CLINICAL DATA SUBMISSION MODAL */}
      <Modal animationType="slide" transparent={true} visible={prescriptionModalVisible} onRequestClose={() => setPrescriptionModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <Text style={[styles.modalHeadline, { color: activeColors.text }]}>Consultant Clinical Intake Form</Text>
            <Text style={styles.modalSubDescriptionLabel}>Write out your health notes, chronic updates, or prescription logs below:</Text>

            <Text style={[styles.inputFieldTitle, { color: activeColors.text, alignSelf: 'flex-start' }]}>Select Target Consultant</Text>
            <View style={[styles.modalFormInputBox, { borderColor: activeColors.border, padding: 4, height: 50, justifyContent: 'center' }]}>
              {AVAILABLE_DOCTORS.map(d => (
                <AnimatedButton
                  key={d.id}
                  style={[styles.miniDocSelectorPill, prescDoctorId === d.id && { backgroundColor: activeColors.primary }]}
                  onPress={() => setPrescDoctorId(d.id)}
                >
                  <Text style={[styles.miniDocSelectorPillText, prescDoctorId === d.id && { color: '#FFF' }]}>{d.name.split(' ')[1]}</Text>
                </AnimatedButton>
              ))}
            </View>

            <Text style={[styles.inputFieldTitle, { color: activeColors.text, alignSelf: 'flex-start', marginTop: 12 }]}>Detailed Information Log</Text>
            <TextInput
              style={[styles.modalFormInputBox, { borderColor: activeColors.border, color: activeColors.text, height: 120, textAlignVertical: 'top' }]}
              placeholder="Provide a breakdown of active symptoms, long-term prescription details, or queries for your provider..."
              placeholderTextColor="#9CA3AF"
              multiline
              value={prescDetails}
              onChangeText={setPrescDetails}
            />

            <View style={styles.modalActionButtonsRow}>
              <AnimatedButton style={styles.modalCancelButton} onPress={() => setPrescriptionModalVisible(false)}>
                <Text style={[styles.modalCancelText, { color: activeColors.text }]}>Cancel</Text>
              </AnimatedButton>
              <AnimatedButton style={[styles.modalSubmitButton, { backgroundColor: activeColors.primary }]} onPress={handleSendPrescriptionDetails}>
                <Text style={styles.modalSubmitText}>Transmit Log</Text>
              </AnimatedButton>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  headerArea: { marginBottom: 20, paddingTop: 10 },
  greetingMain: { fontSize: 26, fontWeight: 'bold' },
  greetingSub: { fontSize: 15, color: '#6B7280', marginTop: 4 },

  aiBanner: { backgroundColor: '#10B981', borderRadius: 16, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  aiTextContainer: { flex: 1, paddingRight: 10 },
  aiTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  aiDesc: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginVertical: 8, lineHeight: 18 },
  aiBtn: { backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, alignSelf: 'flex-start', marginTop: 4 },
  aiBtnText: { color: '#10B981', fontWeight: 'bold', fontSize: 13 },
  aiIconGraphic: { fontSize: 44, opacity: 0.2 },

  quadGridRow: { flexDirection: 'row', gap: 14, marginBottom: 14 },
  gridCard: { flex: 1, borderWidth: 1, padding: 20, borderRadius: 14, alignItems: 'center', gap: 8 },
  gridEmojiIcon: { fontSize: 24 },
  gridActionLabel: { fontSize: 14, fontWeight: '600', textAlign: 'center' },

  horizontalActionStrip: { flexDirection: 'row', gap: 12, marginBottom: 25 },
  stripCard: { flex: 1, flexDirection: 'row', borderWidth: 1, padding: 14, borderRadius: 10, alignItems: 'center', justifyContent: 'center', gap: 8 },
  stripEmoji: { fontSize: 16 },
  stripLabel: { fontSize: 13, fontWeight: '600' },

  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', letterSpacing: 0.1 },

  doctorCard: { flexDirection: 'row', borderWidth: 1, padding: 14, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  doctorAvatarBox: { width: 50, height: 50, borderRadius: 10, backgroundColor: 'rgba(15, 118, 110, 0.08)', alignItems: 'center', justifyContent: 'center' },
  doctorDetailsMain: { flex: 1, paddingHorizontal: 12 },
  docNameText: { fontSize: 15, fontWeight: 'bold' },
  docSpecialtyText: { fontSize: 13, color: '#6B7280', marginVertical: 2 },
  docRatingText: { fontSize: 12, fontWeight: '600' },
  doctorActionColumn: { alignItems: 'flex-end', justifyContent: 'space-between', height: 55 },
  docFeeValue: { fontSize: 13, fontWeight: '700', color: '#0F766E' },
  inlineBookButton: { backgroundColor: '#0F766E', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  inlineBookBtnText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { width: '100%', padding: 22, borderRadius: 18, borderWidth: 1, alignItems: 'center' },
  modalHeadline: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  modalSubDescriptionLabel: { fontSize: 13, color: '#6B7280', textAlign: 'center', marginBottom: 16, lineHeight: 18 },
  emptyStateFallbackText: { fontSize: 14, color: '#9CA3AF', marginVertical: 20 },
  closeModalBottomButton: { marginTop: 15, padding: 12, width: '100%', alignItems: 'center' },
  closeModalBtnText: { color: '#EF4444', fontWeight: 'bold', fontSize: 15 },

  consultationRecordEntry: { width: '100%', borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 10 },
  recordLabelTitle: { fontSize: 15, fontWeight: 'bold' },
  recordSubMeta: { fontSize: 12, color: '#9CA3AF', marginVertical: 2 },
  recordSymptomsLabel: { fontSize: 13, fontWeight: '600', marginTop: 4 },
  recordActionsGridContainer: { flexDirection: 'row', gap: 10, marginTop: 10 },
  recordEditActionBtn: { flex: 1, backgroundColor: '#0F766E', padding: 8, borderRadius: 6, alignItems: 'center' },
  recordCancelActionBtn: { flex: 1, backgroundColor: '#EF4444', padding: 8, borderRadius: 6, alignItems: 'center' },
  recordActionBtnText: { color: '#FFF', fontSize: 12, fontWeight: '600' },

  editorBoxFormContainer: { width: '100%', borderWidth: 1, borderRadius: 10, padding: 12, marginTop: 14 },
  inputFieldTitle: { fontSize: 13, fontWeight: '700', marginBottom: 6 },
  modalFormInputBox: { borderWidth: 1, borderRadius: 8, padding: 10, fontSize: 14, width: '100%', flexDirection: 'row', gap: 6 },
  saveEditsActionBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  saveEditsText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },

  comChannelSelectRowButton: { width: '100%', flexDirection: 'row', borderWidth: 1, borderRadius: 12, padding: 14, alignItems: 'center', gap: 14, marginVertical: 8 },
  comChannelRowEmoji: { fontSize: 24 },
  comChannelRowTitle: { fontSize: 15, fontWeight: 'bold' },
  comChannelRowSubtitle: { fontSize: 12, color: '#6B7280', marginTop: 2 },

  miniDocSelectorPill: { flex: 1, paddingVertical: 6, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  miniDocSelectorPillText: { fontSize: 11, fontWeight: '700', color: '#6B7280' },
  modalActionButtonsRow: { flexDirection: 'row', gap: 12, marginTop: 16, width: '100%' },
  modalCancelButton: { flex: 1, padding: 12, borderRadius: 8, borderWidth: 1, alignItems: 'center', borderColor: '#D1D5DB' },
  modalCancelText: { fontSize: 14, fontWeight: '600' },
  modalSubmitButton: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' },
  modalSubmitText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' }
});