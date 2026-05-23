import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Slot, useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../../Components/AnimatedButton';

export default function PatientLayout() {
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: activeColors.background }}>
      {/* PERSISTENT PATIENT HEADER */}
      <View style={[styles.header, { backgroundColor: activeColors.surface, borderBottomWidth: 1, borderColor: activeColors.border }]}>
        <Text style={[styles.headerTitle, { color: activeColors.text }]}>AfyaDirect Patient</Text>
      </View>

      {/* CORE SCREEN CONTENT VIEWPORT */}
      <View style={{ flex: 1 }}>
        <Slot />
      </View>

      {/* PERSISTENT PATIENT FOOTER */}
      <View style={[styles.footer, { backgroundColor: activeColors.surface, borderTopWidth: 1, borderColor: activeColors.border }]}>
        <AnimatedButton onPress={() => router.push('/(patient)/dashboard')}><Text style={{color: activeColors.text}}>Home</Text></AnimatedButton>
        <AnimatedButton onPress={() => router.push('/(patient)/book_consultation')}><Text style={{color: activeColors.text}}>Book</Text></AnimatedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: 50, paddingBottom: 16, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16 }
});