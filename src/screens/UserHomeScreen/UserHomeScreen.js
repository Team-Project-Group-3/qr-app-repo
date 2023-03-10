import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import LoginScreen from '../LoginScreen/LoginScreen';
import NavButton from '../../Components/NavButton';

export default function UserHomeScreen(props) {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('entities')
    const userID = props.extraData.id

    return (
        <View style={styles.container}>
             <View>
                <NavButton page="faafa" navigation={props.navigation}/>
                <NavButton page="Purchase" navigation={props.navigation}/>
                </View>
        </View>
    )
}