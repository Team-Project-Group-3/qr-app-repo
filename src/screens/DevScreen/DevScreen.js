import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

export default function DevScreen(props) {
  const [id, setId] = useState('');
  const [data, setData] = useState(null);

  const handleClick = async () => {
    try {
      const response = await axios.get(
        'https://us-central1-qrapp-fe2f3.cloudfunctions.net/generateTicket?uid=${userId}&eventName=Parklife'
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Button title="Buy Ticket" onPress={handleClick} />
      {data && data.ticketExists ? (
        <QRCode value={JSON.stringify(data.qrPayload)} size={200} />
      ) : (
        <Text>Ticket does not exist</Text>
      )}
    </View>
  );
}