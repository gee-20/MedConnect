import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Translations } from '../../constants/language';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../../Components/AnimatedButton';

export default function Login() {
  const router = useRouter();
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const t = Translations[lang];

  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!identity || !password) {
      Alert.alert("Error", "Tafadhali jaza nafasi zote / Please fill all fields.");
      return;
    }

    const cleanInput = identity.toLowerCase().trim();

    // Context Role Router Routing Engine
    if (cleanInput === 'admin' || cleanInput.includes('@tanzaniafyadirect')) {
      router.replace('/(admin)/user_management');
    } else if (cleanInput.startsWith('dr.') || cleanInput.includes('doctor')) {
      router.replace('/(doctor)/queue');
    } else {
      router.replace('/(patient)/dashboard');
    }
  };

  const handleGoogleSignIn = () => {
    Alert.alert("Google Auth", "Connecting with secure Google authentication service...");
  };

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <View style={styles.brandBox}>
        <Text style={[styles.brandText, { color: activeColors.primary }]}>AfyaDirect</Text>
        <Text style={styles.subText}>Bima ya Afya ya Kidijitali mikononi mwako.</Text>
      </View>

      <View style={styles.form}>
        <TextInput 
          style={[styles.input, { borderColor: activeColors.border, color: activeColors.text, backgroundColor: activeColors.surface }]}
          placeholder="Phone Number, Email or Username"
          placeholderTextColor="#9CA3AF"
          value={identity}
          onChangeText={setIdentity}
          autoCapitalize="none"
        />

        <TextInput 
          style={[styles.input, { borderColor: activeColors.border, color: activeColors.text, backgroundColor: activeColors.surface }]}
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <AnimatedButton style={[styles.loginBtn, { backgroundColor: activeColors.primary }]} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Create Account</Text>
        </AnimatedButton>

        {/* --- GOOGLE INTERACTIVE DIVIDER & BUTTON --- */}
        <View style={styles.dividerRow}>
          <View style={[styles.line, { backgroundColor: activeColors.border }]} />
          <Text style={styles.dividerText}>or</Text>
          <View style={[styles.line, { backgroundColor: activeColors.border }]} />
        </View>

        <AnimatedButton style={[styles.googleBtn, { borderColor: activeColors.border }]} onPress={handleGoogleSignIn}>
          <Text style={styles.googleIcon}>🌐</Text>
          <Text style={[styles.googleBtnText, { color: activeColors.text }]}>Continue with Google</Text>
        </AnimatedButton>

        {/* --- FOOTER REGISTRATION LINK --- */}
        <AnimatedButton onPress={() => router.push('/(auth)/register')} style={styles.registerLink}>
          <Text style={{ color: activeColors.primary, textAlign: 'center', fontWeight: '500' }}>
            Don't have an account? Sign up now
          </Text>
        </AnimatedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  brandBox: { alignItems: 'center', marginBottom: 40 },
  brandText: { fontSize: 32, fontWeight: 'bold', letterSpacing: 1 },
  subText: { color: '#6B7280', marginTop: 8, fontSize: 14, textAlign: 'center' },
  form: { width: '100%' },
  input: { borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 16, fontSize: 15 },
  loginBtn: { padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  loginBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  line: { flex: 1, height: 1 },
  dividerText: { marginHorizontal: 10, color: '#9CA3AF', fontSize: 14 },
  googleBtn: { flexDirection: 'row', borderWidth: 1, padding: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', gap: 10 },
  googleIcon: { fontSize: 18 },
  googleBtnText: { fontSize: 15, fontWeight: '600' },
  registerLink: { marginTop: 24 }
});