import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../../Components/AnimatedButton';

export default function Register() {
  const router = useRouter();
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];

  // Active Role State Matrix: 'Patient' | 'Doctor' | 'Admin'
  const [selectedRole, setSelectedRole] = useState('Patient');

  // Unified Form Controls Data Tree
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegisterExecution = () => {
    if (!username || !password) {
      Alert.alert("Missing Fields", "Please complete all core identity blocks.");
      return;
    }

    if (selectedRole !== 'Admin') {
      if (!email || !confirmPassword) {
        Alert.alert("Missing Fields", "Please complete all standard fields.");
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert("Validation Failure", "Passwords do not match matching targets.");
        return;
      }
    }

    Alert.alert("Account Initialized", `Registration submitted successfully for standard ${selectedRole} profile token.`);
    router.replace('/(auth)/login');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: activeColors.background }]} contentContainerStyle={{ padding: 24, justifyContent: 'center', flexGrow: 1 }}>
      <Text style={[styles.brandHeader, { color: activeColors.primary }]}>AfyaDirect</Text>
      <Text style={[styles.mainHeading, { color: activeColors.text }]}>Create your account</Text>
      <Text style={styles.subtitle}>Start your journey to better health today.</Text>

      {/* --- SEGMENTED ROLE SELECTION MATRIX --- */}
      <Text style={[styles.fieldTitle, { color: activeColors.text }]}>I AM A:</Text>
      <View style={[styles.roleContainer, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
        {['Patient', 'Doctor', 'Admin'].map((role) => (
          <AnimatedButton 
            key={role} 
            style={[styles.roleSegment, selectedRole === role && { backgroundColor: activeColors.primary }]}
            onPress={() => {
              setSelectedRole(role);
              // Flush parameters on role mutations to maintain clean component fields
              setUsername(''); setEmail(''); setPassword(''); setConfirmPassword('');
            }}
          >
            <Text style={[styles.roleSegmentText, { color: selectedRole === role ? '#FFF' : '#6B7280' }]}>
              {role}
            </Text>
          </AnimatedButton>
        ))}
      </View>

      {/* --- RENDERED CONDITIONAL INPUT INPUT FIELDS --- */}
      <View style={styles.inputFormBox}>
        <Text style={[styles.inputLabel, { color: activeColors.text }]}>Username</Text>
        <TextInput 
          style={[styles.inputField, { borderColor: activeColors.border, color: activeColors.text, backgroundColor: activeColors.surface }]}
          value={username} onChangeText={setUsername} autoCapitalize="none" placeholder="e.g. janesmith" placeholderTextColor="#9CA3AF"
        />

        {/* Hide Email Field conditionally for System Admins */}
        {selectedRole !== 'Admin' && (
          <>
            <Text style={[styles.inputLabel, { color: activeColors.text }]}>Email Address</Text>
            <TextInput 
              style={[styles.inputField, { borderColor: activeColors.border, color: activeColors.text, backgroundColor: activeColors.surface }]}
              value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="jane@example.com" placeholderTextColor="#9CA3AF"
            />
          </>
        )}

        <Text style={[styles.inputLabel, { color: activeColors.text }]}>Create Password</Text>
        <TextInput 
          style={[styles.inputField, { borderColor: activeColors.border, color: activeColors.text, backgroundColor: activeColors.surface }]}
          value={password} onChangeText={setPassword} secureTextEntry placeholder="••••••••" placeholderTextColor="#9CA3AF"
        />

        {/* Hide Password Confirmation conditionally for System Admins */}
        {selectedRole !== 'Admin' && (
          <>
            <Text style={[styles.inputLabel, { color: activeColors.text }]}>Confirm Password</Text>
            <TextInput 
              style={[styles.inputField, { borderColor: activeColors.border, color: activeColors.text, backgroundColor: activeColors.surface }]}
              value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry placeholder="••••••••" placeholderTextColor="#9CA3AF"
            />
          </>
        )}

        <AnimatedButton style={[styles.actionSubmitBtn, { backgroundColor: activeColors.primary }]} onPress={handleRegisterExecution}>
          <Text style={styles.actionSubmitText}>Create Account</Text>
        </AnimatedButton>

        <AnimatedButton onPress={() => router.replace('/(auth)/login')} style={styles.loginRedirectBtn}>
          <Text style={{ color: activeColors.primary, textAlign: 'center', fontWeight: '500' }}>
            Already have an account? Log In
          </Text>
        </AnimatedButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  brandHeader: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginTop: 40 },
  mainHeading: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginTop: 16 },
  subtitle: { color: '#9CA3AF', fontSize: 14, textAlign: 'center', marginTop: 6, marginBottom: 24 },
  fieldTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 8, letterSpacing: 0.5 },
  roleContainer: { flexDirection: 'row', borderRadius: 12, borderWidth: 1, padding: 4, marginBottom: 24 },
  roleSegment: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  roleSegmentText: { fontWeight: 'bold', fontSize: 13 },
  inputFormBox: { width: '100%' },
  inputLabel: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  inputField: { borderWidth: 1, borderRadius: 10, padding: 14, marginBottom: 16, fontSize: 15 },
  actionSubmitBtn: { padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  actionSubmitText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  loginRedirectBtn: { marginTop: 24, marginBottom: 20 }
});