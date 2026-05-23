import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../../Components/AnimatedButton';

export default function WritePrescription() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];

  const [patient, setPatient] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [medication, setMedication] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSend = () => {
    if (!patient || !medication) {
      Alert.alert("Missing Info", "Please provide a patient name and medication details.");
      return;
    }
    Alert.alert("Success", `Prescription forwarded digitally to ${patient}`);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: activeColors.background }]} contentContainerStyle={{ padding: 20 }}>
      <Text style={[styles.mainHeading, { color: activeColors.text }]}>Digital Prescription Builder</Text>
      
      <Text style={[styles.label, { color: activeColors.text }]}>Patient Name / Jina la Mgonjwa</Text>
      <TextInput 
        style={[styles.input, { borderColor: activeColors.border, color: activeColors.text, backgroundColor: activeColors.surface }]}
        value={patient} onChangeText={setPatient} placeholder="e.g. Salome K." placeholderTextColor="#9CA3AF"
      />

      <Text style={[styles.label, { color: activeColors.text }]}>Diagnosis / Utambuzi</Text>
      <TextInput 
        style={[styles.input, { borderColor: activeColors.border, color: activeColors.text, backgroundColor: activeColors.surface }]}
        value={diagnosis} onChangeText={setDiagnosis} placeholder="e.g. Malaria" placeholderTextColor="#9CA3AF"
      />

      <Text style={[styles.label, { color: activeColors.text }]}>Medicine / Dawa</Text>
      <TextInput 
        style={[styles.input, { borderColor: activeColors.border, color: activeColors.text, backgroundColor: activeColors.surface }]}
        value={medication} onChangeText={setMedication} placeholder="e.g. Artemether/Lumefantrine" placeholderTextColor="#9CA3AF"
      />

      <Text style={[styles.label, { color: activeColors.text }]}>Instructions / Maelekezo ya Matumizi</Text>
      <TextInput 
        style={[styles.input, { borderColor: activeColors.border, color: activeColors.text, backgroundColor: activeColors.surface, height: 80 }]}
        value={instructions} onChangeText={setInstructions} placeholder="Take after meals. Kunywa baada ya chakula." placeholderTextColor="#9CA3AF"
        multiline
      />

      <AnimatedButton style={[styles.submitBtn, { backgroundColor: activeColors.primary }]} onPress={handleSend}>
        <Text style={styles.submitBtnText}>🚀 Send to Patient App</Text>
      </AnimatedButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mainHeading: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, marginTop: 10 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 18, fontSize: 15 },
  submitBtn: { padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  submitBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});