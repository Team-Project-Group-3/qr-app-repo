import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button, StyleSheet, Pressable } from 'react-native'
import NavButton from '../../components/NavButton'
import { firebase } from '../../firebase/config'


export default function EventScreen(props) {
  console.log(props)
    
    return(
      <View>
        <Text>Hi</Text>
      </View>
    )
}
const styles = StyleSheet.create({
    button: {
        borderRadius: 15,
        backgroundColor: '#00C6D2',
        marginTop: 45,
        position: 'relative',
        height: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 12,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    });
       // const handleClick = async () => {
    //     try {
    //       const response = await axios.get(
    //         'https://us-central1-qrapp-fe2f3.cloudfunctions.net/generateTicket'
    //       );
    //       setData(response.data);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };