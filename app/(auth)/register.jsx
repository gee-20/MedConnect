import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Register = () => {
  return (
    <View style={styles.Container}>


        <Text>
            Register for an account
        </Text>

        <Link href='/login'></Link>

        <Text>
            Already have an account? <Link href='/login'>Login</Link>   
        </Text>
    </View>
  )
}

export default Register

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