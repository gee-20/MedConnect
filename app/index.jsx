import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        router.replace('/onboarding');
      }, 1500);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image 
        source={require('../assets/icon.png')} 
        style={[styles.logo, { opacity: fadeAnim }]} 
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
     backgroundColor: '#0F766E',
      justifyContent: 'center', 
      alignItems: 'center'
     },
  logo: {
     width: 180, 
     height: 180
     }
});