import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { firebase } from './src/firebase/config'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen, DevScreen, PurchaseScreen, UserHomeScreen, AdminHomeScreen, ManageScreen} from './src/screens'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {
    return (
      <></>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Purchase" component={PurchaseScreen} />
            <Stack.Screen name="Dev" component={DevScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Home">
                {props => <HomeScreen {...props} navigation={props.navigation} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="UserHome">
                {props => <UserHomeScreen {...props} navigation={props.navigation} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="AdminHome">
                {props => <AdminHomeScreen {...props} navigation={props.navigation} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="Manage">
                {props => <ManageScreen {...props} navigation={props.navigation} extraData={user} />}
            </Stack.Screen>
          </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}