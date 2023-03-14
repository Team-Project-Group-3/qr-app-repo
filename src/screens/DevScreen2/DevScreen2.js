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
      `https://us-central1-qrapp-fe2f3.cloudfunctions.net/getTicket?id=${id}`
    );
    setData(response.data);
  } catch (error) {
    console.error(error);
  }
};

return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
    <View style={{ marginBottom: 60 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', textDecorationLine: 'underline' }}>QR Code Tester</Text>
    </View>
    <View style={{ marginBottom: 20 }}>
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 40, borderRadius: 10 }}
            onChangeText={setId}
            value={id}
            placeholder="Enter ticket ID"
        />
    </View>
    <View style={{ borderRadius: 10, overflow: 'hidden' }}>
        <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 10 }} onPress={handleClick}>
            <Text style={{ color: 'white' }}>Generate QR Code</Text>
        </TouchableOpacity>
    </View>
    <View style={{ marginTop: 20 }}>
        {data && data.ticketExists ? (
            <QRCode value={JSON.stringify(data.qrPayload)} size={250} color="black" />
        ) : (
            <Text>Ticket does not exist</Text>
        )}
    </View>
</View>
);
}