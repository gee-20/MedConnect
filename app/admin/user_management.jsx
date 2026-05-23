import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../../Components/AnimatedButton';

export default function UserManagement() {
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];

  const [pendingDoctors, setPendingDoctors] = useState([
    { id: '1', name: 'Dr. Michael John', license: 'MD-20641-TZ', specialty: 'Cardiology' },
    { id: '2', name: 'Dr. Sarah M. Kiswahili', license: 'MD-88123-TZ', specialty: 'Pediatrics' },
  ]);

  const handleVerify = (id, name) => {
    Alert.alert("Doctor Approved", `${name} has been verified and activated successfully.`);
    setPendingDoctors(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <Text style={[styles.title, { color: activeColors.text }]}>Pending Verifications (Admins Only)</Text>
      <Text style={styles.subtitle}>Review doctor credentials carefully before system approval.</Text>

      <FlatList
        data={pendingDoctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <Text style={[styles.docName, { color: activeColors.text }]}>{item.name}</Text>
            <Text style={styles.details}>License: {item.license}</Text>
            <Text style={styles.details}>Specialty: {item.specialty}</Text>

            <View style={styles.btnGroup}>
              <AnimatedButton style={[styles.verifyBtn, { backgroundColor: activeColors.primary }]} onPress={() => handleVerify(item.id, item.name)}>
                <Text style={styles.btnText}>Verify</Text>
              </AnimatedButton>
              <AnimatedButton style={styles.rejectBtn}>
                <Text style={styles.btnText}>Reject</Text>
              </AnimatedButton>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  subtitle: { color: '#9CA3AF', fontSize: 13, marginBottom: 20, marginTop: 4 },
  card: { padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 14 },
  docName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  details: { color: '#6B7280', fontSize: 14, marginBottom: 2 },
  btnGroup: { flexDirection: 'row', gap: 10, marginTop: 14 },
  verifyBtn: { flex: 1, padding: 10, borderRadius: 8, alignItems: 'center' },
  rejectBtn: { flex: 1, padding: 10, borderRadius: 8, backgroundColor: '#EF4444', alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold' }
});