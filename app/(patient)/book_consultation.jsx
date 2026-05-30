
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import { Translations } from '../../constants/language';
import AnimatedButton from '../../Components/AnimatedButton';

export default function BookConsultation() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const t = Translations[lang];
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');



  // Dynamic choice state trackers mapped directly by Doctor IDs
  const [appointmentDates, setAppointmentDates] = useState({
    '1': '2026-06-01',
    '2': '2026-06-01'
  });
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({
    '1': '09:00 AM',
    '2': '02:00 PM'
  });

  const categories = [
    { id: 'General', label: lang === 'en' ? 'General' : 'Jumla', icon: '🩺' },
    { id: 'Maternal', label: lang === 'en' ? 'Maternal' : 'Uzazi', icon: '🤰' },
    { id: 'Heart', label: lang === 'en' ? 'Heart' : 'Moyo', icon: '❤️' },
    { id: 'Skin', label: lang === 'en' ? 'Skin' : 'Ngozi', icon: '膚' },
  ];

  const doctorsList = [
    {
      id: '1',
      name: 'Dr. Juma Bakari',
      specialty: lang === 'en' ? 'General Physician • 12 yrs exp' : 'Daktari Mkuu • Miaka 12 kazi',
      category: 'General',
      rating: '4.9',
      langTag: 'ENG | SWAH',
      price: '35,000 TZS',
      slots: ['09:00 AM', '11:30 AM', '03:00 PM']
    },
    {
      id: '2',
      name: 'Dr. Neema Mushi',
      specialty: lang === 'en' ? 'Cardiologist • 8 yrs exp' : 'Bingwa wa Moyo • Miaka 8 kazi',
      category: 'Heart',
      rating: '4.8',
      langTag: 'SWAH',
      price: '45,000 TZS',
      slots: ['10:00 AM', '02:00 PM', '04:30 PM']
    }
  ];

  // Handles text updates for individual doctor dates
  const handleDateChange = (doctorId, dateText) => {
    setAppointmentDates(prev => ({ ...prev, [doctorId]: dateText }));
  };

  // Handles pill selection updates for individual doctor slots
  const handleSlotSelect = (doctorId, slotTime) => {
    setSelectedTimeSlots(prev => ({ ...prev, [doctorId]: slotTime }));
  };

  // Captures structural parameters and prints output validation log state
  const handleAddToCart = (doc) => {
    const chosenDate = appointmentDates[doc.id] || '2026-06-01';
    const chosenSlot = selectedTimeSlots[doc.id];

    // Assembly matching structural criteria exactly
    const cartItem = {
      doctorId: doc.id,
      consultationType: doc.category,
      date: chosenDate,
      timeSlot: chosenSlot,
      consultationFee: doc.price
    };

    // System localization parameters payload rendering
    const successMsg = t.cartSuccessMessage
      .replace('{doc}', doc.name)
      .replace('{type}', cartItem.consultationType)
      .replace('{date}', cartItem.date)
      .replace('{slot}', cartItem.timeSlot)
      .replace('{fee}', cartItem.consultationFee);

    router.push('/(patient)/cart_screen');
    console.log('Stored Cart Item Object Structure Context: ', cartItem);
  };

  return (
    <View style={[styles.mainWrapper, { backgroundColor: activeColors.background }]}>
      {/* Top Header Section */}
      <View style={styles.headerBlock}>
        <Text style={[styles.headerTitle, { color: activeColors.text }]}>
          {lang === 'en' ? 'Book a Consultation' : 'Weka Nafasi ya Ushauri'}
        </Text>
      </View>

      {/* Persistent Search Bar Input Elements */}
      <View style={[styles.searchContainer, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={[styles.searchInput, { color: activeColors.text }]}
          placeholder={lang === 'en' ? 'Search doctor or clinic...' : 'Tafuta daktari au kliniki...'}
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Categories Section */}
        <Text style={[styles.sectionTitle, { color: activeColors.text }]}>
          {lang === 'en' ? 'Categories' : 'Vipengele'}
        </Text>
        <View style={styles.categoriesRow}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <AnimatedButton
                key={cat.id}
                style={[
                  styles.categoryCard,
                  { backgroundColor: activeColors.surface, borderColor: isSelected ? activeColors.primary : activeColors.border }
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text style={[styles.categoryLabel, { color: activeColors.text }]}>{cat.label}</Text>
              </AnimatedButton>
            );
          })}
        </View>

        {/* Available Doctors List */}
        <Text style={[styles.sectionTitle, { color: activeColors.text }]}>
          {lang === 'en' ? 'Available Doctors' : 'Madaktari Waliopo'}
        </Text>

        {doctorsList.map((doc) => (
          <View key={doc.id} style={[styles.doctorCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.doctorAvatarBox}>
                <Text style={styles.doctorAvatarEmoji}>👨‍⚕️</Text>
              </View>
              <View style={styles.doctorDetailsInfo}>
                <Text style={[styles.doctorName, { color: activeColors.text }]}>{doc.name}</Text>
                <Text style={styles.doctorSpecialtyText}>{doc.specialty}</Text>
                <Text style={styles.doctorRatingText}>⭐ {doc.rating}  •  {doc.langTag}</Text>
                <Text style={[styles.doctorPrice, { color: activeColors.primary }]}>{doc.price}</Text>
              </View>
            </View>

            {/* NEW EXTENSION MATRIX BLOCK: DATE & TIME SLOT SELECTORS */}
            <View style={[styles.schedulingSubsystemDivider, { borderTopColor: activeColors.border }]}>
              {/* Date Input Field */}
              <Text style={[styles.schedulingSectionLabel, { color: activeColors.text }]}>{t.selectDate || 'Select Date:'}</Text>
              <TextInput
                style={[styles.dateInputField, { borderColor: activeColors.border, color: activeColors.text, backgroundColor: activeColors.background }]}
                value={appointmentDates[doc.id]}
                onChangeText={(txt) => handleDateChange(doc.id, txt)}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#6B7280"
              />

              {/* Slots Options Array Grid mapping */}
              <Text style={[styles.schedulingSectionLabel, { color: activeColors.text, marginTop: 10 }]}>{t.availableSlots || 'Available Slots:'}</Text>
              <View style={styles.slotsContainerMatrixRow}>
                {doc.slots.map((slot) => {
                  const isSlotSelected = selectedTimeSlots[doc.id] === slot;
                  return (
                    <AnimatedButton
                      key={slot}
                      style={[
                        styles.slotPillElement,
                        { 
                          backgroundColor: isSlotSelected ? activeColors.primary : activeColors.background,
                          borderColor: isSlotSelected ? activeColors.primary : activeColors.border 
                        }
                      ]}
                      onPress={() => handleSlotSelect(doc.id, slot)}
                    >
                      <Text style={[styles.slotPillText, { color: isSlotSelected ? '#FFF' : activeColors.text }]}>
                        {slot}
                      </Text>
                    </AnimatedButton>
                  );
                })}
              </View>
            </View>

            {/* Operational Form Trigger Rows Buttons */}
            <View style={styles.doctorCardActionsRow}>
              <AnimatedButton 
                style={[styles.cartBtn, { borderColor: activeColors.border }]}
                onPress={() => handleAddToCart(doc)}
              >
                <Text style={[styles.cartBtnText, { color: activeColors.text }]}>
                  {t.addToCart || 'Add to Cart 🛒'}
                </Text>
              </AnimatedButton>
              <AnimatedButton 
                style={[styles.bookBtn, { backgroundColor: activeColors.primary }]}
                onPress={() => router.push({
                  pathname: '/(patient)/doctor_profile',
                  params: { id: doc.id, name: doc.name, price: doc.price, specialty: doc.specialty }
                })}
              >
                <Text style={styles.bookBtnText}>{t.bookNow || 'Book Now'}</Text>
              </AnimatedButton>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Action Button (FAB) */}
      <AnimatedButton
        style={[styles.floatingActionButton, { backgroundColor: activeColors.primary }]}
        onPress={() => router.push('/(patient)/add_consultation')}
      >
        <Text style={styles.floatingButtonPlusSymbol}>+</Text>
      </AnimatedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, paddingHorizontal: 20, paddingTop: 50 },
  headerBlock: { marginBottom: 16 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, height: 50, marginBottom: 20 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginVertical: 12 },
  categoriesRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  categoryCard: { width: '22%', padding: 12, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  categoryIcon: { fontSize: 22, marginBottom: 6 },
  categoryLabel: { fontSize: 11, fontWeight: '600' },
  
  // Extended Doctor Card Styling Layout Blocks
  doctorCard: { flexDirection: 'column', padding: 16, borderRadius: 16, borderWidth: 1, marginBottom: 16 },
  doctorAvatarBox: { width: 65, height: 65, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.03)', alignItems: 'center', justifyContent: 'center' },
  doctorAvatarEmoji: { fontSize: 32 },
  doctorDetailsInfo: { flex: 1, marginLeft: 14 },
  doctorName: { fontSize: 16, fontWeight: 'bold' },
  doctorSpecialtyText: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },
  doctorRatingText: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  doctorPrice: { fontSize: 15, fontWeight: '700', marginTop: 6 },
  
  // Embedded Selection Subsystem Styles
  schedulingSubsystemDivider: { borderTopWidth: 1, marginTop: 14, paddingTop: 12 },
  schedulingSectionLabel: { fontSize: 12, fontWeight: '700', marginBottom: 6 },
  dateInputField: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, height: 40, fontSize: 14 },
  slotsContainerMatrixRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  slotPillElement: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, alignItems: 'center', justifyContent: 'center' },
  slotPillText: { fontSize: 11, fontWeight: '600' },

  doctorCardActionsRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
  cartBtn: { flex: 1, borderWidth: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  cartBtnText: { fontSize: 12, fontWeight: '600' },
  bookBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  bookBtnText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  
  floatingActionButton: { position: 'absolute', bottom: 85, right: 20, width: 56, height: 56, borderRadius: 28, 
    alignItems: 'center', justifyContent: 'center', elevation: 5,
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3, shadowRadius: 4.65 },
  floatingButtonPlusSymbol: { color: '#FFF', fontSize: 28, fontWeight: '300', marginTop: -2 }
});