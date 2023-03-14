import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button, Clipboard } from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';

export default function DevScreen(props) {
  const [id, setId] = useState('');
  const [data, setData] = useState(null);
  const [inputValid, setInputValid] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  const handleClick = async () => {
    try {
      Keyboard.dismiss();
      const response = await axios.get(
        `https://us-central1-qrapp-fe2f3.cloudfunctions.net/getTicket?id=${id}`
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTextChange = (text) => {
    setId(text);
    setInputValid(text.trim().length > 0);
  };

  const copyToClipboard = (ticketId) => {
    Clipboard.setString(ticketId);
  };

  const handleReset = async () => {
    try {
      const response = await axios.put(
        `https://us-central1-qrapp-fe2f3.cloudfunctions.net/resetTicket?id=${id}`
      );
      
    } catch (error) {
      
      console.error(error);
    }
  };

  const getTicketData = async (id) => {
    try {
      const response = await axios.get(
        `https://us-central1-qrapp-fe2f3.cloudfunctions.net/getTicket?id=${id}`
      );
      setTicketData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data && data.ticketExists === 'true') {
      getTicketData(id);
    } else {
      setTicketData(null);
    }
  }, [data]);

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ marginTop: 60, alignItems: 'center', textAlign: 'center'}}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', textDecorationLine: 'underline' }}>QR Code Tester</Text>
        <View style={{ flexDirection: 'row', marginTop: 20 ,alignItems: 'center',textAlign: 'center'}}>
          <TouchableOpacity onPress={() => copyToClipboard('5BMMowcWB3a1AGOGRSme')}>
            <Text style={{ fontSize: 16, marginRight: 10, textAlign: 'center' }}>Copy Example Ticket ID: 5BMMowcWB3a1AGOGRSme</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 40, borderRadius: 10 }}
            onChangeText={handleTextChange}
            value={id}
            placeholder="Enter ticket ID"
          />
        </View>
        <View style={{ borderRadius: 10, overflow: 'hidden' }}>
          <TouchableOpacity
            style={{ backgroundColor: 'blue', padding: 10, borderRadius: 10 }}
            onPress={handleClick}
            disabled={!inputValid}
          >
            <Text style={{ color: 'white' }}>Generate QR Code</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          {data && data.ticketExists === 'true' ? (
            <QRCode value={JSON.stringify(data.qrPayload)} size={250} color="black" />
            ) : data !== null && (
            <Text>Ticket does not exist</Text>
          )}
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={{ backgroundColor: 'red', padding: 10, borderRadius: 10 }}
            onPress={handleReset}>
              <Text style={{ color: 'white' }}>Reset Ticket 'used' property to false</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  );
}