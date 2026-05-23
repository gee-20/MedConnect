import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../../Components/AnimatedButton';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function VideoConsultation() {
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];
  const router = useRouter();

  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);

  return (
    <View style={styles.container}>
      {/* Main Remote Video Stream (Full Background View Mimic) */}
      <View style={styles.remoteStreamPlaceholder}>
        <Text style={styles.remoteStreamText}>📷 Video Feed: Dr. Kwesi Mensah</Text>
        <Text style={styles.callDuration}>04:12</Text>
      </View>

      {/* Local Video Overlay Stream (Picture-in-Picture) */}
      <View style={[styles.localStreamOverlay, { borderColor: activeColors.primary }]}>
        <Text style={styles.localStreamText}>{isCamOff ? '🔇 Cam Off' : 'You'}</Text>
      </View>

      {/* Floating Call Bottom Control Ribbon */}
      <View style={[styles.controlRibbon, { backgroundColor: 'rgba(0,0,0,0.75)' }]}>
        <AnimatedButton 
          style={[styles.iconCircle, { backgroundColor: isMuted ? '#EF4444' : 'rgba(255,255,255,0.2)' }]} 
          onPress={() => setIsMuted(!isMuted)}
        >
          <Text style={styles.iconText}>{isMuted ? '🎙️' : '🎙️'}</Text>
        </AnimatedButton>

        <AnimatedButton 
          style={[styles.iconCircle, { backgroundColor: isCamOff ? '#EF4444' : 'rgba(255,255,255,0.2)' }]} 
          onPress={() => setIsCamOff(!isCamOff)}
        >
          <Text style={styles.iconText}>📹</Text>
        </AnimatedButton>

        <AnimatedButton 
          style={[styles.iconCircle, { backgroundColor: '#EF4444', width: 65, height: 65 }]} 
          onPress={() => {
            router.back();
          }}
        >
          <Text style={styles.iconText}>🛑</Text>
        </AnimatedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  remoteStreamPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1F2937' },
  remoteStreamText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  callDuration: { color: '#10B981', fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  localStreamOverlay: { 
    position: 'absolute', 
    top: 50, 
    right: 20, 
    width: 110, 
    height: 160, 
    borderRadius: 12, 
    backgroundColor: '#374151', 
    borderWidth: 2, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  localStreamText: { color: '#FFF', fontSize: 12, fontWeight: '500' },
  controlRibbon: { 
    position: 'absolute', 
    bottom: 30, 
    left: 20, 
    right: 20, 
    padding: 16, 
    borderRadius: 24, 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center' 
  },
  iconCircle: { width: 50, height: 50, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  iconText: { fontSize: 20, color: '#FFF' }
});