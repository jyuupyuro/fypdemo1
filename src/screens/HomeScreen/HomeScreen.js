import React, {useEffect, useId, useReducer, useState} from 'react';
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  useWindowDimensions,
  Alert
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Profile1 from '../../../assets/images/Profile1.png';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const HomeScreen = () => {
  useEffect(() => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .onSnapshot(values => {
        setValue(values.data());
      });
  }, []);

  const auth = firebase.auth;
  const [values, setValue] = useState({});
  const {height} = useWindowDimensions();

  return (
    <View>
      <View style={styles.view1}>
        <Image
          source={Profile1}
          style={[StyleSheet.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <Text style={styles.font1}>{values.username} </Text>
        <Text style={styles.font2}>{values.email}</Text>
      </View>

      <View style={styles.view3}>
        <Text>Risk Status:</Text>
        <Text style={styles.font1}>{values.risk} </Text>
      </View>

      <View style={styles.view4}>
        <Text style={styles.font3}>App Description:</Text>
        <Text style={styles.font3}>
          1. This app helps maintain quarantine rules.
        </Text>
        <Text style={styles.font3}>
          2. Request emergency help when neccassry
        </Text>
        <Text style={styles.font3}>3. Please stay at home at all times</Text>
        <Text style={styles.font3}>
          4. Report to your doctor everyday when undergo quarantine.
        </Text>
      </View>

      <View style={styles.root}>
        <Button
          title="logout"
          onPress={() =>
            auth()
              .signOut()
              .then(() => {
                
                console.log('user logged out');
                Alert.alert(
                  'You are not supposed to LOGGED OUT ! Please RELOGIN',      
                );
              })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view1: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E90FF',
  },
  view4: {
    backgroundColor: '#F8F8FF',
  },
  view2: {
    alignItems: 'center',
  },
  view3: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFD700',
  },
  font1: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
    textTransform: 'uppercase',
    color: '#000',
  },
  font2: {
    color: '#FFFAF0',
    fontWeight: 'bold',
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
  title: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#051C50',
    padding: 10,
  },
  root: {
    fontSize: 80,
    padding: 20,
  },
  font3: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
