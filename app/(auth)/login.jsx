import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Login = () => {
  return (
    <View style={styles.Container}>


        <Text>
            Login
        </Text>

        <Link href='/register'></Link>

        <Text>
            Don't have an account? <Link href='/register'>Register</Link>
        </Text>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center'
    },

    title:{
        fontSize:20,
        fontWeight:'bold',
        color:'green'
    },
})