import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../../app/_layout';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../../Components/AnimatedButton';

export default function AdminHeader({ title }) {
  const { theme, setTheme, lang, setLang } = useContext(AppContext);
  const activeColors = Colors[theme];

  return (
    <View style={[styles.headerContainer, { borderBottomColor: activeColors.border }]}>
      <View style={styles.leftRow}>
        <Text style={[styles.titleText, { color: activeColors.text }]}>{title}</Text>
      </View>
      
      <View style={styles.rightControls}>
        {/* Localization Switcher */}
        <AnimatedButton 
          style={[styles.toggleBtn, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}
          onPress={() => setLang(lang === 'en' ? 'sw' : 'en')}
        >
          <Text style={[styles.controlText, { color: activeColors.text }]}>
            {lang === 'en' ? 'EN' : 'SW'}
          </Text>
        </AnimatedButton>

        {/* Theme Mode Switcher */}
        <AnimatedButton 
          style={[styles.toggleBtn, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}
          onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <Text style={styles.controlText}>{theme === 'light' ? '☀️' : '🌙'}</Text>
        </AnimatedButton>

        {/* Admin Avatar Ring */}
        <View style={[styles.avatarFrame, { borderColor: activeColors.primary }]}>
          <Text style={styles.avatarIcon}>👨‍💻</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15, borderBottomWidth: 1 },
  leftRow: { flexDirection: 'row', alignItems: 'center' },
  titleText: { fontSize: 20, fontWeight: 'bold', letterSpacing: 0.3 },
  rightControls: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  toggleBtn: { borderWidth: 1, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, minWidth: 40, alignItems: 'center' },
  controlText: { fontSize: 12, fontWeight: 'bold' },
  avatarFrame: { width: 36, height: 36, borderRadius: 18, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  avatarIcon: { fontSize: 18 }
});