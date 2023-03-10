import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import NavButton from '../../Components/NavButton'

export default function AdminHomeScreen({navigation}) {
    return(
        <View>
            <Text> Bleep bloop!</Text>
            <NavButton page="Home" navigation={navigation}/>
        </View>
    )
}