import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../../app/_layout';
import { Colors } from '../../constants/colors';

export default function DoctorHeader() {
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];

  return (
    <View style={[styles.header, { backgroundColor: activeColors.primary }]}>
      <Text style={styles.title}>Daktari Portal</Text>
      <Text style={styles.sub}>AfyaDirect</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: 50, paddingBottom: 16, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  sub: { color: '#E2E8F0', fontSize: 12, fontWeight: '600' }
});