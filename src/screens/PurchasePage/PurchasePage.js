import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import NavButton from '../../Components/NavButton'

export default function PurchasePage({navigation}) {
    return(
        <View>
            <Text> Buy Tickets Here</Text>
            <NavButton page="Home" navigation={navigation}/>
           
            
            </View>
    )
}