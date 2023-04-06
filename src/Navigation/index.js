import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DetailScreen from '../screens/DetailScreen';
import UpdateScreen from '../screens/UpdateScreen';
import MapScreen from '../screens/MapScreen';
import HelpScreen from '../screens/HelpScreen';
import auth from '@react-native-firebase/auth';
import HomeScreen from '../screens/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Route = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  auth().onAuthStateChanged(user => {
    if (user != null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeScreen" component={Tabnav} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

function Tabnav() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === "Home") {
            iconName = focused ? 'home' : 'home-outline';

          } else if (rn === "UpdateScreen") {
            iconName = focused ? 'settings' : 'settings-outline';

          } else if (rn === "MapScreen") {
            iconName = focused ? 'location' : 'location-outline';

          } else if (rn === "HelpScreen") {
            iconName = focused ? 'megaphone' : 'megaphone-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        // activeTintColor: 'tomato',
        inactiveTintColor: 'grey',
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70}
      }}>

      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="UpdateScreen" component={UpdateScreen} />
      <Tab.Screen name="MapScreen" component={MapScreen} />
      <Tab.Screen name="HelpScreen" component={HelpScreen} />
    </Tab.Navigator>
  );
}

export default Route;
