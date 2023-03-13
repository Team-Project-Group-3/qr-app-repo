import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import LoginScreen from '../LoginScreen/LoginScreen';
import NavButton from '../../Components/NavButton';

export default function UserHomeScreen(props) {

    const user = props.extraData

    return (
        <View style={styles.container}>
             <View>
                <Text style={{ fontSize: 32, textAlign: 'center', color: 'black', marginTop: 75, marginBottom: 25}}>
                    Welcome {user.fullName}!
                </Text>

                <NavButton page="Purchase" label="Purchase Tickets" navigation={props.navigation} />
                <NavButton page="Manage" label="Manage Tickets" navigation={props.navigation}/>
                <NavButton page="Login" label="Logout" navigation={props.navigation}/>
             </View>
        </View>
    )
}