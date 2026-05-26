import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, FlatList } from 'react-native';
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
      rating: '4.9',
      langTag: 'ENG | SWAH',
      price: '35,000 TZS',
      status: 'Online'
    },
    {
      id: '2',
      name: 'Dr. Neema Mushi',
      specialty: lang === 'en' ? 'Cardiologist • 8 yrs exp' : 'Bingwa wa Moyo • Miaka 8 kazi',
      rating: '4.8',
      langTag: 'SWAH',
      price: '45,000 TZS',
      status: 'Online'
    }
  ];

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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Categories Section horizontal array mapping */}
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

        {/* Available Doctors List rendering matching mockups */}
        <Text style={[styles.sectionTitle, { color: activeColors.text }]}>
          {lang === 'en' ? 'Available Doctors' : 'Madaktari Waliopo'}
        </Text>

        {doctorsList.map((doc) => (
          <View key={doc.id} style={[styles.doctorCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <View style={styles.doctorAvatarBox}>
              <Text style={styles.doctorAvatarEmoji}>👨‍⚕️</Text>
            </View>
            <View style={styles.doctorDetailsInfo}>
              <Text style={[styles.doctorName, { color: activeColors.text }]}>{doc.name}</Text>
              <Text style={styles.doctorSpecialtyText}>{doc.specialty}</Text>
              <Text style={styles.doctorRatingText}>⭐ {doc.rating}  •  {doc.langTag}</Text>
              <Text style={[styles.doctorPrice, { color: activeColors.primary }]}>{doc.price}</Text>
              
              <View style={styles.doctorCardActionsRow}>
                <AnimatedButton style={[styles.cartBtn, { borderColor: activeColors.border }]}>
                  <Text style={[styles.cartBtnText, { color: activeColors.text }]}>{t.addToCart}</Text>
                </AnimatedButton>
                <AnimatedButton 
                  style={[styles.bookBtn, { backgroundColor: activeColors.primary }]}
                  onPress={() => router.push({
                    pathname: '/(patient)/doctor_profile',
                    params: { id: doc.id, name: doc.name, price: doc.price, specialty: doc.specialty }
                  })}
                >
                  <Text style={styles.bookBtnText}>{t.bookNow}</Text>
                </AnimatedButton>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Dynamic Action Button (FAB) for Adding a New Consultation Request */}
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
  doctorCard: { flexDirection: 'row', padding: 16, borderRadius: 16, borderWidth: 1, marginBottom: 16 },
  doctorAvatarBox: { width: 65, height: 65, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.03)', alignItems: 'center', justifyContent: 'center' },
  doctorAvatarEmoji: { fontSize: 32 },
  doctorDetailsInfo: { flex: 1, marginLeft: 14 },
  doctorName: { fontSize: 16, fontWeight: 'bold' },
  doctorSpecialtyText: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },
  doctorRatingText: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  doctorPrice: { fontSize: 15, fontWeight: '700', marginTop: 6 },
  doctorCardActionsRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  cartBtn: { flex: 1, borderWidth: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  cartBtnText: { fontSize: 12, fontWeight: '600' },
  bookBtn: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  bookBtnText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  floatingActionButton: { position: 'absolute', bottom: 85, right: 20, width: 56, height: 56, borderRadius: 28, 
    alignItems: 'center', justifyContent: 'center', elevation: 5,
     shadowColor: '#000', shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3, shadowRadius: 4.65 },
  floatingButtonPlusSymbol: { color: '#FFF', fontSize: 28, fontWeight: '300', marginTop: -2 }
});