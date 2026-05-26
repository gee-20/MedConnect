import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Translations } from '../../constants/language';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../../Components/AnimatedButton';

const { width } = Dimensions.get('window');

export default function Onboarding() {
  const router = useRouter();
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  
  // Safe localization extraction pipelines
  const t = Translations[lang] || {};
  const txtSkip = t.skip || (lang === 'en' ? 'Skip' : 'Ruka');
  const txtNext = t.next || (lang === 'en' ? 'Next' : 'Mbele');
  const txtGetStarted = t.getStarted || (lang === 'en' ? 'Get Started' : 'Anza Sasa');

  const [step, setStep] = useState(0);

  // Structural onboarding data tracking local image module references
  const onboardingData = [
    { 
      title: t.welcome || (lang === 'en' ? "Welcome to MedConnect" : "Karibu MedConnect"), 
      desc: lang === 'en' ? "Experience the modern future of Tanzanian healthcare delivery straight from your device." : "Shuhudia mustakabali wa kisasa wa huduma za afya nchini Tanzania kupitia simu yako.",
      imageSource: require('../../assets/img/image2.jpg')
    },
    { 
      title: t.consultDoctors || (lang === 'en' ? "Consult Specialists" : "Ongea na Madaktari"), 
      desc: lang === 'en' ? "Connect instantly with certified medical practitioners and skip the long physical waiting line blocks." : "Unganishwa papo hapo na madaktari bingwa na uepuke mistari mirefu ya kusubiri hospitalini.",
      imageSource: require('../../assets/img/image1.jpg')
    },
    { 
      title: t.chatInstead || (lang === 'en' ? "Instant Chat Support" : "Soga la Papo Hapo"), 
      desc: lang === 'en' ? "Communicate securely with clinical specialists using live messaging channels anywhere, anytime." : "Wasiliana kwa usalama na wataalamu wa afya kwa njia ya ujumbe mfupi mahali popote, wakati wowote.",
      imageSource: require('../../assets/img/image2.jpg')
    },
    { 
      title: t.payMobile || (lang === 'en' ? "Secure Wallet Payments" : "Malipo Rahisi ya Simu"), 
      desc: lang === 'en' ? "Process transparent consultation escrow collections instantly via fast integration with M-Pesa and Tigo Pesa." : "Kamilisha malipo ya ushauri wa daktari kwa haraka na usalama kupitia M-Pesa na Tigo Pesa.",
      imageSource: require('../../assets/img/image3.jpeg')
    }
  ];

  const handleNext = () => {
    if (step < onboardingData.length - 1) {
      setStep(step + 1);
    } else {
      router.replace('/(auth)/login');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      
      {/* Top Header Row Panel */}
      <View style={styles.headerRow}>
        <AnimatedButton onPress={() => router.replace('/(auth)/login')}>
          <Text style={[styles.skipText, { color: activeColors.primary }]}>{txtSkip}</Text>
        </AnimatedButton>
      </View>

      {/* Main Vector/Illustration Image Frame */}
      <View style={styles.illustrationFrame}>
        <Image 
          source={onboardingData[step].imageSource}
          style={styles.slideImage}
          resizeMode="contain"
        />
      </View>

      {/* Core Typography Contents Panel */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: activeColors.text }]}>{onboardingData[step].title}</Text>
        <Text style={styles.desc}>{onboardingData[step].desc}</Text>
      </View>

      {/* Dynamic Slide Step Pagination Bar */}
      <View style={styles.indicatorContainer}>
        {onboardingData.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.dotIndicator, 
              { backgroundColor: index === step ? activeColors.primary : '#D1D5DB' },
              index === step && { width: 24 }
            ]}
          />
        ))}
      </View>

      {/* Lower Action Navigation Button */}
      <View style={styles.footerRow}>
        <AnimatedButton style={[styles.btn, { backgroundColor: activeColors.primary }]} onPress={handleNext}>
          <Text style={styles.btnText}>
            {step === onboardingData.length - 1 ? txtGetStarted : txtNext}
          </Text>
        </AnimatedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'space-between' },
  headerRow: { alignItems: 'flex-end', paddingTop: 30, height: 60 },
  skipText: { fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
  illustrationFrame: { flex: 1.3, justifyContent: 'center', alignItems: 'center', marginVertical: 10 },
  slideImage: { width: width * 0.75, height: width * 0.65 },
  content: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 12 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 14, letterSpacing: 0.2 },
  desc: { fontSize: 15, textAlign: 'center', color: '#6B7280', lineHeight: 22, paddingHorizontal: 10 },
  indicatorContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, marginVertical: 15 },
  dotIndicator: { width: 8, height: 8, borderRadius: 4 },
  footerRow: { paddingBottom: 25 },
  btn: { padding: 16, borderRadius: 14, alignItems: 'center', justifyContent: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', letterSpacing: 0.5 }
});