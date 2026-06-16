import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../_layout';
import { Colors } from '../../constants/colors';
import { Translations } from '../../constants/language';
import DoctorFooter from '../../Components/doctor/admin_footer';

export default function DoctorProfileScreen() {
  const { theme, setTheme, lang, setLang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const t = Translations[lang];
  const router = useRouter();

  // Handle systemic logout request
  const handleLogout = () => {
    Alert.alert(
      lang === 'en' ? 'Logout' : 'Kuondoka',
      lang === 'en' ? 'Are you sure you want to log out from AfyaDirect Pro?' : 'Je, una uhakika unataka kuondoka kwenye mfumo wa AfyaDirect Pro?',
      [
        { text: lang === 'en' ? 'Cancel' : 'Ghairi', style: 'cancel' },
        { text: 'OK', onPress: () => router.replace('/(auth)/login') }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeContainer, { backgroundColor: activeColors.background }]}>
      
      {/* 1. VISIBILITY STATUS TOP BRAND HEADER ROW (Matches image_3d55c4.jpg layout) */}
      <View style={[styles.topCustomHeaderBar, { backgroundColor: activeColors.background }]}>
        <View style={styles.headerLeftCluster}>
          <View style={styles.activeStatusDotIndicatorPointer} />
          <Text style={[styles.brandHeaderMainTitleText, { color: activeColors.text }]}>AfyaDirect Pro</Text>
        </View>

        <View style={styles.headerRightActionCluster}>
          {/* Language Status Badge (Synchronized with selected language state) */}
          <View style={[styles.headerLanguageBadgeIndicatorFrame, { backgroundColor: theme === 'dark' ? '#1F2937' : '#E5E7EB' }]}>
            <Text style={[styles.headerLanguageBadgeIndicatorTextValue, { color: '#10B981' }]}>
              {lang.toUpperCase()}
            </Text>
          </View>

          {/* Interactive Notification Bell Shortcut Toggle */}
          <TouchableOpacity 
            style={styles.notificationBellActionButton} 
            onPress={() => router.push('/(doctor)/notifications')}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 20 }}>🔔</Text>
            <View style={styles.unreadNotificationIndicatorDotBadge} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollLayoutGapping} showsVerticalScrollIndicator={false}>
        
        {/* Doctor Persona / Identity Hero Header Card */}
        <View style={[styles.profileHeroCard, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          <View style={styles.avatarLargeCircleFrame}>
            <Text style={{ fontSize: 44 }}>👨‍⚕️</Text>
            <TouchableOpacity style={styles.avatarEditPencilPill}>
              <Text style={{ color: '#FFF', fontSize: 10, fontWeight: '700' }}>✏️</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.doctorNameText, { color: activeColors.text }]}>Dr. David Mwemba</Text>
          <Text style={styles.doctorMetadataSubtitle}>Senior Cardiologist • Registration No: MAT-2025-08</Text>
          <Text style={styles.doctorContactTextLine}>📞 +255 712 345 678  •  ✉️ mwemba.d@afyadirect.go.tz</Text>
        </View>

        {/* Practice Metrics Overview Row Grid */}
        <View style={styles.metricsTwinRowLayout}>
          <View style={[styles.metricSummaryBox, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <Text style={styles.metricLabelOverhead}>Total Reviews</Text>
            <Text style={[styles.metricValueHeroText, { color: '#10B981' }]}>4.9 ★</Text>
            <Text style={styles.metricSubtextFooter}>From 240+ Patients</Text>
          </View>
          <View style={[styles.metricSummaryBox, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
            <Text style={styles.metricLabelOverhead}>Consultations</Text>
            <Text style={[styles.metricValueHeroText, { color: activeColors.primary || '#046A38' }]}>1,284</Text>
            <Text style={styles.metricSubtextFooter}>Completed Lifecycle</Text>
          </View>
        </View>

        {/* Section Block: System Configurations Settings Matrix */}
        <Text style={[styles.sectionHeadingStandardTextLabel, { color: activeColors.text }]}>
          {lang === 'en' ? 'Account Settings' : 'Mipangilio ya Akaunti'}
        </Text>

        <View style={[styles.settingsContainerBlock, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
          
          {/* 1. Phone Configuration Field View */}
          <TouchableOpacity style={[styles.settingsRowItemCell, { borderBottomColor: activeColors.border }]} onPress={() => Alert.alert('Update Info', 'Change contact baseline.')}>
            <View style={styles.settingsRowItemLeftCluster}>
              <View style={[styles.settingsIconWrapperCircle, { backgroundColor: theme === 'dark' ? '#1F2937' : '#F3F4F6' }]}><Text style={{ fontSize: 14 }}>📱</Text></View>
              <View style={{ marginLeft: 12 }}>
                <Text style={[styles.settingsItemMainLabel, { color: activeColors.text }]}>
                  {lang === 'en' ? 'Phone Number' : 'Namba ya Simu'}
                </Text>
                <Text style={styles.settingsItemSubtextMeta}>+255 712 345 678</Text>
              </View>
            </View>
            <Text style={{ color: '#9CA3AF', fontSize: 14 }}>➔</Text>
          </TouchableOpacity>

          {/* 2. Language Multi-Switch Controller Toggle (Matches image_3d55c4.jpg styling) */}
          <View style={[styles.settingsRowItemCell, { borderBottomColor: activeColors.border }]}>
            <View style={styles.settingsRowItemLeftCluster}>
              <View style={[styles.settingsIconWrapperCircle, { backgroundColor: theme === 'dark' ? '#1F2937' : '#F3F4F6' }]}><Text style={{ fontSize: 14 }}>🌐</Text></View>
              <View style={{ marginLeft: 12 }}>
                <Text style={[styles.settingsItemMainLabel, { color: activeColors.text }]}>
                  {lang === 'en' ? 'System Language' : 'Lugha ya Mfumo'}
                </Text>
                <Text style={styles.settingsItemSubtextMeta}>{lang === 'en' ? 'English Selected' : 'Kiswahili Kimechaguliwa'}</Text>
              </View>
            </View>
            <View style={[styles.languageTogglePillFrame, { backgroundColor: theme === 'dark' ? '#1F2937' : '#E5E7EB' }]}>
              <TouchableOpacity 
                style={[styles.languageToggleHalfCell, lang === 'en' && { backgroundColor: '#10B981' }]} 
                onPress={() => setLang('en')}
              >
                <Text style={[styles.languageToggleText, lang === 'en' ? { color: '#FFF', fontWeight: '700' } : { color: '#6B7280' }]}>EN</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.languageToggleHalfCell, lang === 'sw' && { backgroundColor: '#10B981' }]} 
                onPress={() => setLang('sw')}
              >
                <Text style={[styles.languageToggleText, lang === 'sw' ? { color: '#FFF', fontWeight: '700' } : { color: '#6B7280' }]}>SW</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 3. System Dynamic Interface Layout Light/Dark Mode Switch */}
          <View style={styles.settingsRowItemCell}>
            <View style={styles.settingsRowItemLeftCluster}>
              <View style={[styles.settingsIconWrapperCircle, { backgroundColor: theme === 'dark' ? '#1F2937' : '#F3F4F6' }]}><Text style={{ fontSize: 14 }}>🌙</Text></View>
              <View style={{ marginLeft: 12 }}>
                <Text style={[styles.settingsItemMainLabel, { color: activeColors.text }]}>
                  {lang === 'en' ? 'Appearance Mode' : 'Muonekano wa Mfumo'}
                </Text>
                <Text style={styles.settingsItemSubtextMeta}>
                  {theme === 'dark' ? (lang === 'en' ? 'Dark Theme Active' : 'Modi ya Giza') : (lang === 'en' ? 'Light Theme Active' : 'Modi ya Mwanga')}
                </Text>
              </View>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={(isDark) => setTheme(isDark ? 'dark' : 'light')}
              trackColor={{ false: '#D1D5DB', true: '#10B981' }}
              thumbColor={Platform.OS === 'android' ? '#FFFFFF' : ''}
            />
          </View>
        </View>

        {/* Section Block: Mobile Money Payout Wallet Links */}
        <Text style={[styles.sectionHeadingStandardTextLabel, { color: activeColors.text, marginTop: 12 }]}>
          {lang === 'en' ? 'Payout Wallet Method' : 'Njia ya Kupokelea Malipo'}
        </Text>

        <View style={[styles.settingsContainerBlock, { backgroundColor: activeColors.surface, borderColor: activeColors.border, padding: 14 }]}>
          <View style={styles.payoutWalletRowLeftGroup}>
            <View style={[styles.payoutWalletProviderIconHolder, { backgroundColor: theme === 'dark' ? '#1F2937' : '#E8F5E9' }]}><Text style={{ fontSize: 18 }}>📱</Text></View>
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={[styles.settingsItemMainLabel, { color: activeColors.text }]}>Vodacom M-Pesa Pro</Text>
              <Text style={{ color: '#10B981', fontSize: 11, fontWeight: '700', marginTop: 1 }}>✓ Linked Account</Text>
              <Text style={styles.settingsItemSubtextMeta} numberOfLines={1}>Last payout processed yesterday to account phone suffix *678</Text>
            </View>
          </View>
        </View>

        {/* Core System Logout Execution Trigger */}
        <TouchableOpacity style={styles.logoutButtonFormCellContainer} onPress={handleLogout}>
          <Text style={styles.logoutButtonFormCellLabelText}>
            🚪 {lang === 'en' ? 'Logout from AfyaDirect Pro' : 'Ondoka kwenye AfyaDirect Pro'}
          </Text>
        </TouchableOpacity>

        {/* Footnotes Application Metadata Branding Label Context */}
        <Text style={styles.versioningDisclaimerFootnoteLabel}>
          App Version 2.6.1 [Dar es Salaam Workspace Edition]
        </Text>

      </ScrollView>

      {/* Persistent Custom Footer Navigation Bar */}
      <DoctorFooter />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1 },
  
  // Custom Header Styles based on image_3d55c4.jpg
  topCustomHeaderBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingTop: Platform.OS === 'ios' ? 10 : 16,
    paddingBottom: 12 
  },
  headerLeftCluster: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  activeStatusDotIndicatorPointer: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#10B981' },
  brandHeaderMainTitleText: { fontSize: 16, fontWeight: '800', letterSpacing: -0.3 },
  headerRightActionCluster: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  headerLanguageBadgeIndicatorFrame: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  headerLanguageBadgeIndicatorTextValue: { fontSize: 11, fontWeight: '800' },
  notificationBellActionButton: { position: 'relative', padding: 2 },
  unreadNotificationIndicatorDotBadge: { position: 'absolute', top: 0, right: 0, width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#EF4444' },

  scrollLayoutGapping: { padding: 14, paddingBottom: 80 },
  profileHeroCard: { borderRadius: 16, borderWidth: 1, padding: 16, alignItems: 'center', marginBottom: 14 },
  avatarLargeCircleFrame: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(0,0,0,0.03)', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: 12 },
  avatarEditPencilPill: { position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderRadius: 12, backgroundColor: '#046A38', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFF' },
  doctorNameText: { fontSize: 18, fontWeight: '800', letterSpacing: -0.3 },
  doctorMetadataSubtitle: { fontSize: 12, color: '#6B7280', textAlign: 'center', marginTop: 2, paddingHorizontal: 10 },
  doctorContactTextLine: { fontSize: 11, color: '#9CA3AF', marginTop: 4 },
  metricsTwinRowLayout: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  metricSummaryBox: { flex: 1, borderRadius: 12, borderWidth: 1, padding: 14, alignItems: 'center' },
  metricLabelOverhead: { fontSize: 10, fontWeight: '700', color: '#9CA3AF', letterSpacing: 0.3 },
  metricValueHeroText: { fontSize: 20, fontWeight: '800', marginVertical: 4 },
  metricSubtextFooter: { fontSize: 10, color: '#6B7280' },
  sectionHeadingStandardTextLabel: { fontSize: 14, fontWeight: '800', marginBottom: 10, paddingLeft: 2 },
  settingsContainerBlock: { borderRadius: 14, borderWidth: 1, overflow: 'hidden', marginBottom: 16 },
  settingsRowItemCell: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderBottomWidth: 1 },
  settingsRowItemLeftCluster: { flexDirection: 'row', alignItems: 'center' },
  settingsIconWrapperCircle: { width: 34, height: 34, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  settingsItemMainLabel: { fontSize: 13, fontWeight: '700' },
  settingsItemSubtextMeta: { fontSize: 11, color: '#9CA3AF', marginTop: 1 },
  
  // Unified Custom Language Switcher Pill Frame
  languageTogglePillFrame: { flexDirection: 'row', borderRadius: 6, padding: 2, width: 90, height: 32 },
  languageToggleHalfCell: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 4 },
  languageToggleText: { fontSize: 11, fontWeight: '700' },
  
  payoutWalletRowLeftGroup: { flexDirection: 'row', alignItems: 'center' },
  payoutWalletProviderIconHolder: { width: 40, height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  logoutButtonFormCellContainer: { width: '100%', height: 48, borderRadius: 12, backgroundColor: '#FEE2E2', borderWidth: 1, borderColor: '#FCA5A5', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  logoutButtonFormCellLabelText: { color: '#DC2626', fontWeight: '700', fontSize: 13 },
  versioningDisclaimerFootnoteLabel: { fontSize: 10, color: '#9CA3AF', textAlign: 'center', marginTop: 16, fontWeight: '500' }
});