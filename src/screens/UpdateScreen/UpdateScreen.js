import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, Text, TextInput, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {getAuth, updatePassword } from '@react-native-firebase/auth'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const UpdateScreen = () => {
  const auth = firebase.auth;
  const [values, setValue] = useState({
    username:'',
  });


  const handleChange = (text, eventName) => {
    setValue(prev =>{
      return {
        ...prev,
        [eventName]:text,
      };
    });
  } ;


  const onRegisterUpdate = () => {
    const{username}= values
   firestore()
   .collection('users')
   .doc(auth().currentUser.uid)
   .update({
      username,
      
    })
    .then(()=>{
      console.log ('user Updated');
      Alert.alert(
        'profile Updated!',
        'Your profile has been updated successfully'
      );
    })
  } 
  

  

  return (
    <View style={styles.root}>
      <Text style={styles.title}> Update Profile </Text>
      <Text style={styles.title2}>Current Username : </Text>

      <View style={styles.container}>
        <TextInput
          onChangeText={text => handleChange(text, 'username')}
          placeholder={'New Username'}
          style={styles.input}
        />
      </View>

      {/* <Text style={styles.title2}>Current Address : </Text>
      <View style={styles.container}>
        <TextInput
          onChangeText={text => handleChange(text, 'add')}
          placeholder={'New Address'}
          style={styles.input}
        />
      </View> */}

      <CustomButton  text="Update" onPress={()=> onRegisterUpdate()} />

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C50',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB875',
  },
  sign: {
    color: '#0000FF',
  },
  title2: {
    padding: 10,
  },
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  
});

export default UpdateScreen;
