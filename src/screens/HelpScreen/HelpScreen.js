import React,{Component, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, Button} from 'react-native';
import CustomButton from '../../components/CustomButton';

const HelpScreen = () => {


  return (
    <View >
      <View style={styles.title}>
        <Text style= {styles.font1}>Welcome To The Tracking App Help center</Text>
      </View>
      <View style= {styles.view3}>
        <Text style= {styles.font2}>If you experince the above symptoms:</Text>
        <Text style= {styles.font3}></Text>
        <Text style= {styles.font4}>Serious symptoms</Text>
        <Text style= {styles.font3}>1. difficulty breathing or shortness of breath</Text>
        <Text style= {styles.font3}>2. loss of speech or mobility, or confusion</Text>
        <Text style= {styles.font3}>3. chest pain</Text>
        <Text style= {styles.font3}></Text>
        <Text style= {styles.font4}>Less common symptoms:</Text>
        <Text style= {styles.font3}>1. sore throat</Text>
        <Text style= {styles.font3}>2. headache</Text>
        <Text style= {styles.font3}>3. aches and pains</Text>
        <Text style= {styles.font3}>4. diarrhoea</Text>
        <Text style= {styles.font3}>5. red or irritated eyes</Text>
        <Text style= {styles.font3}></Text>
        <Text style= {styles.font3}></Text>
        <Text style= {styles.font2}>Seek immediate medical attention if you have serious symptoms. Always call before visiting your doctor or health facility. </Text>
        <Text style= {styles.font2}>Press The help button medical helps are on shift 24 Hour for your saftey</Text>
        <Text style= {styles.font3}></Text>
        
        <View >
        <CustomButton  text="HELP"  onPress={()=> {alert('Medical Worker are on their way, Please Stay calm')}}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E90FF',
    
  },
  containerStyle: {
    backgroundColor: 'white',
  },
  textInputStyle: {
    height: 48,
    color: 'black',
    fontSize: 16,
    backgroundColor: '#f3f3f3',
  },
  font1: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    textTransform: 'uppercase',
    color: '#000',
  },
  view3: {
   
    padding: 20,
    backgroundColor: '#FFD700',
  },
  font2: {
    fontSize:16,
    color: '#000',
    fontWeight: 'bold',
    textTransform: 'uppercase',

  },
  font3: {
    alignItems: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontSize:15,
    
  },
  font4: {
    alignItems: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontSize:15,
    textTransform: 'uppercase',
  },
});

export default HelpScreen;
