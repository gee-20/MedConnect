import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import { Translations } from '../../constants/language';
import AnimatedButton from '../../Components/AnimatedButton';

export default function CheckoutScreen() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const t = Translations[lang];
  const router = useRouter();
  const params = useLocalSearchParams(); // Inherited item summary parameters from cart file

  const [selectedPaymentProvider, setSelectedPaymentProvider] = useState('mpesa');

  const handlePaymentSubmit = () => {
    router.push({
      pathname: '/(patient)/confirmation_screen',
      params: { ...params }
    });
  };

  return (
    <View style={[styles.outerSafeAreaFrame, { backgroundColor: activeColors.background }]}>
      <View style={[styles.globalNavigationBarHeader, { borderBottomColor: activeColors.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backNavArrowText, { color: activeColors.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.brandHeaderTitleText, { color: activeColors.text }]}>{t.checkout}</Text>
        <Text style={{ opacity: 0 }}>🛒</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollLayoutGapping}>
        <Text style={[styles.sectionHeadingStandardTextLabel, { color: activeColors.text }]}>{t.bookingSummary}</Text>
        
        <View style={[styles.masterProceduralCardBody, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <View style={styles.doctorItemIdentityLayoutRow}>
            <View style={styles.avatarBackupContainerBox}><Text style={{ fontSize: 24 }}>👨‍⚕️</Text></View>
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.practitionerHeadingRowOverheadLabel}>{t.practitioner}</Text>
              <Text style={[styles.cardDoctorMainTitleText, { color: activeColors.text }]}>{params.doctorName}</Text>
              <Text style={styles.subtextMetaRowDescription}>{params.specialty}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.totalPayableBannerBlockContainer, { backgroundColor: activeColors.primary }]}>
          <Text style={styles.totalPayableOverheadTextTag}>{t.totalPayable}</Text>
          <Text style={styles.totalPayableAmountHeroText}>{params.totalAggregateSum}</Text>
        </View>

        <View style={[styles.masterProceduralCardBody, { backgroundColor: activeColors.surface, borderColor: activeColors.border, paddingVertical: 4 }]}>
          <View style={styles.tableDetailRowBoundaryContainer}>
            <Text style={styles.tableDetailRowFieldLabelText}>📹 {t.consultationType}</Text>
            <Text style={[styles.tableDetailRowValueBoldText, { color: activeColors.text }]}>{params.type}</Text>
          </View>
          <View style={[styles.tableDetailRowBoundaryContainer, { borderTopWidth: 1, borderTopColor: activeColors.border }]}>
            <Text style={styles.tableDetailRowFieldLabelText}>📅 {t.appointmentDate}</Text>
            <Text style={[styles.tableDetailRowValueBoldText, { color: activeColors.text }]}>{params.date}</Text>
          </View>
          <View style={[styles.tableDetailRowBoundaryContainer, { borderTopWidth: 1, borderTopColor: activeColors.border }]}>
            <Text style={styles.tableDetailRowFieldLabelText}>🕒 {t.appointmentTime}</Text>
            <Text style={[styles.tableDetailRowValueBoldText, { color: activeColors.text }]}>{params.time}</Text>
          </View>
        </View>

        <Text style={[styles.sectionHeadingStandardTextLabel, { color: activeColors.text }]}>{t.paymentMethod}</Text>

        {/* Payment Channels Matrix Map */}
        {[
          { id: 'mpesa', title: 'M-Pesa', desc: 'Vodacom Tanzania', icon: '📱' },
          { id: 'airtel', title: 'Airtel Money', desc: 'Airtel Tanzania', icon: '💼' },
          { id: 'tigo', title: 'Tigo Pesa', desc: 'Tigo Tanzania', icon: '💵' },
          { id: 'card', title: 'Card Payment', desc: 'Visa, Mastercard', icon: '💳' },
        ].map(provider => (
          <TouchableOpacity 
            key={provider.id}
            style={[styles.paymentMethodSelectableRowOption, { backgroundColor: activeColors.surface, borderColor: selectedPaymentProvider === provider.id ? activeColors.primary : activeColors.border }]}
            onPress={() => setSelectedPaymentProvider(provider.id)}
          >
            <View style={styles.paymentMethodRowLeftGroupIconLayout}>
              <View style={styles.paymentMethodSquareLogoIconHolder}><Text style={{ fontSize: 18 }}>{provider.icon}</Text></View>
              <View style={{ marginLeft: 12 }}>
                <Text style={[styles.paymentMethodProviderTitleLabel, { color: activeColors.text }]}>{provider.title}</Text>
                <Text style={styles.paymentMethodProviderSubtextDescription}>{provider.desc}</Text>
              </View>
            </View>
            <View style={[styles.outerRadioCheckmarkCircle, { borderColor: activeColors.primary }]}>
              {selectedPaymentProvider === provider.id && <View style={[styles.innerRadioFilledDotCircle, { backgroundColor: activeColors.primary }]} />}
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.legalNoticeParagraphTextLabel}>{t.termsNotice}</Text>
        <AnimatedButton style={[styles.primaryActionBlockLongButton, { backgroundColor: activeColors.primary }]} onPress={handlePaymentSubmit}>
          <Text style={styles.primaryActionButtonLabelText}>🛡️ {t.confirmAndPay}</Text>
        </AnimatedButton>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerSafeAreaFrame: { flex: 1, paddingTop: Platform.OS === 'ios' ? 40 : 15 },
  globalNavigationBarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1 },
  backNavArrowText: { fontSize: 22, fontWeight: '300' },
  brandHeaderTitleText: { fontSize: 18, fontWeight: 'bold', color: '#0F766E' },
  scrollLayoutGapping: { padding: 20, paddingBottom: 60 },
  sectionHeadingStandardTextLabel: { fontSize: 15, fontWeight: '700', marginBottom: 10, marginTop: 6 },
  masterProceduralCardBody: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 16 },
  doctorItemIdentityLayoutRow: { flexDirection: 'row', alignItems: 'center' },
  avatarBackupContainerBox: { width: 50, height: 50, borderRadius: 10, backgroundColor: 'rgba(15,118,110,0.08)', alignItems: 'center', justifyContent: 'center' },
  practitionerHeadingRowOverheadLabel: { fontSize: 10, fontWeight: '700', color: '#10B981', letterSpacing: 0.5 },
  cardDoctorMainTitleText: { fontSize: 16, fontWeight: 'bold' },
  subtextMetaRowDescription: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  totalPayableBannerBlockContainer: { borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 16 },
  totalPayableOverheadTextTag: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  totalPayableAmountHeroText: { color: '#FFF', fontSize: 26, fontWeight: '800', marginTop: 2 },
  tableDetailRowBoundaryContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, alignItems: 'center' },
  tableDetailRowFieldLabelText: { fontSize: 13, color: '#6B7280', fontWeight: '500' },
  tableDetailRowValueBoldText: { fontSize: 13, fontWeight: '700' },
  paymentMethodSelectableRowOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 12, borderWidth: 1, padding: 14, marginBottom: 10 },
  paymentMethodRowLeftGroupIconLayout: { flexDirection: 'row', alignItems: 'center' },
  paymentMethodSquareLogoIconHolder: { width: 36, height: 36, borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.03)', alignItems: 'center', justifyContent: 'center' },
  paymentMethodProviderTitleLabel: { fontSize: 14, fontWeight: '700' },
  paymentMethodProviderSubtextDescription: { fontSize: 11, color: '#9CA3AF' },
  outerRadioCheckmarkCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  innerRadioFilledDotCircle: { width: 10, height: 10, borderRadius: 5 },
  legalNoticeParagraphTextLabel: { fontSize: 11, color: '#9CA3AF', textAlign: 'center', marginVertical: 12, lineHeight: 16 },
  primaryActionBlockLongButton: { borderRadius: 12, paddingVertical: 14, alignItems: 'center', justifyContent: 'center', marginTop: 14, width: '100%' },
  primaryActionButtonLabelText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 }
});