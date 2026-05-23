import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../../app/_layout';
import { Colors } from '../../constants/colors';

export default function PatientHeader() {
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];

  return (
    <View style={[styles.header, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
      <Text style={[styles.title, { color: activeColors.text }]}>AfyaDirect Patient</Text>
      <View style={styles.onlineBadge} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: 50, paddingBottom: 16, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1 },
  title: { fontSize: 18, fontWeight: 'bold' },
  onlineBadge: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#10B981' }
});