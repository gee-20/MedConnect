import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../../Components/AnimatedButton';

// To this:
import { GLOBAL_CHAT_DATABASE, pushChatMessage, subscribeToChatUpdates } from '../../constants/chatStorage';
export default function PatientChatScreen() {
  const router = useRouter();
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];
  
  const [messages, setMessages] = useState(GLOBAL_CHAT_DATABASE);
  const [typedText, setTypedText] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    const unsubscribe = subscribeToChatUpdates((updatedMessages) => {
      setMessages(updatedMessages);
    });
    return unsubscribe;
  }, []);

  const handleSendMessage = () => {
    if (!typedText.trim()) return;
    pushChatMessage('Patient', typedText.trim());
    setTypedText('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderMessageItem = ({ item }) => {
    const isPatient = item.sender === 'Patient';
    return (
      <View style={[styles.msgWrapper, isPatient ? styles.patientWrapper : styles.doctorWrapper]}>
        <View style={[styles.msgBubble, isPatient ? { backgroundColor: activeColors.primary } : { backgroundColor: activeColors.surface, borderColor: activeColors.border, borderWidth: 1 }]}>
          <Text style={[styles.msgText, isPatient ? { color: '#FFF' } : { color: activeColors.text }]}>{item.text}</Text>
          <Text style={[styles.timeText, isPatient ? { color: 'rgba(255,255,255,0.7)' } : { color: '#9CA3AF' }]}>{item.timestamp}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container, { backgroundColor: activeColors.background }]}>
      {/* Structural Header Strip */}
      <View style={[styles.chatHeader, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
        <AnimatedButton onPress={() => router.back()}>
          <Text style={{ color: activeColors.primary, fontWeight: '700', fontSize: 16 }}>◀ Back</Text>
        </AnimatedButton>
        <View style={{ alignItems: 'center' }}>
          <Text style={[styles.headerName, { color: activeColors.text }]}>Dr. Neema Mabula</Text>
          <Text style={styles.headerSub}>General Practitioner • Active Now</Text>
        </View>
        <Text style={{ opacity: 0 }}>◀ Back</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Persistent Bottom Typing Frame */}
      <View style={[styles.inputContainer, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
        <TextInput
          style={[styles.textInput, { borderColor: activeColors.border, color: activeColors.text }]}
          placeholder="Andika ujumbe hapa..."
          placeholderTextColor="#9CA3AF"
          value={typedText}
          onChangeText={setTypedText}
        />
        <AnimatedButton style={[styles.sendButton, { backgroundColor: activeColors.primary }]} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </AnimatedButton>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderWidth: 1, paddingTop: 45 },
  headerName: { fontSize: 16, fontWeight: 'bold' },
  headerSub: { fontSize: 12, color: '#10B981', fontWeight: '500' },
  msgWrapper: { width: '100%', marginVertical: 6, flexDirection: 'row' },
  patientWrapper: { justifyContent: 'flex-end' },
  doctorWrapper: { justifyContent: 'flex-start' },
  msgBubble: { maxWidth: '75%', padding: 12, borderRadius: 14 },
  msgText: { fontSize: 15, lineHeight: 20 },
  timeText: { fontSize: 10, textAlign: 'right', marginTop: 4, fontWeight: '600' },
  inputContainer: { flexDirection: 'row', padding: 14, alignItems: 'center', gap: 10, borderWidth: 1, paddingBottom: Platform.OS === 'ios' ? 30 : 14 },
  textInput: { flex: 1, borderWidth: 1, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 15 },
  sendButton: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20 },
  sendButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 }
});