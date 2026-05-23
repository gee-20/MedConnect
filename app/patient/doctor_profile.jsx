import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../../Components/AnimatedButton';
import { useRouter } from 'expo-router';

export default function DoctorProfile() {
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];
  const router = useRouter();

  const mockBio = "Dr. Kwesi Mensah is a board-certified cardiologist with over 12 years of experience in diagnosing and treating cardiovascular health problems. Completed residency training in Nairobi and leverages telemedicine options across East Africa.";

  return (
    <ScrollView style={[styles.container, { backgroundColor: activeColors.background }]} contentContainerStyle={{ paddingBottom: 30 }}>
      {/* Header Profile Section */}
      <View style={styles.avatarCentered}>
        <View style={styles.largeAvatar}>
          <Text style={styles.largeAvatarText}>KM</Text>
        </View>
        <Text style={[styles.profileName, { color: activeColors.text }]}>Dr. Kwesi Mensah</Text>
        <Text style={styles.profileSpecialty}>Senior Cardiologist</Text>
        <Text style={styles.metaRating}>⭐ 4.9 (120+ reviews)  •  💼 12 Years Exp.</Text>
      </View>

      {/* Practical Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statItem, { backgroundColor: activeColors.surface }]}>
          <Text style={[styles.statValue, { color: activeColors.primary }]}>2.5k+</Text>
          <Text style={styles.statLabel}>Patients</Text>
        </View>
        <View style={[styles.statItem, { backgroundColor: activeColors.surface }]}>
          <Text style={[styles.statValue, { color: activeColors.primary }]}>1.8k</Text>
          <Text style={styles.statLabel}>Consultations</Text>
        </View>
      </View>

      {/* Biography */}
      <Text style={[styles.blockTitle, { color: activeColors.text }]}>Biography</Text>
      <Text style={[styles.bodyText, { color: activeColors.text }]}>{mockBio}</Text>

      {/* Specialties Tags */}
      <Text style={[styles.blockTitle, { color: activeColors.text }]}>Specialties</Text>
      <View style={styles.tagWrapper}>
        {['Hypertension', 'Heart Failure', 'Preventative Care', 'Echocardiography'].map((tag, idx) => (
          <View key={idx} style={[styles.tag, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <Text style={[styles.tagText, { color: activeColors.text }]}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Checkout Navigation Actions */}
      <View style={styles.pricingSection}>
        <View>
          <Text style={styles.priceLabel}>Consultation Fee</Text>
          <Text style={[styles.priceValue, { color: activeColors.text }]}>KES 3,500</Text>
        </View>
        <AnimatedButton 
          style={[styles.bookActionBtn, { backgroundColor: activeColors.primary }]}
          onPress={() => router.push('/(patient)/book_consultation')}
        >
          <Text style={styles.bookActionText}>Book Appointment</Text>
        </AnimatedButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  avatarCentered: { alignItems: 'center', marginTop: 15, marginBottom: 20 },
  largeAvatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#0F766E', justifyContent: 'center', alignItems: 'center' },
  largeAvatarText: { color: '#FFF', fontSize: 32, fontWeight: 'bold' },
  profileName: { fontSize: 22, fontWeight: 'bold', marginTop: 12 },
  profileSpecialty: { color: '#6B7280', fontSize: 15, marginTop: 2 },
  metaRating: { fontSize: 13, color: '#9CA3AF', marginTop: 6 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statItem: { flex: 1, padding: 14, borderRadius: 12, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  blockTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginTop: 12 },
  bodyText: { fontSize: 14, lineHeight: 22, color: '#4B5563' },
  tagWrapper: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  tagText: { fontSize: 12, fontWeight: '500' },
  pricingSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, paddingTop: 16, borderTopWidth: 1, borderColor: '#E5E7EB' },
  priceLabel: { fontSize: 12, color: '#9CA3AF' },
  priceValue: { fontSize: 20, fontWeight: 'bold' },
  bookActionBtn: { paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12 },
  bookActionText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 }
});