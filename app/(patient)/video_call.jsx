import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../../Components/AnimatedButton';

export default function VideoCall() {
  const router = useRouter();
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];

  return (
    <View style={styles.container}>
      {/* Remote Provider Stream Window Mockup */}
      <View style={styles.remoteStreamView}>
        <Text style={styles.remoteDoctorLabel}>Dr. Neema Mabula</Text>
        <Text style={styles.connectionStatusLabel}>📡 Connected - Secure End-to-End HIPAA Tunnel</Text>
      </View>

      {/* Local Self Patient Floating Stream Matrix Overlay */}
      <View style={[styles.localSelfStreamView, { borderColor: activeColors.primary }]}>
        <Text style={styles.localSelfLabel}>You (Salome)</Text>
      </View>

      {/* Bottom Floating Control Room Strip */}
      <View style={styles.controlOverlayStrip}>
        <AnimatedButton style={[styles.circleMediaButton, { backgroundColor: '#374151' }]} onPress={() => Alert.alert('Mute', 'Microphone stream muted locally.')}>
          <Text style={styles.controlEmoji}>🎙️</Text>
        </AnimatedButton>

        <AnimatedButton style={[styles.circleMediaButton, { backgroundColor: '#EF4444' }]} onPress={() => router.replace('/(patient)/dashboard')}>
          <Text style={styles.controlEmoji}>📞</Text>
        </AnimatedButton>

        <AnimatedButton style={[styles.circleMediaButton, { backgroundColor: '#374151' }]} onPress={() => Alert.alert('Camera', 'Video capture input frame flipped.')}>
          <Text style={styles.controlEmoji}>📷</Text>
        </AnimatedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  remoteStreamView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  remoteDoctorLabel: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  connectionStatusLabel: { color: '#10B981', fontSize: 13, marginTop: 8, fontWeight: '600' },
  localSelfStreamView: { position: 'absolute', top: 50, right: 20, width: 110, height: 160, backgroundColor: '#1F2937', borderRadius: 12, borderWidth: 2, justifyContent: 'center', alignItems: 'center', elevation: 4 },
  localSelfLabel: { color: '#9CA3AF', fontSize: 12, fontWeight: '600' },
  controlOverlayStrip: { position: 'absolute', bottom: 40, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 24, alignItems: 'center' },
  circleMediaButton: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 3 },
  controlEmoji: { fontSize: 22, color: '#FFF' }
});