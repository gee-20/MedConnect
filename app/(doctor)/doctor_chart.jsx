import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import AnimatedButton from '../../Components/AnimatedButton';
import { GLOBAL_CHAT_DATABASE, pushChatMessage, subscribeToChatUpdates } from '../../constants/chatStorage';

export default function DoctorChatScreen() {
  const router = useRouter();
  const { theme } = useContext(AppContext);
  const activeColors = Colors[theme];
  
  const [messages, setMessages] = useState(GLOBAL_CHAT_DATABASE);
  const [typedText, setTypedText] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    // Listens to the global memory store so it updates instantly when patient types
    const unsubscribe = subscribeToChatUpdates((updatedMessages) => {
      setMessages(updatedMessages);
    });
    return unsubscribe;
  }, []);

  const handleSendMessage = () => {
    if (!typedText.trim()) return;
    pushChatMessage('Doctor', typedText.trim());
    setTypedText('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderMessageItem = ({ item }) => {
    const isDoctor = item.sender === 'Doctor';
    return (
      <View style={[styles.msgWrapper, isDoctor ? styles.doctorWrapper : styles.patientWrapper]}>
        <View style={[styles.msgBubble, isDoctor ? { backgroundColor: activeColors.primary } : { backgroundColor: activeColors.surface, borderColor: activeColors.border, borderWidth: 1 }]}>
          <Text style={[styles.msgText, isDoctor ? { color: '#FFF' } : { color: activeColors.text }]}>{item.text}</Text>
          <Text style={[styles.timeText, isDoctor ? { color: 'rgba(255,255,255,0.7)' } : { color: '#9CA3AF' }]}>{item.timestamp}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container, { backgroundColor: activeColors.background }]}>
      {/* Header matching Doctor styles */}
      <View style={[styles.chatHeader, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
        <AnimatedButton onPress={() => router.back()}>
          <Text style={{ color: activeColors.primary, fontWeight: '700', fontSize: 16 }}>◀ Queue</Text>
        </AnimatedButton>
        <View style={{ alignItems: 'center' }}>
          <Text style={[styles.headerName, { color: activeColors.text }]}>Salome (Patient)</Text>
          <Text style={styles.headerSub}>Live Consultation Channel</Text>
        </View>
        <Text style={{ opacity: 0 }}>◀ Queue</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Input container row */}
      <View style={[styles.inputContainer, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
        <TextInput
          style={[styles.textInput, { borderColor: activeColors.border, color: activeColors.text }]}
          placeholder="Andika majibu ya kitabibu..."
          placeholderTextColor="#9CA3AF"
          value={typedText}
          onChangeText={setTypedText}
        />
        <AnimatedButton style={[styles.sendButton, { backgroundColor: activeColors.primary }]} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Reply</Text>
        </AnimatedButton>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderWidth: 1, paddingTop: 45 },
  headerName: { fontSize: 16, fontWeight: 'bold' },
  headerSub: { fontSize: 12, color: '#0F766E', fontWeight: '500' },
  msgWrapper: { width: '100%', marginVertical: 6, flexDirection: 'row' },
  doctorWrapper: { justifyContent: 'flex-end' },
  patientWrapper: { justifyContent: 'flex-start' },
  msgBubble: { maxWidth: '75%', padding: 12, borderRadius: 14 },
  msgText: { fontSize: 15, lineHeight: 20 },
  timeText: { fontSize: 10, textAlign: 'right', marginTop: 4, fontWeight: '600' },
  inputContainer: { flexDirection: 'row', padding: 14, alignItems: 'center', gap: 10, borderWidth: 1, paddingBottom: Platform.OS === 'ios' ? 30 : 14 },
  textInput: { flex: 1, borderWidth: 1, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 15 },
  sendButton: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20 },
  sendButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 }
});