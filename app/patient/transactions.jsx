import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../../Components/AnimatedButton';

export default function TransactionLogs() {
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];
  const [filter, setFilter] = useState('All');

  const paymentData = [
    { id: 'TXN-9021', provider: 'M-Pesa', amount: 'TZS 25,000', date: 'May 22, 2026', status: 'Completed', reference: 'REF: MP82H1K9' },
    { id: 'TXN-4412', provider: 'Tigo Pesa', amount: 'TZS 35,000', date: 'May 18, 2026', status: 'Completed', reference: 'REF: TG11J9X0' },
    { id: 'TXN-0912', provider: 'M-Pesa', amount: 'TZS 25,000', date: 'May 10, 2026', status: 'Failed', reference: 'REF: MP12A8Z2' }
  ];

  const filteredLogs = filter === 'All' ? paymentData : paymentData.filter(item => item.provider === filter);

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <Text style={[styles.title, { color: activeColors.text }]}>Transaction Logs</Text>
      <Text style={styles.subtitle}>Track balance disbursements and mobile money validation tokens.</Text>

      {/* Provider Horizontal Sorting Tabs */}
      <View style={styles.tabContainer}>
        {['All', 'M-Pesa', 'Tigo Pesa'].map((tab) => (
          <AnimatedButton 
            key={tab} 
            style={[styles.tabButton, { backgroundColor: filter === tab ? activeColors.primary : activeColors.surface }]}
            onPress={() => setFilter(tab)}
          >
            <Text style={[styles.tabText, { color: filter === tab ? '#FFF' : activeColors.text }]}>{tab}</Text>
          </AnimatedButton>
        ))}
      </View>

      {/* Transaction Records List */}
      <FlatList
        data={filteredLogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.logCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <View style={styles.cardTop}>
              <View>
                <Text style={[styles.providerName, { color: activeColors.text }]}>{item.provider}</Text>
                <Text style={styles.refText}>{item.reference}</Text>
              </View>
              <Text style={[styles.amountText, { color: item.status === 'Failed' ? '#EF4444' : activeColors.primary }]}>
                {item.amount}
              </Text>
            </View>

            <View style={styles.cardBottom}>
              <Text style={styles.dateText}>📅 {item.date}</Text>
              <Text style={[styles.statusIndicator, { color: item.status === 'Failed' ? '#EF4444' : '#10B981' }]}>
                ● {item.status}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginTop: 10 },
  subtitle: { color: '#9CA3AF', fontSize: 14, marginBottom: 20, marginTop: 4 },
  tabContainer: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  tabButton: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  tabText: { fontWeight: '600', fontSize: 13 },
  logCard: { padding: 16, borderRadius: 16, borderWidth: 1, marginBottom: 12 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  providerName: { fontSize: 16, fontWeight: 'bold' },
  refText: { color: '#9CA3AF', fontSize: 12, marginTop: 2 },
  amountText: { fontSize: 16, fontWeight: 'bold' },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14, alignItems: 'center' },
  dateText: { color: '#6B7280', fontSize: 13 },
  statusIndicator: { fontSize: 13, fontWeight: '600' }
});