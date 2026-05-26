import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Translations } from '../../constants/language';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../../Components/AnimatedButton';

export default function Login() {
  const router = useRouter();
  const { theme, setTheme, lang, setLang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const t = Translations[lang];

  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');

  // NOTE: Simple in-memory user store for local/dev testing.
  // Replace with real authentication API in production.
  const USERS = [
    { id: 1, email: 'admin@afya.com', password: 'adminpass', role: 'Admin' },
    { id: 2, email: 'dr.jane@doctor.com', password: 'docpass123', role: 'Doctor' },
    { id: 3, email: 'patient1@example.com', password: 'patientpass', role: 'Patient' }
  ];

  const handleLogin = () => {
    if (!identity || !password) {
      Alert.alert('Error', 'Please enter both email/username and password.');
      return;
    }

    const credential = identity.toLowerCase().trim();

    // Find by exact email match for now
    const user = USERS.find(u => u.email.toLowerCase() === credential);

    if (!user) {
      Alert.alert('Account not found', 'No account matches those credentials. Please register or check your email.');
      return;
    }

    if (user.password !== password) {
      Alert.alert('Invalid credentials', 'The password entered is incorrect.');
      return;
    }

    // Enforce doctor email rule: must contain 'doctor.com'
    if (user.role === 'Doctor' && !user.email.includes('doctor.com')) {
      Alert.alert('Invalid Doctor Account', 'Doctor accounts must use an email containing "doctor.com".');
      return;
    }

    // Route to role-specific area
    if (user.role === 'Admin') {
      router.replace('/(admin)/user_management');
    } else if (user.role === 'Doctor') {
      router.replace('/(doctor)/queue');
    } else {
      router.replace('/(patient)/book_consultation');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      
      {/* Top Header Controls Area matching Mockup */}
      <View style={styles.topActionHeader}>
        <Text style={[styles.brandLogoText, { color: activeColors.primary }]}>AfyaDirect</Text>
        <View style={styles.controlsRow}>
          <AnimatedButton 
            style={[styles.langToggleBtn, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}
            onPress={() => setLang(lang === 'en' ? 'sw' : 'en')}
          >
            <Text style={[styles.langText, { color: activeColors.text }]}>{lang === 'en' ? 'EN | SW' : 'SW | EN'}</Text>
          </AnimatedButton>
          
          <AnimatedButton 
            style={styles.themeIconBtn} 
            onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            <Text style={styles.themeIconEmoji}>{theme === 'light' ? '☀️' : '🌙'}</Text>
          </AnimatedButton>
        </View>
      </View>

      {/* Main Authentication Core Card Layout */}
      <View style={[styles.card, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
        <Text style={[styles.welcomeTitle, { color: activeColors.text }]}>{t.welcomeBack}</Text>
        <Text style={styles.welcomeSubtitle}>{t.loginSubtitle}</Text>

        <Text style={[styles.inputFieldTitle, { color: activeColors.text }]}>{t.phoneOrEmail}</Text>
        <TextInput 
          style={[styles.textInputStyle, { borderColor: activeColors.border, color: activeColors.text }]}
          placeholder="e.g., patient1@example.com"
          placeholderTextColor="#9CA3AF"
          value={identity}
          onChangeText={setIdentity}
          autoCapitalize="none"
        />

        <View style={styles.passwordHeaderRow}>
          <Text style={[styles.inputFieldTitle, { color: activeColors.text }]}>{t.password}</Text>
          <Text style={{ color: activeColors.primary, fontSize: 13, fontWeight: '600' }}>{t.forgotPassword}</Text>
        </View>
        <TextInput 
          style={[styles.textInputStyle, { borderColor: activeColors.border, color: activeColors.text }]}
          placeholder="••••••••"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <AnimatedButton 
          style={[styles.primaryActionBtn, { backgroundColor: activeColors.primary }]} 
          onPress={handleLogin}
        >
          <Text style={styles.primaryActionText}>{t.logIn}</Text>
        </AnimatedButton>

        <View style={styles.orDividerLineRow}>
          <View style={[styles.horizontalLine, { backgroundColor: activeColors.border }]} />
          <Text style={styles.orLabelText}>{t.or}</Text>
          <View style={[styles.horizontalLine, { backgroundColor: activeColors.border }]} />
        </View>

        <AnimatedButton style={[styles.googleAuthBtn, { borderColor: activeColors.border }]} onPress={() => Alert.alert("OAuth API Connection")}>
          <Image 
            source={require('../../assets/img/google.png')} 
            style={styles.googleButtonIconStyle}
            resizeMode="contain"
          />
          <Text style={[styles.googleAuthText, { color: activeColors.text }]}>{t.continueGoogle}</Text>
        </AnimatedButton>

        <AnimatedButton onPress={() => router.push('/(auth)/register')} style={{ marginTop: 20 }}>
          <Text style={{ textAlign: 'center', color: '#6B7280', fontSize: 14 }}>
            {t.noAccount} <Text style={{ color: activeColors.primary, fontWeight: '700' }}>{t.signUpNow}</Text>
          </Text>
        </AnimatedButton>
      </View>

      {/* Compliance Information Footer */}
      <View style={styles.complianceRowArea}>
        <Text style={styles.complianceItemText}>🛡️ HIPAA Compliant</Text>
        <Text style={styles.complianceItemText}>🔒 Data Security</Text>
        <Text style={styles.complianceItemText}>⚙️ ISO 27001</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  topActionHeader: { position: 'absolute', top: 50, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brandLogoText: { fontSize: 22, fontWeight: 'bold' },
  controlsRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  langToggleBtn: { borderWidth: 1, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  langText: { fontSize: 12, fontWeight: 'bold' },
  themeIconEmoji: { fontSize: 20 },
  card: { padding: 20, borderRadius: 16, borderWidth: 1, width: '100%', marginTop: 60 },
  brandImageContainer: { alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  brandImageStyle: { width: 55, height: 55 },
  welcomeTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  welcomeSubtitle: { color: '#6B7280', textAlign: 'center', fontSize: 14, marginTop: 6, marginBottom: 24 },
  inputFieldTitle: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  textInputStyle: { borderWidth: 1, borderRadius: 10, padding: 14, marginBottom: 16, fontSize: 15 },
  passwordHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  primaryActionBtn: { padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  primaryActionText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  orDividerLineRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  horizontalLine: { flex: 1, height: 1 },
  orLabelText: { marginHorizontal: 10, color: '#9CA3AF', fontSize: 13, fontWeight: '600' },
  googleAuthBtn: { flexDirection: 'row', borderWidth: 1, padding: 14, borderRadius: 10, justifyContent: 'center', alignItems: 'center', gap: 12 },
  googleButtonIconStyle: { width: 18, height: 18 },
  googleAuthText: { fontSize: 15, fontWeight: '600' },
  complianceRowArea: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 30, opacity: 0.6 },
  complianceItemText: { fontSize: 11, color: '#6B7280', fontWeight: '600' }
});