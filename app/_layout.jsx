import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import { Slot, Stack } from 'expo-router'
import { colors } from '../constants/colors'

const RootLayout = () => {
    const colorScheme = useColorScheme()
    const theme = colors[colorScheme] ?? colors.light

  return (
    
    <Stack screenOptions={{
        headerStyle:{backgroundColor: theme.navBackground},
        headerTintColor: theme.title,
    }}>
        <Stack.Screen name="(auth)" options={{headerShown: false}}/>
        <Stack.Screen name="index" options={{title:'Home'}}/>
        <Stack.Screen name="About" options={{title:'About'}}/>
        <Slot/>
    </Stack>
      
  )
}

export default RootLayout

const styles = StyleSheet.create({})