import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import { Translations } from '../../constants/language';
import AnimatedButton from '../../Components/AnimatedButton';

export default function CartScreen() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const t = Translations[lang];
  const router = useRouter();

  // Mock Active Booking Details
  const activeBookingPayload = {
    id: '1',
    doctorName: 'Dr. Juma Ally',
    specialty: lang === 'en' ? 'General Physician' : 'Daktari Mkuu',
    type: lang === 'en' ? 'Video Call' : 'Ushauri wa Video',
    date: '10 Jun 2026',
    time: '10:00 AM',
    feeAmount: 'TZS 10,000',
    serviceCost: 'TZS 500',
    totalAggregateSum: 'TZS 10,500'
  };

  const handleProceed = () => {
    router.push({
      pathname: '/(patient)/checkout_screen',
      params: { ...activeBookingPayload }
    });
  };

  return (
    <View style={[styles.outerSafeAreaFrame, { backgroundColor: activeColors.background }]}>
      <View style={[styles.globalNavigationBarHeader, { borderBottomColor: activeColors.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backNavArrowText, { color: activeColors.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.brandHeaderTitleText, { color: activeColors.text }]}>AfyaDirect</Text>
        <View style={styles.cartBadgeIndicatorBox}>
          <Text style={styles.cartIconGlyph}>🛒</Text>
          <View style={styles.badgeNumericalCounterCircle}><Text style={styles.badgeCountDigits}>1</Text></View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollLayoutGapping}>
        <View style={styles.contextMetaIntroductionRow}>
          <Text style={[styles.headlineScreenMainLabel, { color: activeColors.text }]}>{t.yourCart}</Text>
          <Text style={styles.subtextMetaRowDescription}>• {t.reviewBookings}</Text>
        </View>

        {/* Cart Item Card */}
        <View style={[styles.masterProceduralCardBody, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <View style={styles.doctorItemIdentityLayoutRow}>
            <View style={styles.avatarBackupContainerBox}><Text style={{ fontSize: 36 }}>👨‍⚕️</Text></View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <View style={styles.pillDesignationCategoryBadge}><Text style={styles.pillDesignationText}>Consultation</Text></View>
              <Text style={[styles.cardDoctorMainTitleText, { color: activeColors.text }]}>{activeBookingPayload.doctorName}</Text>
              <View style={styles.cardScheduleInformationRow}>
                <Text style={styles.cardScheduleCalendarTimeLabels}>📅 {activeBookingPayload.date}</Text>
                <Text style={styles.cardScheduleCalendarTimeLabels}>🕒 {activeBookingPayload.time}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => Alert.alert('Notice', 'Item removal functionality.')}>
              <Text style={styles.deletionBinGlyphIcon}>🗑️</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.inlineDividerUnderlineHorizontalLine, { borderBottomColor: activeColors.border }]} />
          <View style={styles.slotActionPriceSpacedRow}>
            <TouchableOpacity><Text style={styles.changeSlotInteractiveTextButton}>🔄 {t.changeSlot}</Text></TouchableOpacity>
            <Text style={[styles.itemBoldPriceTagText, { color: activeColors.primary }]}>{activeBookingPayload.feeAmount}</Text>
          </View>
        </View>

        {/* Cross-Sell */}
        <View style={[styles.dashedBorderCrossSellContainer, { borderColor: activeColors.border }]}>
          <Text style={styles.crossSellIconGlyphSymbol}>🏥</Text>
          <Text style={[styles.crossSellMainLabelDescriptionText, { color: activeColors.text }]}>{t.laboratoryNeed}</Text>
          <TouchableOpacity style={styles.crossSellLinkTriggerRow}>
            <Text style={styles.crossSellLinkTextText}>{t.browseServices}  →</Text>
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View style={[styles.masterProceduralCardBody, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <Text style={[styles.ledgerHeadingCapitalsLabelText, { color: activeColors.text }]}>{t.orderSummary}</Text>
          <View style={styles.ledgerRowDataItemJustifiedSpace}>
            <Text style={styles.ledgerRegularItemRowTextLabel}>{t.subtotal}</Text>
            <Text style={[styles.ledgerRegularItemRowValueText, { color: activeColors.text }]}>{activeBookingPayload.feeAmount}</Text>
          </View>
          <View style={styles.ledgerRowDataItemJustifiedSpace}>
            <Text style={styles.ledgerRegularItemRowTextLabel}>{t.serviceFee}</Text>
            <Text style={[styles.ledgerRegularItemRowValueText, { color: activeColors.text }]}>{activeBookingPayload.serviceCost}</Text>
          </View>
          <View style={[styles.inlineDividerUnderlineHorizontalLine, { borderBottomColor: activeColors.border }]} />
          <View style={styles.ledgerRowDataItemJustifiedSpace}>
            <Text style={[styles.ledgerTotalBoldLabelText, { color: activeColors.text }]}>{t.total}</Text>
            <Text style={[styles.ledgerTotalBoldValueText, { color: activeColors.primary }]}>{activeBookingPayload.totalAggregateSum}</Text>
          </View>

          <AnimatedButton style={[styles.primaryActionBlockLongButton, { backgroundColor: activeColors.primary }]} onPress={handleProceed}>
            <Text style={styles.primaryActionButtonLabelText}>{t.proceedToCheckout} 💳</Text>
          </AnimatedButton>
          <TouchableOpacity style={styles.secondaryTextCenterButtonRowLink} onPress={() => router.push('/(patient)/book_consultation')}>
            <Text style={[styles.secondaryTextCenterBtnLabel, { color: activeColors.text }]}>{t.continueBooking}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// Layout styles shared globally among views
const styles = StyleSheet.create({
  outerSafeAreaFrame: { flex: 1, paddingTop: Platform.OS === 'ios' ? 40 : 15 },
  globalNavigationBarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1 },
  backNavArrowText: { fontSize: 22, fontWeight: '300' },
  brandHeaderTitleText: { fontSize: 18, fontWeight: 'bold', color: '#0F766E' },
  scrollLayoutGapping: { padding: 20, paddingBottom: 60 },
  contextMetaIntroductionRow: { marginBottom: 16 },
  headlineScreenMainLabel: { fontSize: 24, fontWeight: 'bold' },
  subtextMetaRowDescription: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  cartBadgeIndicatorBox: { flexDirection: 'row', alignItems: 'center' },
  cartIconGlyph: { fontSize: 20 },
  badgeNumericalCounterCircle: { backgroundColor: '#EF4444', width: 16, height: 16, borderRadius: 8, alignItems: 'center', justifyContent: 'center', position: 'absolute', right: -4, top: -4 },
  badgeCountDigits: { color: '#FFF', fontSize: 9, fontWeight: 'bold' },
  masterProceduralCardBody: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 16 },
  doctorItemIdentityLayoutRow: { flexDirection: 'row', alignItems: 'center' },
  avatarBackupContainerBox: { width: 50, height: 50, borderRadius: 10, backgroundColor: 'rgba(15,118,110,0.08)', alignItems: 'center', justifyContent: 'center' },
  pillDesignationCategoryBadge: { backgroundColor: 'rgba(59,130,246,0.1)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, alignSelf: 'flex-start', marginBottom: 4 },
  pillDesignationText: { color: '#3B82F6', fontSize: 10, fontWeight: '700' },
  cardDoctorMainTitleText: { fontSize: 16, fontWeight: 'bold' },
  cardScheduleInformationRow: { flexDirection: 'row', gap: 12, marginTop: 4 },
  cardScheduleCalendarTimeLabels: { fontSize: 12, color: '#9CA3AF' },
  deletionBinGlyphIcon: { fontSize: 16, color: '#EF4444', padding: 4 },
  inlineDividerUnderlineHorizontalLine: { borderBottomWidth: 1, marginVertical: 12 },
  slotActionPriceSpacedRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  changeSlotInteractiveTextButton: { color: '#0F766E', fontSize: 13, fontWeight: '600' },
  itemBoldPriceTagText: { fontSize: 16, fontWeight: 'bold' },
  dashedBorderCrossSellContainer: { borderStyle: 'dashed', borderWidth: 1, borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 20, backgroundColor: 'rgba(15,118,110,0.02)' },
  crossSellIconGlyphSymbol: { fontSize: 22, marginBottom: 4 },
  crossSellMainLabelDescriptionText: { fontSize: 12, textAlign: 'center', fontWeight: '500' },
  crossSellLinkTriggerRow: { marginTop: 8 },
  crossSellLinkTextText: { color: '#0F766E', fontSize: 13, fontWeight: '700' },
  ledgerHeadingCapitalsLabelText: { fontSize: 12, fontWeight: '800', letterSpacing: 0.5, marginBottom: 12, color: '#9CA3AF' },
  ledgerRowDataItemJustifiedSpace: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  ledgerRegularItemRowTextLabel: { fontSize: 14, color: '#9CA3AF' },
  ledgerRegularItemRowValueText: { fontSize: 14, fontWeight: '500' },
  ledgerTotalBoldLabelText: { fontSize: 16, fontWeight: 'bold' },
  ledgerTotalBoldValueText: { fontSize: 18, fontWeight: '800' },
  primaryActionBlockLongButton: { borderRadius: 12, paddingVertical: 14, alignItems: 'center', justifyContent: 'center', marginTop: 14, width: '100%' },
  primaryActionButtonLabelText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  secondaryTextCenterButtonRowLink: { alignSelf: 'center', marginTop: 14, padding: 4 },
  secondaryTextCenterBtnLabel: { fontSize: 13, fontWeight: '600' }
});