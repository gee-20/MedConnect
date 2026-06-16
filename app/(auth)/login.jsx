import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Translations } from '../../constants/language';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../../Components/AnimatedButton';

// Elevated globally so modifications survive modal state resets
const IN_MEMORY_USERS = [
  { id: 1, email: 'admin@afya.com', password: 'adminpass', role: 'Admin' },
  { id: 2, email: 'dr.jane@doctor.com', password: 'docpass123', role: 'Doctor' },
  { id: 3, email: 'patient1@example.com', password: 'patientpass', role: 'Patient' }
];

export default function Login() {
  const router = useRouter();
  const { theme, setTheme, lang, setLang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const t = Translations[lang];

  // Core Login Card States
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  
  // Dynamic state tracer to force update parent login screen elements
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  // Forgot Password Modal State Elements
  const [forgotModalVisible, setForgotModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleLogin = () => {
    if (!identity || !password) {
      Alert.alert('Error', 'Please enter both email/username and password.');
      return;
    }

    const credential = identity.toLowerCase().trim();
    const user = IN_MEMORY_USERS.find(u => u.email.toLowerCase() === credential);

    if (!user) {
      Alert.alert('Account not found', 'No account matches those credentials.');
      return;
    }

    if (user.password !== password) {
      Alert.alert('Invalid credentials', 'The password entered is incorrect.');
      return;
    }

   if (user.role === 'Doctor' && !user.email.includes('doctor.com')) {
  Alert.alert('Invalid Doctor Account', 'Doctor accounts must use an email containing "doctor.com".');
  return;
}

if (user.role === 'Admin') {
  router.replace('/(admin)/user_management');
} else if (user.role === 'Doctor') {
  // Points directly to the index dashboard home route inside the doctor directory
  router.replace('/(doctor)');
} else {
  router.replace('/(patient)/dashboard');
}
  };

  const handlePasswordResetSubmit = () => {
    if (!resetEmail || !newPassword || !confirmNewPassword) {
      Alert.alert('Error', 'Please complete all password update input parameters.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert('Mismatch', 'Your password entries do not match.');
      return;
    }

    const targetEmail = resetEmail.toLowerCase().trim();
    const userIndex = IN_MEMORY_USERS.findIndex(u => u.email.toLowerCase() === targetEmail);

    if (userIndex === -1) {
      Alert.alert('Not Found', 'No verified user matches that email address.');
      return;
    }

    // Apply mutation directly to our app container memory
    IN_MEMORY_USERS[userIndex].password = newPassword;

    Alert.alert(
      'Success 🎉', 
      lang === 'en' ? 'Password updated successfully!' : 'Nenosiri limesasishwa kikamilifu!',
      [
        {
          text: 'OK',
          onPress: () => {
            // Automatically push updated user info back to the main login inputs
            setIdentity(resetEmail);
            setPassword(newPassword);
            
            // Dismiss modal popup
            setForgotModalVisible(false);
            
            // Force state refresh trace
            setRefreshTrigger(!refreshTrigger);

            // Clean setup input values
            setResetEmail('');
            setNewPassword('');
            setConfirmNewPassword('');
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      
      {/* Top Header Controls Area */}
      <View style={styles.topActionHeader}>
        <Text style={[styles.brandLogoText, { color: activeColors.primary }]}>AfyaDirect</Text>
        <View style={styles.controlsRow}>
          {/* Look for this row inside app/(auth)/login.jsx */}
<View style={styles.controlsRow}>
  <TouchableOpacity 
    style={[
      styles.langToggleBtn, 
      { backgroundColor: activeColors.surface, borderColor: activeColors.border }
    ]}
    onPress={() => setLang(lang === 'en' ? 'sw' : 'en')}
  >
    {/* Inside button content text remains the same */}
    <Text style={{ color: activeColors.text, fontWeight: '700', fontSize: 12 }}>
      {lang === 'en' ? 'SW' : 'EN'}
    </Text>
  </TouchableOpacity>
</View>
          
          <AnimatedButton style={styles.themeIconBtn} onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
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
          <AnimatedButton onPress={() => setForgotModalVisible(true)}>
            <Text style={{ color: activeColors.primary, fontSize: 13, fontWeight: '600' }}>{t.forgotPassword}</Text>
          </AnimatedButton>
        </View>
        <TextInput 
          style={[styles.textInputStyle, { borderColor: activeColors.border, color: activeColors.text }]}
          placeholder="••••••••"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <AnimatedButton style={[styles.primaryActionBtn, { backgroundColor: activeColors.primary }]} onPress={handleLogin}>
          <Text style={styles.primaryActionText}>{t.logIn}</Text>
        </AnimatedButton>

        <View style={styles.orDividerLineRow}>
          <View style={[styles.horizontalLine, { backgroundColor: activeColors.border }]} />
          <Text style={styles.orLabelText}>{t.or}</Text>
          <View style={[styles.horizontalLine, { backgroundColor: activeColors.border }]} />
        </View>

        <AnimatedButton style={[styles.googleAuthBtn, { borderColor: activeColors.border }]} onPress={() => Alert.alert("OAuth API Connection")}>
          <View style={styles.googleButtonContentRow}>
            <Image source={require('../../assets/img/google.png')} style={styles.googleButtonIconStyle} resizeMode="contain" />
            <Text style={[styles.googleAuthText, { color: activeColors.text }]}>{t.continueGoogle}</Text>
          </View>
        </AnimatedButton>

        <AnimatedButton onPress={() => router.push('/(auth)/register')} style={{ marginTop: 20 }}>
          <Text style={{ textAlign: 'center', color: '#6B7280', fontSize: 14 }}>
            {t.noAccount} <Text style={{ color: activeColors.primary, fontWeight: '700' }}>{t.signUpNow}</Text>
          </Text>
        </AnimatedButton>
      </View>

      {/* Forgot Password Modal Popup */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={forgotModalVisible}
        onRequestClose={() => setForgotModalVisible(false)}
      >
        <View style={styles.modalOverlayBackground}>
          <View style={[styles.modalContentCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <Text style={[styles.modalHeaderTitle, { color: activeColors.text }]}>
              {lang === 'en' ? 'Create New Password' : 'Unda Nenosiri Jipya'}
            </Text>
            <Text style={styles.modalSubheadingText}>
              {lang === 'en' ? 'Enter account details to adjust internal parameters instantly' : 'Weka taarifa za akaunti yako kubadilisha nenosiri sasa'}
            </Text>

            <Text style={[styles.inputFieldTitle, { color: activeColors.text, marginTop: 10 }]}>Account Email</Text>
            <TextInput
              style={[styles.textInputStyle, { borderColor: activeColors.border, color: activeColors.text }]}
              placeholder="e.g., patient1@example.com"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              value={resetEmail}
              onChangeText={setResetEmail}
            />

            <Text style={[styles.inputFieldTitle, { color: activeColors.text }]}>New Password</Text>
            <TextInput
              style={[styles.textInputStyle, { borderColor: activeColors.border, color: activeColors.text }]}
              placeholder="••••••••"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <Text style={[styles.inputFieldTitle, { color: activeColors.text }]}>Confirm New Password</Text>
            <TextInput
              style={[styles.textInputStyle, { borderColor: activeColors.border, color: activeColors.text }]}
              placeholder="••••••••"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
            />

            <View style={styles.modalActionButtonsRow}>
              <AnimatedButton 
                style={[styles.modalCancelButton, { borderColor: activeColors.border }]} 
                onPress={() => setForgotModalVisible(false)}
              >
                <Text style={[styles.modalCancelText, { color: activeColors.text }]}>{lang === 'en' ? 'Cancel' : 'Ghairi'}</Text>
              </AnimatedButton>

              <AnimatedButton 
                style={[styles.modalSubmitButton, { backgroundColor: activeColors.primary }]} 
                onPress={handlePasswordResetSubmit}
              >
                <Text style={styles.modalSubmitText}>{lang === 'en' ? 'Update' : 'Sasisha'}</Text>
              </AnimatedButton>
            </View>
          </View>
        </View>
      </Modal>

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
  googleAuthBtn: { borderWidth: 1, padding: 14, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  googleButtonContentRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  googleButtonIconStyle: { width: 18, height: 18 },
  googleAuthText: { fontSize: 15, fontWeight: '600' },
  complianceRowArea: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 30, opacity: 0.6 },
  complianceItemText: { fontSize: 11, color: '#6B7280', fontWeight: '600' },
  
  modalOverlayBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContentCard: { width: '100%', padding: 24, borderRadius: 20, borderWidth: 1, elevation: 5 },
  modalHeaderTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 6 },
  modalSubheadingText: { fontSize: 13, color: '#6B7280', textAlign: 'center', marginBottom: 20, lineHeight: 18 },
  modalActionButtonsRow: { flexDirection: 'row', gap: 12, marginTop: 10 },
  modalCancelButton: { flex: 1, padding: 14, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  modalCancelText: { fontSize: 15, fontWeight: '600' },
  modalSubmitButton: { flex: 1, padding: 14, borderRadius: 10, alignItems: 'center' },
  modalSubmitText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' }
});