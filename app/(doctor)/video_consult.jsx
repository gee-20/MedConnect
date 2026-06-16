import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import { Translations } from '../../constants/language';
import DoctorHeader from '../../Components/doctor/doctor_header';
import DoctorFooter from '../../Components/doctor/admin_footer';

export default function VideoConsultationScreen() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const t = Translations[lang];
  const router = useRouter();
  const params = useLocalSearchParams();

  const patientChannelDisplayName = params.patientName || "Amani Juma";

  return (
    <SafeAreaView style={[styles.safeFillContainer, { backgroundColor: activeColors.background }]}>
      <DoctorHeader title={t.videoConsult} />
      
      <View style={styles.telehealthMainFrameBodyViewport}>
        {/* Main Remote Patient Video Stream Channel Placeholder */}
        <View style={styles.remoteVideoStreamViewportMockBg}>
          <Text style={styles.remoteUserWatermarkOverlayLabel}>📺 Connected to {patientChannelDisplayName}</Text>
          
          {/* Localized Floating PIP Camera Feed Container Preview */}
          <View style={styles.localPipStreamCameraViewportBoxContainer}>
            <Text style={{ fontSize: 24 }}>👨‍⚕️</Text>
          </View>
        </View>

        {/* Dynamic Controls System Bar Overlay */}
        <View style={[styles.overlayClinicalContextActionBarControlContainerRow, { backgroundColor: activeColors.surface, borderTopColor: activeColors.border }]}>
          <TouchableOpacity style={styles.circularMediaToggleControlMuteIconBox}><Text style={{ fontSize: 18 }}>🎙️</Text></TouchableOpacity>
          <TouchableOpacity style={styles.circularMediaToggleControlMuteIconBox}><Text style={{ fontSize: 18 }}>📷</Text></TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.expandedClinicalShortcutRxBuilderTriggerButton, { backgroundColor: activeColors.primary }]}
            onPress={() => router.push({ pathname: '/(doctor)/prescription', params: { patientName: patientChannelDisplayName } })}
          >
            <Text style={styles.expandedClinicalShortcutRxBuilderTriggerButtonLabelText}>📋 Prescription Builder</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.circularMediaToggleControlDisconnectCallIconBox}
            onPress={() => router.push('/(doctor)/index')}
          >
            <Text style={{ fontSize: 18, color: '#FFF' }}>🛑</Text>
          </TouchableOpacity>
        </View>
      </View>

      <DoctorFooter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeFillContainer: { flex: 1 },
  telehealthMainFrameBodyViewport: { flex: 1, justifyContent: 'flex-end' },
  remoteVideoStreamViewportMockBg: { flex: 1, backgroundColor: '#1F2937', justifyContent: 'center', alignItems: 'center' },
  remoteUserWatermarkOverlayLabel: { color: '#FFF', opacity: 0.7, fontWeight: '600', fontSize: 14 },
  localPipStreamCameraViewportBoxContainer: { position: 'absolute', top: 16, right: 16, width: 90, height: 130, borderRadius: 12, backgroundColor: '#374151', borderWidth: 1.5, borderColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  overlayClinicalContextActionBarControlContainerRow: { flexDirection: 'row', padding: 16, justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1 },
  circularMediaToggleControlMuteIconBox: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.04)', alignItems: 'center', justifyContent: 'center' },
  expandedClinicalShortcutRxBuilderTriggerButton: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  expandedClinicalShortcutRxBuilderTriggerButtonLabelText: { color: '#FFF', fontWeight: '700', fontSize: 12 },
  circularMediaToggleControlDisconnectCallIconBox: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#EF4444', alignItems: 'center', justifyContent: 'center' }
});