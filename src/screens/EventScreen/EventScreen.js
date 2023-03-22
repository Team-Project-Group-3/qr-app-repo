import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button, StyleSheet, Pressable } from 'react-native'
import NavButton from '../../components/NavButton'
import { firebase } from '../../firebase/config'


export default function EventScreen(props) {
    
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