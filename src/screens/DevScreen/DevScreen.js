import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';

export default function DevScreen(props) {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);

  const handleClick = async () => {
    try {
      const response = await axios.get(
        'https://us-central1-qrapp-fe2f3.cloudfunctions.net/encryptTicket?id=1'
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick2 = async () => {
    try {
      const response = await axios.get(
        'https://us-central1-qrapp-fe2f3.cloudfunctions.net/encryptTicket?id=2'
      );
      setData2(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick3 = async () => {
    try {
      const response = await axios.get(
        'https://us-central1-qrapp-fe2f3.cloudfunctions.net/getTicket?id=HhxhfJBkLNrm6SeHVm0S'
      );
      setData3(response.data.qrPayload);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Button title="Show Ticket id = 1" onPress={handleClick} />
      {data && <QRCode value={JSON.stringify(data)} size={200} />}
      <Button title="Show Ticket id = 2" onPress={handleClick2} />
      {data2 && <QRCode value={JSON.stringify(data2)} size={200} />}
      <Button title="Show Ticket id = 3" onPress={handleClick3} />
      {data3 && <QRCode value={JSON.stringify(data3)} size={200} />}
    </View>
  );
}
