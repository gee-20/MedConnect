import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const About = () => {
  return (
    <View style={styles.Container}>
      <Text style={styles.title}>About</Text>
      <Link href="/" style={styles.link}>
        Home
      </Link>
    </View>
  )
}

export default About

const styles = StyleSheet.create({
    Container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },

    title:{
        fontSize:20,
        fontWeight:'bold',
        color:'green'
    },

    link:{
        marginTop:10,
        color:'white',
        backgroundColor:'blue',
        padding:10,
        borderRadius:5
    }
})