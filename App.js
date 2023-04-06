/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {SafeAreaView, StyleSheet, Text} from 'react-native';
 import SignInScreen from './src/screens/SignInScreen/SignInScreen';
 import SignUpScreen from './src/screens/SignUpScreen';
 import DetailScreen from './src/screens/DetailScreen';
 import Route from './src/Navigation';
 
 
 const App = ()=> {
   return (
     <SafeAreaView style={styles.root}>
       <Route/> 
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
  root: 
  {
    flex:1,
    backgroundColor: '#F9FBFC'
  }
 });
 export default App;
 