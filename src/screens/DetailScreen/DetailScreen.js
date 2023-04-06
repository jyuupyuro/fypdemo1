import React, {useState} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const DetailScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const navigation = useNavigation();

  const onRegisterPressed = () => {
    console.warn('Register');
  };
  const onSingInPressed = () => {
    navigation.navigate('SignIn');
  };
  const onTermsOfUsePressed = () => {
    console.warn('termofuse');
  };

  const onPrivacyPolicyPressed = () => {
    console.warn('privacypolicy');
  };
  return (
    <View style={styles.root}>
      <Text style={styles.title}> Personal Information </Text>

      <Text style={styles.title2}>Gender:</Text>
      <CustomInput
        placeholder="Male/Female"
        value={username}
        setValue={setUsername}
      />

      <Text style={styles.title2}>Age:</Text>
      <CustomInput 
      placeholder="XX" 
      value={email} 
      setValue={setEmail} />

      <Text style={styles.title2}>Do you have any comorbidities:</Text>
      <CustomInput
        placeholder="Yes/No"
        value={password}
        setValue={setPassword}
        secureTextEntry
      />

      <Text style={styles.title2}>Current Address :</Text>
      <CustomInput
        placeholder="88, Jalan Sungai Long 3, 50100, Kuala Lumpur"
        value={passwordRepeat}
        setValue={setPasswordRepeat}
        secureTextEntry
      />

      <CustomButton  text="Register" onPress={onRegisterPressed} />

      

      <Text style={styles.text}>
        Have an Account ?{' '}
        <Text style={styles.sign} onPress={onSingInPressed}>
          {' '}
          SIGN IN
        </Text>
      </Text>
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
});

export default DetailScreen;
