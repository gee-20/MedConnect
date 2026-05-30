import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import { Translations } from '../../constants/language';
import AnimatedButton from '../../Components/AnimatedButton';

export default function ConfirmationScreen() {
  const { theme, lang, setLang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const t = Translations[lang];
  const router = useRouter();
  const params = useLocalSearchParams();

  const [showWaitingRoom, setShowWaitingRoom] = useState(false);
  const [minsRemaining, setMinsRemaining] = useState(4);
  const [secsRemaining, setSecsRemaining] = useState(10);

  useEffect(() => {
    let internalTimer;
    if (showWaitingRoom) {
      internalTimer = setInterval(() => {
        setSecsRemaining((prev) => {
          if (prev > 0) return prev - 1;
          setMinsRemaining((m) => (m > 0 ? m - 1 : 0));
          return 59;
        });
      }, 1000);
    }
    return () => clearInterval(internalTimer);
  }, [showWaitingRoom]);

  return (
    <View style={[styles.outerSafeAreaFrame, { backgroundColor: activeColors.background }]}>
      
      {/* INITIAL RECEIPT VIEW SUB-STAGE */}
      {!showWaitingRoom ? (
        <View style={{ flex: 1 }}>
          <View style={[styles.globalNavigationBarHeader, { borderBottomColor: activeColors.border }]}>
            <Text style={[styles.brandHeaderTitleText, { color: activeColors.text }]}>AfyaDirect</Text>
            <TouchableOpacity style={styles.langPillBadge} onPress={() => setLang(lang === 'en' ? 'sw' : 'en')}>
              <Text style={{ fontSize: 11, color: '#6B7280', fontWeight: '600' }}>🌐 {lang === 'en' ? 'EN | SW' : 'SW | EN'}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollLayoutGapping}>
            <View style={[styles.successWhiteCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
              <View style={styles.successCheckCircle}><Text style={{ color: '#10B981', fontSize: 24, fontWeight: 'bold' }}>✓</Text></View>
              <Text style={[styles.successHeadline, { color: activeColors.text }]}>{t.bookingConfirmed}</Text>
              <Text style={styles.successSubtext}>{t.successSubtitle}</Text>

              <View style={[styles.receiptBox, { backgroundColor: activeColors.background, borderColor: activeColors.border }]}>
                <View style={styles.receiptRow}><Text style={styles.receiptLabel}>{t.appointmentId}</Text><Text style={[styles.receiptVal, { color: activeColors.text }]}>AP0001</Text></View>
                <View style={[styles.lineDivider, { borderBottomColor: activeColors.border }]} />
                <View style={styles.receiptRow}><Text style={styles.receiptLabel}>{t.status}</Text><Text style={{ color: '#10B981', fontWeight: '700' }}>✓ {t.confirmed}</Text></View>
                <View style={[styles.lineDivider, { borderBottomColor: activeColors.border }]} />
                <View style={styles.receiptRow}><Text style={styles.receiptLabel}>{t.payment}</Text><Text style={[styles.receiptVal, { color: activeColors.text }]}>{t.paid}</Text></View>
              </View>

              <AnimatedButton style={[styles.primaryActionBlockLongButton, { backgroundColor: activeColors.primary }]} onPress={() => setShowWaitingRoom(true)}>
                <Text style={styles.primaryActionButtonLabelText}>{t.goToMyConsultations}  →</Text>
              </AnimatedButton>
              <TouchableOpacity style={{ marginTop: 14 }} onPress={() => router.replace('/(patient)/dashboard')}>
                <Text style={{ color: '#6B7280', fontWeight: '700' }}>{t.backToHome}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      ) : (
        /* LIVE WAITING ROOM SUB-STAGE */
        <View style={{ flex: 1 }}>
          <View style={[styles.globalNavigationBarHeader, { borderBottomColor: activeColors.border }]}>
            <TouchableOpacity onPress={() => setShowWaitingRoom(false)}><Text style={[styles.backNavArrowText, { color: activeColors.text }]}>←</Text></TouchableOpacity>
            <Text style={[styles.brandHeaderTitleText, { color: activeColors.text }]}>Consultation Room</Text>
            <View style={styles.miniAvatar}><Text style={{ fontSize: 12 }}>👤</Text></View>
          </View>

          <ScrollView contentContainerStyle={styles.scrollLayoutGapping}>
            <View style={styles.statusBarRibbon}>
              <View style={styles.livePulseDot} />
              <Text style={styles.ribbonLabel}>{t.readyConsultation}</Text>
            </View>

            <View style={[styles.successWhiteCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border, alignItems: 'center' }]}>
              <Text style={{ fontSize: 44 }}>👨‍⚕️</Text>
              <Text style={[styles.successHeadline, { color: activeColors.text, marginTop: 6 }]}>{params.doctorName}</Text>
              <Text style={{ color: '#6B7280', fontSize: 13 }}>{params.specialty}</Text>
              <View style={[styles.lineDivider, { borderBottomColor: activeColors.border, width: '100%' }]} />
              <Text style={styles.waitingRoomSubHeader}>{t.startsIn}</Text>
              
              <View style={{ flexDirection: 'row', gap: 10, marginVertical: 10 }}>
                <Text style={[styles.timerDigits, { color: activeColors.text }]}>{minsRemaining < 10 ? `0${minsRemaining}` : minsRemaining}m</Text>
                <Text style={[styles.timerDigits, { color: activeColors.text }]}>{secsRemaining < 10 ? `0${secsRemaining}` : secsRemaining}s</Text>
              </View>

              <AnimatedButton style={[styles.primaryActionBlockLongButton, { backgroundColor: activeColors.primary }]} onPress={() => router.push('/(patient)/video_call')}>
                <Text style={styles.primaryActionButtonLabelText}>▶  {t.startConsultationBtn}</Text>
              </AnimatedButton>
            </View>

            {/* Preparation Checklist */}
            <View style={[styles.successWhiteCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border, marginTop: 10, alignItems: 'flex-start' }]}>
              <Text style={{ fontWeight: 'bold', color: activeColors.text, marginBottom: 8 }}>{t.preparationChecklist}</Text>
              <Text style={{ color: activeColors.text, marginVertical: 2 }}>✓ {t.checkStableNet}</Text>
              <Text style={{ color: activeColors.text, marginVertical: 2 }}>✓ {t.checkHardware}</Text>
              <Text style={{ color: activeColors.text, marginVertical: 2 }}>⚬ {t.checkQuiet}</Text>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerSafeAreaFrame: { flex: 1, paddingTop: Platform.OS === 'ios' ? 40 : 15 },
  globalNavigationBarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1 },
  brandHeaderTitleText: { fontSize: 18, fontWeight: 'bold', color: '#0F766E' },
  backNavArrowText: { fontSize: 22, fontWeight: '300' },
  langPillBadge: { backgroundColor: 'rgba(0,0,0,0.04)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12 },
  scrollLayoutGapping: { padding: 20, paddingBottom: 60 },
  successWhiteCard: { width: '100%', borderRadius: 16, borderWidth: 1, padding: 20, alignItems: 'center' },
  successCheckCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(16,185,129,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  successHeadline: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  successSubtext: { fontSize: 13, color: '#6B7280', textAlign: 'center', marginVertical: 8 },
  receiptBox: { width: '100%', borderRadius: 12, borderWidth: 1, padding: 12, marginVertical: 12 },
  receiptRow: { flexDirection: 'row', justifyContent: 'space-between' },
  receiptLabel: { fontSize: 11, fontWeight: '700', color: '#9CA3AF' },
  receiptVal: { fontSize: 13, fontWeight: '700' },
  lineDivider: { borderBottomWidth: 1, marginVertical: 8 },
  primaryActionBlockLongButton: { borderRadius: 12, paddingVertical: 14, alignItems: 'center', justifyContent: 'center', marginTop: 14, width: '100%' },
  primaryActionButtonLabelText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  miniAvatar: { width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.05)', alignItems: 'center', justifyContent: 'center' },
  statusBarRibbon: { width: '100%', backgroundColor: '#10B981', borderRadius: 8, padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  livePulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFF', marginRight: 8 },
  ribbonLabel: { color: '#FFF', fontWeight: '700', fontSize: 13 },
  waitingRoomSubHeader: { fontSize: 11, fontWeight: '800', color: '#9CA3AF', letterSpacing: 0.5 },
  timerDigits: { fontSize: 24, fontWeight: 'bold' }
});