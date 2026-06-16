import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import DoctorHeader from '../../Components/doctor/doctor_header';
import DoctorFooter from '../../Components/doctor/admin_footer';

export default function DoctorEarningsDashboard() {
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];

  // Mock transactional logs matching the matrix layout in image_9ffa85.png
  const recentTransactionsList = [
    {
      id: 't1',
      initials: 'AM',
      name: 'Amani Musa',
      type: 'Video Consultation',
      date: 'Oct 24, 10:30 AM',
      badgeBg: '#EBF5FF',
      badgeText: '#3B82F6',
    },
    {
      id: 't2',
      initials: 'SN',
      name: 'Sarah Njau',
      type: 'Prescription Refill',
      date: 'Oct 23, 04:15 PM',
      badgeBg: '#EEF2F6',
      badgeText: '#6B7280',
    },
    {
      id: 't3',
      initials: 'JK',
      name: 'John Kikwete',
      type: 'Video Consultation',
      date: 'Oct 23, 01:00 PM',
      badgeBg: '#EBF5FF',
      badgeText: '#3B82F6',
    },
    {
      id: 't4',
      initials: 'LB',
      name: 'Lilian Bakari',
      type: 'Urgent Follow-up',
      date: 'Oct 22, 11:45 AM',
      badgeBg: '#FFF7ED',
      badgeText: '#EA580C',
    }
  ];

  return (
    <SafeAreaView style={[styles.safeContainer, { backgroundColor: activeColors.background }]}>
      <DoctorHeader title="Earnings" />

      <ScrollView contentContainerStyle={styles.scrollLayoutGapping} showsVerticalScrollIndicator={false}>
        
        {/* Top Context Section Banner Header */}
        <View style={styles.headerOverviewMetaRow}>
          <View>
            <Text style={styles.overheadSubheadingLabel}>REVENUE MANAGEMENT</Text>
            <Text style={[styles.financialOverviewHeaderTitle, { color: activeColors.text }]}>Financial Overview</Text>
          </View>
          <TouchableOpacity 
            style={[styles.exportReportButtonFrame, { borderColor: activeColors.border }]}
            onPress={() => Alert.alert('Export Engine', 'Compiling financial ledger statement spreadsheets...')}
          >
            <Text style={[styles.exportReportButtonText, { color: activeColors.text }]}>📥 Export Report</Text>
          </TouchableOpacity>
        </View>

        {/* Primary Main Total Balance Hero Card Frame */}
        <View style={styles.primaryBalanceHeroCardCard}>
          <View style={styles.balanceHeaderMetadataRowLine}>
            <View style={styles.balanceHeaderBadgeTag}>
              <Text style={styles.balanceHeaderBadgeTagLabelText}>Total Balance</Text>
            </View>
            <Text style={{ fontSize: 18, color: '#FFF' }}>💳</Text>
          </View>

          <Text style={styles.balanceNumericalLabelAmount}>TZS 4,820,000</Text>
          <Text style={styles.balanceSubtextDescriptionHint}>Available for immediate withdrawal</Text>

          <View style={styles.balanceActionInteractiveRowCluster}>
            <TouchableOpacity 
              style={styles.withdrawActionButtonCell}
              onPress={() => Alert.alert('Withdraw Funds', 'Initializing bank transfer/Mobile money checkout routing pipeline...')}
            >
              <Text style={styles.withdrawActionButtonCellLabelText}>Withdraw Funds</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.viewHistoryTextLinkActionCell}
              onPress={() => Alert.alert('History Ledger', 'Loading full chronological statements...')}
            >
              <Text style={styles.viewHistoryTextLinkActionCellLabelText}>View History ➔</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Metric Summary Card: Earnings This Week */}
        <View style={[styles.secondarySummaryMetricCardHousing, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <View style={styles.metricCardHeaderRowLine}>
            <Text style={{ fontSize: 12 }}>📈</Text>
            <Text style={[styles.metricCardLabelHeaderText, { color: activeColors.text }]}>Earnings This Week</Text>
          </View>
          <Text style={[styles.metricCardNumericalHeroLabel, { color: activeColors.text }]}>TZS 840,500</Text>
          <Text style={styles.metricGrowthPercentageSubtextSpan}>▲ 12% from last week</Text>
        </View>

        {/* Metric Summary Card: Total Consultations */}
        <View style={[styles.secondarySummaryMetricCardHousing, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <View style={styles.metricCardHeaderRowLine}>
            <Text style={{ fontSize: 12 }}>👥</Text>
            <Text style={[styles.metricCardLabelHeaderText, { color: activeColors.text }]}>Total Consultations</Text>
          </View>
          <Text style={[styles.metricCardNumericalHeroLabel, { color: activeColors.text }]}>142</Text>
          <Text style={styles.metricCardDescriptionMetaFooterLabel}>Completed in past 30 days</Text>
        </View>

        {/* Recent Transactions Tabular List Block Section */}
        <View style={[styles.tableContainerHousingFrame, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          
          <View style={[styles.tableHeaderInteractiveControlActionRow, { borderBottomColor: activeColors.border }]}>
            <Text style={[styles.tableSectionTitleHeadingLabel, { color: activeColors.text }]}>Recent Transactions</Text>
            <View style={styles.tableHeaderInteractiveIconGroupCluster}>
              <TouchableOpacity><Text style={{ fontSize: 14, color: '#6B7280' }}>⏳</Text></TouchableOpacity>
              <TouchableOpacity><Text style={{ fontSize: 14, color: '#6B7280' }}>🔍</Text></TouchableOpacity>
            </View>
          </View>

          {/* Table Labels Header Row Matrix */}
          <View style={[styles.tableLabelsColumnHeaderRowSpan, { borderBottomColor: activeColors.border, backgroundColor: theme === 'dark' ? '#111827' : '#F9FAFB' }]}>
            <Text style={[styles.columnLabelCellText, { flex: 1.2 }]}>Patient Name</Text>
            <Text style={[styles.columnLabelCellText, { flex: 1.4, textAlign: 'center' }]}>Service Type</Text>
            <Text style={[styles.columnLabelCellText, { flex: 1, textAlign: 'right' }]}>Date</Text>
          </View>

          {/* Table Rows Body List Iterator mapping row cells */}
          {recentTransactionsList.map((transaction) => (
            <View key={transaction.id} style={[styles.tableRowCellInstanceLine, { borderBottomColor: activeColors.border }]}>
              
              {/* Patient Profile Identification Cell block */}
              <View style={[styles.tablePatientMetaIdentityBoxCell, { flex: 1.2 }]}>
                <View style={[styles.tableAvatarBadgeCircleWrapperNode, { backgroundColor: theme === 'dark' ? '#374151' : '#E5E7EB' }]}>
                  <Text style={styles.tableAvatarBadgeCircleWrapperNodeTextValue}>{transaction.initials}</Text>
                </View>
                <Text style={[styles.tablePatientNameValueLabel, { color: activeColors.text }]} numberOfLines={1}>
                  {transaction.name}
                </Text>
              </View>

              {/* Service Type Chip Badge Cell Column */}
              <View style={[styles.tableServiceBadgeColumnCellBox, { flex: 1.4 }]}>
                <View style={[styles.clinicalServiceChipTagBadge, { backgroundColor: transaction.badgeBg }]}>
                  <Text style={[styles.clinicalServiceChipTagBadgeTextLabel, { color: transaction.badgeText }]} numberOfLines={1}>
                    {transaction.type}
                  </Text>
                </View>
              </View>

              {/* Transaction Timestamp Context Column Cell */}
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.tableTimestampValueMetaTextSpan} numberOfLines={2}>
                  {transaction.date}
                </Text>
              </View>

            </View>
          ))}

          {/* View All Transactions Footer Navigation Link Trigger Action */}
          <TouchableOpacity 
            style={styles.viewAllTransactionsActionButtonFullWidthFooterLinkRow}
            onPress={() => Alert.alert('Transactions Ledger', 'Redirecting to chronological financial transaction system ledger records...')}
          >
            <Text style={styles.viewAllTransactionsActionButtonFullWidthFooterLinkRowLabelText}>View All Transactions</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

      <DoctorFooter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1 },
  scrollLayoutGapping: { padding: 14, paddingBottom: 40 },
  headerOverviewMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, marginTop: 4 },
  overheadSubheadingLabel: { fontSize: 9, color: '#9CA3AF', fontWeight: '700', letterSpacing: 0.5 },
  financialOverviewHeaderTitle: { fontSize: 18, fontWeight: '800', marginTop: 2 },
  exportReportButtonFrame: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1 },
  exportReportButtonText: { fontSize: 11, fontWeight: '600' },
  primaryBalanceHeroCardCard: { backgroundColor: '#046A38', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  balanceHeaderMetadataRowLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  balanceHeaderBadgeTag: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  balanceHeaderBadgeTagLabelText: { color: '#FFF', fontSize: 10, fontWeight: '600' },
  balanceNumericalLabelAmount: { color: '#FFF', fontSize: 26, fontWeight: '800', letterSpacing: -0.5 },
  balanceSubtextDescriptionHint: { color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 2, marginBottom: 16 },
  balanceActionInteractiveRowCluster: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  withdrawActionButtonCell: { backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  withdrawActionButtonCellLabelText: { color: '#046A38', fontSize: 12, fontWeight: '700' },
  viewHistoryTextLinkActionCell: { paddingVertical: 8 },
  viewHistoryTextLinkActionCellLabelText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  secondarySummaryMetricCardHousing: { borderRadius: 12, borderWidth: 1, padding: 14, marginBottom: 12 },
  metricCardHeaderRowLine: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  metricCardLabelHeaderText: { fontSize: 11, fontWeight: '700', opacity: 0.8 },
  metricCardNumericalHeroLabel: { fontSize: 20, fontWeight: '800' },
  metricGrowthPercentageSubtextSpan: { color: '#10B981', fontSize: 10, fontWeight: '600', marginTop: 4 },
  metricCardDescriptionMetaFooterLabel: { color: '#6B7280', fontSize: 10, marginTop: 4 },
  tableContainerHousingFrame: { borderRadius: 12, borderWidth: 1, overflow: 'hidden', marginTop: 8 },
  tableHeaderInteractiveControlActionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderBottomWidth: 1 },
  tableSectionTitleHeadingLabel: { fontSize: 13, fontWeight: '800' },
  tableHeaderInteractiveIconGroupCluster: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  tableLabelsColumnHeaderRowSpan: { flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 8, borderBottomWidth: 1 },
  columnLabelCellText: { fontSize: 10, fontWeight: '700', color: '#9CA3AF' },
  tableRowCellInstanceLine: { flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 12, borderBottomWidth: 1, alignItems: 'center' },
  tablePatientMetaIdentityBoxCell: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingRight: 4 },
  tableAvatarBadgeCircleWrapperNode: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  tableAvatarBadgeCircleWrapperNodeTextValue: { fontSize: 10, fontWeight: '700', color: '#4B5563' },
  tablePatientNameValueLabel: { fontSize: 12, fontWeight: '600' },
  tableServiceBadgeColumnCellBox: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  clinicalServiceChipTagBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, maxWidth: '100%', alignItems: 'center', justifyContent: 'center' },
  clinicalServiceChipTagBadgeTextLabel: { fontSize: 9, fontWeight: '700', textAlign: 'center' },
  tableTimestampValueMetaTextSpan: { fontSize: 10, color: '#6B7280', textAlign: 'right', lineHeight: 13 },
  viewAllTransactionsActionButtonFullWidthFooterLinkRow: { paddingVertical: 12, alignItems: 'center', justifyContent: 'center' },
  viewAllTransactionsActionButtonFullWidthFooterLinkRowLabelText: { color: '#046A38', fontSize: 12, fontWeight: '700' }
});