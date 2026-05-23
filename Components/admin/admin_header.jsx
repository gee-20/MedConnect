import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../../app/_layout';
import { Colors } from '../../constants/colors';

export default function AdminHeader() {
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];

  return (
    <View style={[styles.header, { backgroundColor: '#111827', borderBottomWidth: 1, borderColor: activeColors.border }]}>
      <Text style={styles.title}>System Control Center</Text>
      <Text style={styles.badge}>ADMIN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: 50, paddingBottom: 16, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: 'bold', color: '#F9FAFB' },
  badge: { color: '#EF4444', fontSize: 11, fontWeight: 'bold', backgroundColor: 'rgba(239, 68, 68, 0.1)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 }
});