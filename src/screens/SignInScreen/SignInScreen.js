import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, useWindowDimensions, TextInput} from 'react-native';
import CustomButton from '../../components/CustomButton';
import Logo from '../../../assets/images/logo.jpg';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SignInScreen = () => {
  const [values, setValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = (text, eventName) => {
    setValue(prev => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  };

  const navigation = useNavigation();
  const {height} = useWindowDimensions();

  const signin = () => {
    const {email, password} = values;
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch(error => {
        alert(error.message);
        // ..
      });
      
  };

  const onForgotPassword = () => {
    console.warn('forgot');
  };

  const onRegisterPressed = () => {
    navigation.navigate('SignUp');
  };
  return (
    
    <View style={styles.root}>
      <Image
        source={Logo}
        style={[StyleSheet.logo, {height: height * 0.3}]}
        resizeMode="contain"
      />

      <View style={styles.container}>
        <TextInput
          onChangeText={text => handleChange(text, 'email')}
          placeholder="Email"
          style={styles.input}
        />
      </View>

      <View style={styles.container}>
        <TextInput
          onChangeText={text => handleChange(text, 'password')}
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
        />
      </View>

      <CustomButton text="sign in" onPress={() => signin()} />

      <CustomButton
        text="Forgot Password"
        onPress={onForgotPassword}
        type="TERTIARY"
      />

      <CustomButton
        text="Don't have an account, Register"
        onPress={onRegisterPressed}
        type="TERTIARY"
      />
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
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },

  input: {},
});

export default SignInScreen;
