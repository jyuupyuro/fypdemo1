import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import MapView, {AnimatedRegion, Circle} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {getCurrentPosition} from 'react-native-geolocation-service';
import {
  getCurrentLocation,
  locationPermission,
} from '../../components/geolocation/geolocation';
import Database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {isPointWithinRadius} from 'geolib';
import Ionicons from 'react-native-vector-icons/Ionicons';


const geolib = require('geolib');
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = 'AIzaSyDO24Ik_52STQAFuOO-alIYy89O84wyNlM';

const MapScreen = () => {
  const mapRef = useRef();
  const markerRef = useRef();
  const auth = firebase.auth;

  const onPressAddress = (data, details) => {
    console.log('details==>>>>', details);

    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    fetchAddress(lat, lng);
  };

  const fetchAddress = (lat, lng) => {
    console.log(lat);
    console.log(lng);
    firestore().collection('users').doc(auth().currentUser.uid).update({
      lat: lat,
      lng: lng,
    });
    setValue({
      ...values,
      housecords: {lat, lng},
    });
    console.log('this is',housecords.lat, housecords.lng);
  };

  const [state, setState] = useState({
    patloc: {
      latitude: 3.039692552750423,
      longitude: 101.79406997638083,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0011,
    },
    coordinate: new AnimatedRegion({
      latitude: 3.0396,
      longitude: 101.7951,
    }),
  });

  const [values, setValue] = useState({
    housecords: {
      lat: 3.0396,
      lng: 101.7942
    }
  })

  const {housecords} = values;
  const {patloc,coordinate} = state;

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: patloc.latitude,
      longitude: patloc.longitude,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0011,
    });
  };

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude} = await getCurrentLocation();
      console.log('location is ', latitude, longitude);
      console.log('house cord',housecords.lat, housecords.lng)
      
      firestore().collection('users').doc(auth().currentUser.uid).update({
        latitude: latitude,
        longitude: longitude,
      });
      setState({
        ...state,
        patloc: {latitude, longitude},
      });

    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getLiveLocation();
  }, []);

  useEffect(()=>{
    const monitor = geolib.isPointWithinRadius(
    { latitude: patloc.latitude, longitude: patloc.longitude },
    { latitude: housecords.lat, longitude: housecords.lng},
    1000
);
console.log(monitor)
if (monitor == false ){
  alert('Please go back to your home, You Have violated the home quarantine rule')
  firestore().collection('users').doc(auth().currentUser.uid).update({
    quarantine: false,
  });
} else {
  firestore().collection('users').doc(auth().currentUser.uid).update({
    quarantine: true,
  });
}
  })

  return (
    <View style={{marginTop: 10, flex: 1}}>
      <GooglePlacesAutocomplete
        placeholder={'Enter your current house address'}
        fetchDetails={true}
        onPress={onPressAddress}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        styles={{
          container: {flex: 0, position: 'absolute', width: '100%', zIndex: 1},
          listView: {backgroundColor: 'white'},
        }}
      />
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={{
          latitude: 3.039692552750423,
          longitude: 101.79406997638083,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0011,
        }}>
        <Marker.Animated
          ref={markerRef}
          coordinate={{
            latitude: housecords.lat,
            longitude: housecords.lng,
          }}
          image ={require('../../../assets/images/home.png')}
          
        />
        <Circle
          center={{
            latitude: housecords.lat,
            longitude: housecords.lng,
          }}
          radius={1000}
        />
        <Marker.Animated
          ref={markerRef}
          pinColor="#000000"
          coordinate={patloc}
        />
      </MapView>

      <View style={styles.view3}>
        <Ionicons name="location"  size={40} style={styles.button1} onPress={onCenter} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  button1: {
    // flex: 1,
  },
  view1: {
    marginTop: 50,
    flex: 1,
  },
  view3: {
    flex: 1,
    position: 'absolute',
    top: '90%',
    right: '0%',
  },
});

export default MapScreen;
