import React, { useContext, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { AppContext } from '../app/_layout';
import { Colors } from '../constants/colors';
import AnimatedButton from './AnimatedButton';

export default function ThemeView() {
  const { theme, setTheme, lang, setLang } = useContext(AppContext);
  const activeColors = Colors[theme];
  
  // Animation track for switching indicator
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const triggerPulse = (callback) => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0.5, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true })
    ]).start();
    callback();
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor: activeColors.background, opacity: fadeAnim }]}>
      <Text style={[styles.title, { color: activeColors.text }]}>
        {lang === 'en' ? 'App Customizer' : 'Marekebisho ya Programu'}
      </Text>
      <Text style={styles.subtitle}>
        {lang === 'en' ? 'Manage appearance and regional options' : 'Badili muonekano na lugha ya mfumo'}
      </Text>

      {/* --- THEME TOGGLE ELEMENT --- */}
      <View style={[styles.settingRow, { borderColor: activeColors.border }]}>
        <Text style={[styles.settingLabel, { color: activeColors.text }]}>
          {lang === 'en' ? 'Dark Mode' : 'Mfumo wa Usiku'}
        </Text>
        <AnimatedButton 
          style={[styles.toggleBtn, { backgroundColor: theme === 'dark' ? activeColors.primary : '#E5E7EB' }]}
          onPress={() => triggerPulse(() => setTheme(theme === 'light' ? 'dark' : 'light'))}
        >
          <View style={[styles.toggleCircle, theme === 'dark' ? styles.alignRight : styles.alignLeft]} />
        </AnimatedButton>
      </View>

      {/* --- LANGUAGE TOGGLE ELEMENT --- */}
      <View style={[styles.settingRow, { borderColor: activeColors.border }]}>
        <Text style={[styles.settingLabel, { color: activeColors.text }]}>
          {lang === 'en' ? 'Language / Lugha' : 'Lugha / Language'}
        </Text>
        <View style={styles.langContainer}>
          <AnimatedButton 
            style={[styles.langTab, lang === 'en' ? { backgroundColor: activeColors.primary } : { backgroundColor: activeColors.surface }]}
            onPress={() => triggerPulse(() => setLang('en'))}
          >
            <Text style={[styles.langTabText, { color: lang === 'en' ? '#FFF' : activeColors.text }]}>English</Text>
          </AnimatedButton>

          <AnimatedButton 
            style={[styles.langTab, lang === 'sw' ? { backgroundColor: activeColors.primary } : { backgroundColor: activeColors.surface }]}
            onPress={() => triggerPulse(() => setLang('sw'))}
          >
            <Text style={[styles.langTabText, { color: lang === 'sw' ? '#FFF' : activeColors.text }]}>Kiswahili</Text>
          </AnimatedButton>
        </View>
      </View>

      {/* --- PREVIEW BADGE CONTAINER --- */}
      <View style={[styles.previewBox, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
        <Text style={[styles.previewText, { color: activeColors.text }]}>
          {lang === 'en' ? 'Live System Preview' : 'Mwonekano Halisi wa Mfumo'}
        </Text>
        <View style={[styles.dummyBadge, { backgroundColor: activeColors.primary }]}>
          <Text style={styles.dummyText}>AfyaDirect Core</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: '#9CA3AF', fontSize: 14, marginBottom: 30, marginTop: 4 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1 },
  settingLabel: { fontSize: 16, fontWeight: '600' },
  toggleBtn: { width: 52, height: 28, borderRadius: 15, padding: 2, justifyContent: 'center' },
  toggleCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 2.5, elevation: 2 },
  alignLeft: { alignSelf: 'flex-start' },
  alignRight: { alignSelf: 'flex-end' },
  langContainer: { flexDirection: 'row', gap: 8 },
  langTab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  langTabText: { fontSize: 13, fontWeight: 'bold' },
  previewBox: { marginTop: 40, padding: 20, borderRadius: 16, borderWidth: 1, alignItems: 'center' },
  previewText: { fontSize: 13, color: '#9CA3AF', fontWeight: '500', marginBottom: 12 },
  dummyBadge: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20 },
  dummyText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 }
});