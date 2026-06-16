import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppContext } from '../../app/_layout';
import { Colors } from '../../constants/colors';

export default function DoctorHeader({ title }) {
  const { theme, lang, setLang } = useContext(AppContext);
  const activeColors = Colors[theme];

  return (
    <View style={[styles.headerBox, { backgroundColor: activeColors.surface, borderBottomColor: activeColors.border }]}>
      <View style={styles.brandingRow}>
        <View style={styles.logoIndicatorNode} />
        <Text style={[styles.brandText, { color: activeColors.text }]}>AfyaDirect Pro</Text>
      </View>
      <View style={styles.actionControlCluster}>
        {/* Toggle triggers dynamic translation switch seamlessly through context */}
        <TouchableOpacity style={styles.langBadgeContainer} onPress={() => setLang(lang === 'en' ? 'sw' : 'en')}>
          <Text style={styles.langBadgeText}>{lang.toUpperCase()}</Text>
        </TouchableOpacity>
        <View style={styles.avatarCircularBadgeFrame}>
          <Text style={{ fontSize: 14 }}>👨‍⚕️</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, elevation: 2 },
  brandingRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoIndicatorNode: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#10B981' },
  brandText: { fontSize: 16, fontWeight: '800', letterSpacing: -0.2 },
  actionControlCluster: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  langBadgeContainer: { backgroundColor: 'rgba(16,185,129,0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  langBadgeText: { fontSize: 11, color: '#10B981', fontWeight: '700' },
  avatarCircularBadgeFrame: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.05)', alignItems: 'center', justifyContent: 'center' }
});