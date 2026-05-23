import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../../Components/AnimatedButton';

export default function DoctorQueue() {
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];

  const queueData = [
    { id: '1', name: 'Juma Maziku', time: '09:45 AM', status: 'Urgent', symptom: 'Severe chest pain, Shortness of breath' },
    { id: '2', name: 'Amina Khalfan', time: '10:30 AM', status: 'Stable', symptom: 'Routine prenatal follow-up' },
    { id: '3', name: 'Elias Mwangi', time: '11:15 AM', status: 'Follow-up', symptom: 'Post-surgery review' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <View style={styles.topSummary}>
        <Text style={[styles.title, { color: activeColors.text }]}>Karibu, Dr. Mwemba</Text>
        <Text style={styles.subtitle}>Here is your clinical overview for today.</Text>
      </View>

      <FlatList
        data={queueData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.patientName, { color: activeColors.text }]}>{item.name}</Text>
              <View style={[styles.badge, { backgroundColor: item.status === 'Urgent' ? '#EF4444' : '#10B981' }]}>
                <Text style={styles.badgeText}>{item.status}</Text>
              </View>
            </View>
            
            <Text style={styles.timeText}>🕒 Appointment: {item.time}</Text>
            <Text style={[styles.symptomText, { color: activeColors.text }]}>
              <Text style={{ fontWeight: 'bold' }}>Symptoms: </Text>{item.symptom}
            </Text>

            <View style={styles.actionRow}>
              <AnimatedButton style={[styles.actionBtn, { backgroundColor: activeColors.primary }]}>
                <Text style={styles.btnText}>📹 Join Call</Text>
              </AnimatedButton>
              <AnimatedButton style={[styles.secondaryBtn, { borderColor: activeColors.border }]}>
                <Text style={[styles.secondaryBtnText, { color: activeColors.text }]}>Reschedule</Text>
              </AnimatedButton>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  topSummary: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: '#9CA3AF', fontSize: 14, marginTop: 4 },
  card: { padding: 16, borderRadius: 16, borderWidth: 1, marginBottom: 14 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  patientName: { fontSize: 18, fontWeight: 'bold' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  timeText: { color: '#6B7280', fontSize: 14, marginBottom: 8 },
  symptomText: { fontSize: 14, marginBottom: 16 },
  actionRow: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1, padding: 12, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold' },
  secondaryBtn: { flex: 1, padding: 12, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  secondaryBtnText: { fontWeight: '600' }
});