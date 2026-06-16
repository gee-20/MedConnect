import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { AppContext } from '../../app/_layout';
import { Colors } from '../../constants/colors';

export default function DoctorFooter() {
  const { theme, lang } = useContext(AppContext);
  const activeColors = Colors[theme];
  const router = useRouter();
  
  // 1. Get the current active URL pathname dynamically
  const pathname = usePathname();

  // Helper to determine if a specific tab path is active
  const isActive = (targetRoute) => {
    // Matches exact path or checking if path ends with target route layout
    return pathname === targetRoute || pathname.endsWith(targetRoute);
  };

  // 2. Set dynamic active indicator colors for visibility states
  const getActiveItemColor = () => {
    if (theme === 'dark') {
      return '#10B981'; // Highly visible vivid green-teal for dark mode surfaces
    }
    return '#046A38'; // Solid deep green for light mode readability
  };

  const getInactiveItemColor = () => {
    return '#9CA3AF'; // Muted slate gray for inactive items
  };

  // Safe navigation wrapper to avoid redundant pushes to the exact same screen
  const navigateTo = (route) => {
    if (!isActive(route)) {
      router.replace(route);
    }
  };

  // Localization labels for navigation tracks
  const labels = {
    en: { dashboard: 'Dashboard', queue: 'Queue', records: 'Records', earnings: 'Earnings', profile: 'Profile' },
    sw: { dashboard: 'Dashibodi', queue: 'Foleni', records: 'Kumbukumbu', earnings: 'Mapato', profile: 'Wasifu' }
  };
  
  const currentLabels = labels[lang] || labels.en;

  return (
    <View style={[styles.footerContainerContainerFlexRow, { backgroundColor: activeColors.surface, borderColor: activeColors.border }]}>
      
      {/* 1. DASHBOARD TAB */}
      <TouchableOpacity style={styles.footerTabCellButtonOption} onPress={() => navigateTo('/(doctor)')}>
        <Text style={[styles.tabIconGlyphGraphicText, { color: isActive('/(doctor)') ? getActiveItemColor() : getInactiveItemColor() }]}>
          📊
        </Text>
        <Text style={[styles.tabLabelText, { 
          color: isActive('/(doctor)') ? getActiveItemColor() : getInactiveItemColor(),
          fontWeight: isActive('/(doctor)') ? '700' : '500'
        }]}>
          {currentLabels.dashboard}
        </Text>
      </TouchableOpacity>

      {/* 2. QUEUE TAB */}
      <TouchableOpacity style={styles.footerTabCellButtonOption} onPress={() => navigateTo('/(doctor)/queue')}>
        <Text style={[styles.tabIconGlyphGraphicText, { color: isActive('/queue') ? getActiveItemColor() : getInactiveItemColor() }]}>
          📋
        </Text>
        <Text style={[styles.tabLabelText, { 
          color: isActive('/queue') ? getActiveItemColor() : getInactiveItemColor(),
          fontWeight: isActive('/queue') ? '700' : '500'
        }]}>
          {currentLabels.queue}
        </Text>
      </TouchableOpacity>

      {/* 3. RECORDS TAB */}
      <TouchableOpacity style={styles.footerTabCellButtonOption} onPress={() => navigateTo('/(doctor)/records')}>
        <Text style={[styles.tabIconGlyphGraphicText, { color: isActive('/records') ? getActiveItemColor() : getInactiveItemColor() }]}>
          📁
        </Text>
        <Text style={[styles.tabLabelText, { 
          color: isActive('/records') ? getActiveItemColor() : getInactiveItemColor(),
          fontWeight: isActive('/records') ? '700' : '500'
        }]}>
          {currentLabels.records}
        </Text>
      </TouchableOpacity>

      {/* 4. EARNINGS TAB */}
      <TouchableOpacity style={styles.footerTabCellButtonOption} onPress={() => navigateTo('/(doctor)/earnings')}>
        <Text style={[styles.tabIconGlyphGraphicText, { color: isActive('/earnings') ? getActiveItemColor() : getInactiveItemColor() }]}>
          💵
        </Text>
        <Text style={[styles.tabLabelText, { 
          color: isActive('/earnings') ? getActiveItemColor() : getInactiveItemColor(),
          fontWeight: isActive('/earnings') ? '700' : '500'
        }]}>
          {currentLabels.earnings}
        </Text>
      </TouchableOpacity>

      {/* 5. PROFILE TAB */}
      <TouchableOpacity style={styles.footerTabCellButtonOption} onPress={() => navigateTo('/(doctor)/profile')}>
        <Text style={[styles.tabIconGlyphGraphicText, { color: isActive('/profile') ? getActiveItemColor() : getInactiveItemColor() }]}>
          👤
        </Text>
        <Text style={[styles.tabLabelText, { 
          color: isActive('/profile') ? getActiveItemColor() : getInactiveItemColor(),
          fontWeight: isActive('/profile') ? '700' : '500'
        }]}>
          {currentLabels.profile}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  footerContainerContainerFlexRow: {
    flexDirection: 'row',
    height: 64,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 6,
    paddingTop: 4,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%'
  },
  footerTabCellButtonOption: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
    gap: 3
  },
  tabIconGlyphGraphicText: {
    fontSize: 18,
    textAlign: 'center'
  },
  tabLabelText: {
    fontSize: 10,
    letterSpacing: -0.1
  }
});