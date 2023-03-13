import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';

export default function DevScreen(props) {
  const [id, setId] = useState('');
const [data, setData] = useState(null);

const handleClick = async () => {
  try {
    const response = await axios.get(
      `https://us-central1-qrapp-fe2f3.cloudfunctions.net/encryptTicket?id=${id}`
    );
    setData(response.data);
  } catch (error) {
    console.error(error);
  }
};

return (
  <View>
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={setId}
      value={id}
      placeholder="Enter ticket ID"
    />
    <Button title="Show Ticket" onPress={handleClick} />
    {data && data.ticketExists ? (
      <QRCode value={JSON.stringify(data.qrPayload)} size={200} />
    ) : (
      <Text>Ticket does not exist</Text>
    )}
  </View>
);
}
