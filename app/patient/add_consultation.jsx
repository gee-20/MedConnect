import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../../Components/AnimatedButton';

export default function AddConsultation() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const router = useRouter();

  const [symptoms, setSymptoms] = useState('');
  const [preferredSpecialty, setPreferredSpecialty] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState('Routine');

  const handleSubmitConsultation = () => {
    if (!symptoms || !preferredSpecialty) {
      Alert.alert(
        lang === 'en' ? 'Missing Details' : 'Taarifa Hazijakamilika',
        lang === 'en' ? 'Please detail your medical state.' : 'Tafadhali eleza changamoto yako ya kiafya.'
      );
      return;
    }

    Alert.alert(
      lang === 'en' ? 'Consultation Created' : 'Ushauri Umesajiliwa',
      lang === 'en' ? 'Your case file has been assigned to matching practitioners.' : 'Jalada lako limetumwa kwa madaktari husika.',
      [{ text: 'OK', onPress: () => router.replace('/(patient)/book_consultation') }]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: activeColors.background }]} contentContainerStyle={{ padding: 24, paddingTop: 60 }}>
      {/* Top Navigation Row */}
      <AnimatedButton style={styles.backBtn} onPress={() => router.back()}>
        <Text style={{ color: activeColors.primary, fontSize: 16, fontWeight: '600' }}>
          {lang === 'en' ? '← Back' : '← Rudi'}
        </Text>
      </AnimatedButton>

      <Text style={[styles.mainHeading, { color: activeColors.text }]}>
        {lang === 'en' ? 'New Consultation File' : 'Sajili Faili Jipya la Ushauri'}
      </Text>
      <Text style={styles.subtitle}>
        {lang === 'en' ? 'Detail your clinical state to initiate safe expert connection pipelines.' : 'Eleza hali yako ili uunganishwe kwa usalama na madaktari wetu.'}
      </Text>

      {/* Specialty Segment */}
      <Text style={[styles.fieldLabel, { color: activeColors.text }]}>
        {lang === 'en' ? 'Target Medical Specialty' : 'Idara ya Matibabu Inayohitajika'}
      </Text>
      <TextInput
        style={[styles.inputBox, { borderColor: activeColors.border, color: activeColors.text, backgroundColor: activeColors.surface }]}
        placeholder={lang === 'en' ? 'e.g., Pediatrics, Dermatology' : 'Mfano: Watoto, Magonjwa ya Ngozi'}
        placeholderTextColor="#9CA3AF"
        value={preferredSpecialty}
        onChangeText={setPreferredSpecialty}
      />

      {/* Urgency Selection Matrices */}
      <Text style={[styles.fieldLabel, { color: activeColors.text }]}>
        {lang === 'en' ? 'Urgency Priority State' : 'Hali ya Haraka'}
      </Text>
      <View style={styles.urgencyRow}>
        {['Routine', 'Urgent'].map((level) => {
          const isCurrent = urgencyLevel === level;
          return (
            <AnimatedButton
              key={level}
              style={[
                styles.urgencySegment,
                { backgroundColor: isCurrent ? (level === 'Urgent' ? '#EF4444' : activeColors.primary) : activeColors.surface, borderColor: activeColors.border }
              ]}
              onPress={() => setUrgencyLevel(level)}
            >
              <Text style={[styles.urgencyText, { color: isCurrent ? '#FFF' : '#6B7280' }]}>
                {level === 'Urgent' ? (lang === 'en' ? 'Urgent' : 'Ya Dharura') : (lang === 'en' ? 'Routine' : 'Kawaida')}
              </Text>
            </AnimatedButton>
          );
        })}
      </View>

      {/* Symptoms Inputs Field */}
      <Text style={[styles.fieldLabel, { color: activeColors.text }]}>
        {lang === 'en' ? 'Describe Symptoms / Conditions' : 'Eleza Dalili / Matatizo yako'}
      </Text>
      <TextInput
        style={[styles.textAreaBox, { borderColor: activeColors.border, color: activeColors.text, backgroundColor: activeColors.surface }]}
        placeholder={lang === 'en' ? 'Detail your symptoms, pain points, or timeline duration...' : 'Andika kwa urefu dalili, maumivu, au muda tangu yajitokeze...'}
        placeholderTextColor="#9CA3AF"
        multiline
        numberOfLines={6}
        value={symptoms}
        onChangeText={setSymptoms}
      />

      {/* Complete Actions Submissions button */}
      <AnimatedButton
        style={[styles.submitFormActionBtn, { backgroundColor: activeColors.primary }]}
        onPress={handleSubmitConsultation}
      >
        <Text style={styles.submitFormActionText}>
          {lang === 'en' ? 'Broadcast to Online Doctors' : 'Tuma kwa Madaktari Waliopo'}
        </Text>
      </AnimatedButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backBtn: { alignSelf: 'flex-start', marginBottom: 20 },
  mainHeading: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#9CA3AF', marginTop: 6, marginBottom: 28, lineHeight: 20 },
  fieldLabel: { fontSize: 13, fontWeight: '700', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.3 },
  inputBox: { borderWidth: 1, borderRadius: 10, padding: 14, fontSize: 15, marginBottom: 20 },
  urgencyRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  urgencySegment: { flex: 1, paddingVertical: 12, borderWidth: 1, borderRadius: 10, alignItems: 'center' },
  urgencyText: { fontWeight: 'bold', fontSize: 14 },
  textAreaBox: { borderWidth: 1, borderRadius: 12, padding: 14, fontSize: 15, height: 120, textAlignVertical: 'top', marginBottom: 32 },
  submitFormActionBtn: { padding: 16, borderRadius: 12, alignItems: 'center' },
  submitFormActionText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});