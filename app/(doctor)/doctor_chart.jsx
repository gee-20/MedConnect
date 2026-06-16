import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import { Translations } from '../../constants/language';
import DoctorHeader from '../../Components/doctor/doctor_header';
import DoctorFooter from '../../Components/doctor/admin_footer';

export default function DoctorPatientChatScreen() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const t = Translations[lang];

  const [chatLogsList, setChatLogsList] = useState([
    { id: '1', sender: 'patient', text: 'Hello Doctor, I finished the dosage but still feel slight fatigue.', time: '11:05 AM' },
    { id: '2', sender: 'doctor', text: 'Hello. Keep hydrating and monitor your temperature today.', time: '11:12 AM' }
  ]);
  const [typedMessageDraft, setTypedMessageDraft] = useState('');

  const sendNewChatMessage = () => {
    if (!typedMessageDraft.trim()) return;
    setChatLogsList(prev => [...prev, {
      id: String(prev.length + 1),
      sender: 'doctor',
      text: typedMessageDraft,
      time: '14:02 PM'
    }]);
    setTypedMessageDraft('');
  };

  return (
    <SafeAreaView style={[styles.safeFillContainer, { backgroundColor: activeColors.background }]}>
      <DoctorHeader title={t.chat} />
      
      <View style={styles.chatWorkspaceLayoutBodyBox}>
        <View style={[styles.recipientProfileContextNotificationBannerBar, { backgroundColor: activeColors.surface, borderBottomColor: activeColors.border }]}>
          <Text style={[styles.recipientNameLabelText, { color: activeColors.text }]}>Case File Room: Amani Juma</Text>
          <Text style={styles.recipientStatusLabelSpan}>Active Consultation Channel</Text>
        </View>

        <ScrollView contentContainerStyle={styles.messageListScrollLayoutGappingContainer}>
          {chatLogsList.map((message) => {
            const isDoctorOutgoingMsg = message.sender === 'doctor';
            return (
              <View 
                key={message.id} 
                style={[
                  styles.messageSpeechBubbleBoxWrapper, 
                  isDoctorOutgoingMsg ? styles.doctorOutgoingAlignRight : styles.patientIncomingAlignLeft
                ]}
              >
                <View 
                  style={[
                    styles.messageSpeechBubbleTextContentContainer, 
                    { backgroundColor: isDoctorOutgoingMsg ? activeColors.primary : activeColors.surface, borderColor: activeColors.border }
                  ]}
                >
                  <Text style={[styles.bubbleMessageTextBody, { color: isDoctorOutgoingMsg ? '#FFF' : activeColors.text }]}>
                    {message.text}
                  </Text>
                  <Text style={[styles.bubbleTimeSubtextMeta, { color: isDoctorOutgoingMsg ? 'rgba(255,255,255,0.7)' : '#9CA3AF' }]}>
                    {message.time}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Message Input Controls System Dock */}
        <View style={[styles.inputMessageDockControlPanelRow, { backgroundColor: activeColors.surface, borderTopColor: activeColors.border }]}>
          <TextInput 
            style={[styles.dockTextInputElementField, { backgroundColor: activeColors.background, color: activeColors.text, borderColor: activeColors.border }]}
            placeholder="Type clinical advice..."
            placeholderTextColor="#9CA3AF"
            value={typedMessageDraft}
            onChangeText={setTypedMessageDraft}
          />
          <TouchableOpacity style={[styles.dockSubmitTriggerCircleButton, { backgroundColor: activeColors.primary }]} onPress={sendNewChatMessage}>
            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>➔</Text>
          </TouchableOpacity>
        </View>
      </View>

      <DoctorFooter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeFillContainer: { flex: 1 },
  chatWorkspaceLayoutBodyBox: { flex: 1 },
  recipientProfileContextNotificationBannerBar: { paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1 },
  recipientNameLabelText: { fontSize: 13, fontWeight: '700' },
  recipientStatusLabelSpan: { fontSize: 11, color: '#10B981', fontWeight: '500', marginTop: 1 },
  messageListScrollLayoutGappingContainer: { padding: 16, gap: 12 },
  messageSpeechBubbleBoxWrapper: { flexDirection: 'row', width: '100%', marginBottom: 4 },
  doctorOutgoingAlignRight: { justifyContent: 'flex-end' },
  patientIncomingAlignLeft: { justifyContent: 'flex-start' },
  messageSpeechBubbleTextContentContainer: { maxWidth: '80%', padding: 12, borderRadius: 14, borderWidth: 1 },
  bubbleMessageTextBody: { fontSize: 13, lineHeight: 18, fontWeight: '500' },
  bubbleTimeSubtextMeta: { fontSize: 9, textAlign: 'right', marginTop: 4 },
  inputMessageDockControlPanelRow: { flexDirection: 'row', padding: 12, gap: 10, alignItems: 'center', borderTopWidth: 1 },
  dockTextInputElementField: { flex: 1, height: 40, borderRadius: 20, borderWidth: 1, paddingHorizontal: 16, fontSize: 13 },
  dockSubmitTriggerCircleButton: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' }
});