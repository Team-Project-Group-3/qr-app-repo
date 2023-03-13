import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';

export default function DevScreen(props) {
  const [id, setId] = useState('');
  const [selected, setSelected] = useState('');
  const [data, setData] = useState(null);

  const items = [
    {key:'1', value:'Parklife'},
    {key:'2', value:'Leeds Fest'},
    {key:'3', value:'Boomtown'},
    {key:'4', value:'Bloodstock 2023'}
  ] 

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
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={items}
        save='value'
      />
      
      <Button title="Buy Ticket" onPress={handleClick} />
      {data && data.ticketExists ? (
        <QRCode value={JSON.stringify(data.qrPayload)} size={200} />
      ) : (
        <Text>Ticket Purchased</Text>
      )}
    </View>
  );
}