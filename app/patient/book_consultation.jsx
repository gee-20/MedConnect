import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../../Components/AnimatedButton';

export default function BookConsultation() {
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];
  const [paymentMethod, setPaymentMethod] = useState('M-Pesa'); // M-Pesa or Tigo Pesa
  const [phone, setPhone] = useState('');

  const handleCheckout = () => {
    if (phone.length < 9) {
      Alert.alert("Error", "Please input a valid mobile money phone number.");
      return;
    }
    Alert.alert(
      "Payment Initiated", 
      `A push prompt window has been sent to your device. Confirm transaction of TZS 25,000 via ${paymentMethod}.`
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <Text style={[styles.heading, { color: activeColors.text }]}>Complete Your Booking</Text>
      
      <View style={[styles.summaryCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
        <Text style={[styles.summaryTitle, { color: activeColors.text }]}>Video Consultation Fee</Text>
        <Text style={[styles.price, { color: activeColors.primary }]}>TZS 25,000</Text>
      </View>

      <Text style={[styles.label, { color: activeColors.text }]}>Select Mobile Money Provider</Text>
      <View style={styles.methodRow}>
        <AnimatedButton 
          style={[styles.methodCard, { borderColor: paymentMethod === 'M-Pesa' ? '#EF4444' : activeColors.border, borderWidth: paymentMethod === 'M-Pesa' ? 2 : 1 }]} 
          onPress={() => setPaymentMethod('M-Pesa')}
        >
          <Text style={[styles.methodName, { color: '#EF4444' }]}>M-PESA</Text>
        </AnimatedButton>

        <AnimatedButton 
          style={[styles.methodCard, { borderColor: paymentMethod === 'Tigo Pesa' ? '#2563EB' : activeColors.border, borderWidth: paymentMethod === 'Tigo Pesa' ? 2 : 1 }]} 
          onPress={() => setPaymentMethod('Tigo Pesa')}
        >
          <Text style={[styles.methodName, { color: '#2563EB' }]}>TIGO PESA</Text>
        </AnimatedButton>
      </View>

      <Text style={[styles.label, { color: activeColors.text }]}>Mobile Money Number</Text>
      <TextInput
        style={[styles.input, { borderColor: activeColors.border, color: activeColors.text, backgroundColor: activeColors.surface }]}
        placeholder="07XXXXXXXX"
        placeholderTextColor="#9CA3AF"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <AnimatedButton style={[styles.payBtn, { backgroundColor: activeColors.primary }]} onPress={handleCheckout}>
        <Text style={styles.payBtnText}>🔒 Secure Mobile Checkout</Text>
      </AnimatedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  summaryCard: { padding: 20, borderRadius: 16, borderWidth: 1, alignItems: 'center', marginBottom: 24 },
  summaryTitle: { fontSize: 16, color: '#6B7280' },
  price: { fontSize: 28, fontWeight: 'bold', marginTop: 6 },
  label: { fontSize: 15, fontWeight: '600', marginBottom: 10 },
  methodRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  methodCard: { flex: 1, padding: 16, borderRadius: 12, alignItems: 'center', backgroundColor: '#FFF' },
  methodName: { fontWeight: 'bold', fontSize: 16 },
  input: { borderWidth: 1, borderRadius: 12, padding: 14, fontSize: 16, marginBottom: 24 },
  payBtn: { padding: 16, borderRadius: 12, alignItems: 'center' },
  payBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});