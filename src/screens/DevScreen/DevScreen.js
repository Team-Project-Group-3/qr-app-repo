import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';

export default function DevScreen(props) {
  const [selected, setSelected] = useState('');

  const eventPlaceholder = [
    { key: '1', value: 'Parklife' },
    { key: '2', value: 'Leeds Festival' },
    { key: '3', value: 'Elon Musk Convention' },
    { key: '4', value: 'Bloodstock 2023' }
  ]

  const sendTicketGeneration = async () => {
    await axios.get(`https://us-central1-qrapp-fe2f3.cloudfunctions.net/generateTicket?uid=123&eventName=${selected}`)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <View>
      <SelectList
        setSelected={setSelected}
        data={eventPlaceholder}
        save='value'
      />
      <View style={styles.buttonContainer}>
        <Button title="Buy Ticket" onPress={sendTicketGeneration} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 50,
    marginTop: 20
  },
  buttonText: {
    textAlign: 'center'
  }
});
