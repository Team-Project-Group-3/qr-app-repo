import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';

export default function DevScreen(props) {
  const [selected, setSelected] = useState('');

  const eventPlaceholder = [
    { key: '1', value: 'Parklife' },
    { key: '2', value: 'Leeds Fest' },
    { key: '3', value: 'Elon Musk Convention' },
    { key: '4', value: 'Bloodstock 2023' }
  ]

  useEffect(() => {
    const send = axios.get(`https://us-central1-qrapp-fe2f3.cloudfunctions.net/generateTicket?uid=123&eventName=${selected}`)
      .then((response) => {
        console.log(response)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return (
    <View>
      <SelectList
        setSelected={setSelected}
        data={eventPlaceholder}
      />
      <Button title="Buy Ticket" onClick={send} />
    </View>
  )
}

  // return (
  //   <View>
  //     <SelectList
  //       setSelected={setSelected}
  //       data={eventPlaceholder}
  //     />

  //     <Button title="Buy Ticket" />
  //   </View>
  // );

  // const handleClick = async () => {
  //   try {
  //     const event = selected;
  //     const response = await axios.get(
  //       `https://us-central1-qrapp-fe2f3.cloudfunctions.net/generateTicket?uid=123&eventName=${event}`)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
