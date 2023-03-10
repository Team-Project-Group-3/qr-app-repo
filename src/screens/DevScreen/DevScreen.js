import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import axios from 'axios';

export default function DevScreen(props) {

    const [data, setData] = useState(null);

    const handleClick = async () => {
      try {
        const response = await axios.get('https://us-central1-qrapp-fe2f3.cloudfunctions.net/encryptTicket?id=1');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <View>
        <Button title="Make API Request" onPress={handleClick} />
        {data && <Text>{JSON.stringify(data)}</Text>}
      </View>
    );
}