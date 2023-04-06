import React, {useState} from 'react';
import {View, Image, StyleSheet, Text, TextInput} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';
import {FlatList} from 'react-native-gesture-handler';

const SignUpScreen = () => {
  const [values, setValue] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    gender: '',
    age: '',
    sick: '',
    add: '',
    risk: 'High Risk',
    latitude: '',
    longitude: '',
    lat:'',
    lng:'',
  });

  const navigation = useNavigation();

  const handleChange = (text, eventName) => {
    setValue(prev => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  };

  const signup = () => {
    const {
      username,
      email,
      password,
      password2,
      gender,
      age,
      sick,
      add,
      risk,
      latitude,
      longitude,
      lat,
      lng,
    } = values;

    if (password == password2) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firestore().collection('users').doc(auth().currentUser.uid).set({
            uid: auth().currentUser.uid,
            username,
            email,
            gender,
            age,
            sick,
            add,
            risk,
            latitude,
            longitude,
            lat,
            lng,
          });
        })
        .catch(error => {
          alert(error.message);
          //..
        });
    } else {
      alert('Your Password is differenrt');
    }
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
    <View>
      <ScrollView keyboardShouldPersistTaps="always" listViewDisplayed={false}>
        <View style={styles.root}>
          <Text style={styles.title}> Create an account </Text>

          <View style={styles.container}>
            <TextInput
              onChangeText={text => handleChange(text, 'username')}
              placeholder="username"
              style={styles.input}
            />
          </View>

          <Text style={styles.title2}>Email:</Text>
          <View style={styles.container}>
            <TextInput
              onChangeText={text => handleChange(text, 'email')}
              placeholder="email"
              style={styles.input}
            />
          </View>

          <Text style={styles.title2}>Password:</Text>
          <View style={styles.container}>
            <TextInput
              onChangeText={text => handleChange(text, 'password')}
              placeholder="password"
              style={styles.input}
              secureTextEntry={true}
            />
          </View>

          <View style={styles.container}>
            <TextInput
              onChangeText={text => handleChange(text, 'password2')}
              placeholder="Confirm Password"
              style={styles.input}
              secureTextEntry={true}
            />
          </View>

          <Text style={styles.title2}>Gender:</Text>
          <View style={styles.container}>
            <TextInput
              onChangeText={text => handleChange(text, 'gender')}
              placeholder="Male/Female"
              style={styles.input}
            />
          </View>

          <Text style={styles.title2}>Age:</Text>
          <View style={styles.container}>
            <TextInput
              onChangeText={text => handleChange(text, 'age')}
              placeholder="Age"
              style={styles.input}
            />
          </View>

          <Text style={styles.title2}>
            Do you have any existing comorbidities:
          </Text>
          <View style={styles.container}>
            <TextInput
              onChangeText={text => handleChange(text, 'sick')}
              placeholder="Yes/No"
              style={styles.input}
            />
          </View>

          <Text style={styles.title2}>Your NRIC address:</Text>
          <View style={styles.container}>
            <TextInput
              onChangeText={text => handleChange(text, 'add')}
              placeholder="Address"
              style={styles.input}
            />
          </View>


          <CustomButton text="Next" onPress={() => signup()} />

          <Text style={styles.text}>
            By registering, you confirm that you accept our{' '}
            <Text style={styles.link} onPress={onTermsOfUsePressed}>
              Terms of use
            </Text>{' '}
            and{' '}
            <Text style={styles.link} onPress={onPrivacyPolicyPressed}>
              privacy Policy
            </Text>
            Policy
          </Text>

          <Text style={styles.text}>
            Have an Account ?{' '}
            <Text style={styles.sign} onPress={onSingInPressed}>
              {' '}
              SIGN IN
            </Text>
          </Text>
        </View>
      </ScrollView>
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

export default SignUpScreen;
