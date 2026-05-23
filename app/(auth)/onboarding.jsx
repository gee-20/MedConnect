import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Translations } from '../../constants/language';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../../Components/AnimatedButton';

export default function Onboarding() {
  const router = useRouter();
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const t = Translations[lang];
  const [step, setStep] = useState(0);

  const onboardingData = [
    { title: t.welcome, desc: "Experience the future of Tanzanian Healthcare." },
    { title: t.consultDoctors, desc: "Connect instantly with certified medical practitioners across Tanzania." },
    { title: t.chatInstead, desc: "Avoid busy hospital queues. Send messages seamlessly." },
    { title: t.payMobile, desc: "Handle instant payments via M-Pesa and Tigo Pesa." }
  ];

  const handleNext = () => {
    if (step < onboardingData.length - 1) {
      setStep(step + 1);
    } else {
      router.replace('/login');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <View style={styles.headerRow}>
        <AnimatedButton onPress={() => router.replace('/login')}>
          <Text style={[styles.skipText, { color: activeColors.primary }]}>{t.skip}</Text>
        </AnimatedButton>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: activeColors.text }]}>{onboardingData[step].title}</Text>
        <Text style={[styles.desc, { color: '#6B7280' }]}>{onboardingData[step].desc}</Text>
      </View>

      <View style={styles.footerRow}>
        <AnimatedButton style={[styles.btn, { backgroundColor: activeColors.primary }]} onPress={handleNext}>
          <Text style={styles.btnText}>{step === onboardingData.length - 1 ? t.getStarted : t.next}</Text>
        </AnimatedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'space-between' },
  headerRow: { alignItems: 'flex-end', paddingTop: 20 },
  skipText: { fontSize: 16, fontWeight: '600' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  desc: { fontSize: 16, textAlign: 'center', paddingHorizontal: 20 },
  footerRow: { paddingBottom: 20 },
  btn: { padding: 16, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});