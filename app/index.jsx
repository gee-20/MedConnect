import { StyleSheet, Text, View, TextInput, Button, Image,  ScrollView } from 'react-native'
import img from '../assets/img/google.png'
import React from 'react'
import { Link } from 'expo-router'

const Home = () => {
  return (
    <ScrollView contentContainerStyle={styles.Container}>

      <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20, color:'#109267'}}>Welcome to AfyaDirect</Text>

      <Text style={{fontSize: 20, fontWeight: 'bold', color: '#109267', marginBottom: 20, textAlign:'center', width:'80%'}}>Sign In</Text>

      <View style={styles.card}>

        <View>
          <Text style={styles.h2}>Create your account</Text>
          <Text style={styles.p}>Start your journey to better health today.</Text>
        </View>

        <View>
          <Text style={styles.h3}>Phone Number</Text>
          <TextInput
            placeholder='Search'
            style={styles.input}
          />
        </View>

        <View>
          <Text style={styles.h3}>Password</Text>
          <TextInput
            placeholder='Search'
            style={styles.input}
          />
        </View>
        
        <View  style={styles.button}>
          <Button title='Create Account' color='#fff' onPress={() => alert('Account created!')} />
        </View>

        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Text style={styles.orText}>OR</Text>
        </View>

        <View  style={styles.continue}>
          <Image source={img} style={{width: 30, height: 30, marginRight: 10}} />
          <Button title='Continue with Google' fontSize={8} color='black' />
        </View>

        <View style={styles.dontHaveAccount}>
          <Text style={styles.alreadtText}>Already have an account? </Text>
          <Link href='/login' style={styles.link}>Sign up now</Link>
        </View>
        
        

        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Text style={styles.description}>AfyaDirect is fully compliant with HIPAA and the Tanzania Ministry of Health Data Protection regulations. Your medical data is encrypted and secure.</Text>
        </View>  
         
      </View>

     
      
    </ScrollView>


  )
}

export default Home

const styles = StyleSheet.create({
  Container:{
    flex:1,
    backgroundColor:'#f7f9fb',
    alignItems:'center',
    justifyContent:'center'
  }, 

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height:'80%',
    width:'85%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },

  h2: {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    textAlign:'left',
    color:'#000000'
  },

  p: {
    
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    textAlign:'left',
    color:'gray',
    marginTop: 15,
  },
  h3: {
    marginTop: 30,
    marginBottom: 10,
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 10,

  },

  button: {
    marginTop: 30,
    backgroundColor: '#109267',
    padding: 10,
    borderRadius: 5,
    cursor: 'pointer',
  },
  orText: {
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 10,
    color: 'gray',
    marginVertical: 30,
  },

  continue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },

  dontHaveAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  link: {
    color: '#109267',
    fontWeight: 'bold',
    fontFamily: 'Arial',
    textDecorationLine: 'underline',

  },
  alreadtText: {
    color: 'gray',
    fontSize: 12,
    fontFamily: 'Arial',

  },
  description:{
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontSize: 10,
    color: 'gray',
    textAlign:'center',
    marginTop: 10,
  }

})