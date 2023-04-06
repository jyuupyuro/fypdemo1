import React,{Component, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDO24Ik_52STQAFuOO-alIYy89O84wyNlM';

const AddScreen = () => {

    const fetchAddress=(lat,lng)=>{
        console.log(lat);
        console.log(lng);
        setState({
            ...state, dropCords:{
                latitude:lat,
                longitude:lng
            }
        })
        console.log(dropCords.latitude, dropCords.longitude)
    }
  const onPressAddress = (data, details) => {
    console.log('details==>>>>', details);

    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    fetchAddress(lat, lng);
  };

  const [state, setState] = useState({
    dropCords: {},
  });

  const {dropCords} = state;

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={'Enter your current house address'}
        fetchDetails={true}
        onPress={onPressAddress}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        styles={{
          textInputContainer: styles.containerStyle,
          textInput: styles.textInputStyle,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default AddScreen;
