import React, { useEffect, useState } from 'react'
import { Pressable, Alert, Modal, FlatList, Text, View, Button, ActivityIndicator } from 'react-native'
import NavButton from '../../components/NavButton'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import styles from '../../styles'
import QRCode from 'react-native-qrcode-svg'
import { firebase } from '../../firebase/config'


export default function ManageScreen(props) {

  const user = props.extraData
  const user_tickets = user.ticketsOwned

  const { data } = useData(user_tickets,props)
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState()

  useEffect(() => {
    props.navigation.setOptions({ headerTitle: "Manage Tickets", });
  }, []);

  const Tab = createMaterialTopTabNavigator();

  if(!user_tickets) return <Text>NO TICKETS FOR USER</Text>

  return(
    <View style={styles.tabContainer}>
      <TicketPopup state={modalVisible} handleState={(modalVisible) => setModalVisible(modalVisible)} ticket={selectedTicket}/>
      <Tab.Navigator screenOptions={({ route }) =>({
        tabBarActiveTintColor: '#00C6D2',
        tabBarInactiveTintColor: 'gray',
        tabBarIndicatorStyle: {backgroundColor: '#00C6D2'}})}>
        <Tab.Screen name="Active" children={()=>
        {
          if(!data) return <ActivityIndicator size="large" color="#00C6D2"/>;

          const activeTickets = GetActiveTickets(data)
        
          return(
            <View style={styles.tabContainer}>
              <FlatList data={activeTickets} renderItem={({item}) => <TicketEntry handleState={(modalVisible) => setModalVisible(modalVisible)} ticket={item}
              handleTicket={(ticket) => setSelectedTicket(ticket)}/>}/>
            </View>
          )
        }}/>
        <Tab.Screen name="Used" children={()=>
        {
          if(!data) return <ActivityIndicator size="large" color="#00C6D2"/>;

          const usedTickets = GetUsedTickets(data)

          return(
            <View style={styles.tabContainer}>
              <FlatList data={usedTickets} renderItem={({item}) => <TicketEntry handleState={(modalVisible) => setModalVisible(modalVisible)} ticket={item}
              handleTicket={(ticket) => setSelectedTicket(ticket)}/>}/>
            </View>
          )
        }}/>
      </Tab.Navigator>
    </View>
  )
}

const TicketEntry = ({handleState, ticket, handleTicket}) => (
  <View style={styles.ticketEntry}>
    <Pressable style={({ pressed }) => [
      {
          backgroundColor: pressed
              ? "#008a92"
              : "#00C6D2",
      },
      styles.ticketButton]}
      onPress={() => {
        handleTicket(ticket)
        handleState(true)
      }}>
      <Text style={styles.ticketText}>{ticket.event}</Text>
    </Pressable>
  </View> 
);

const TicketPopup = ({state, handleState, ticket}) => {
  return(
    <Modal
      animationType="slide"
      transparent={true}
      visible={state}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        handleState(!state);
      }}>
      <View style={styles.centeredView}>
        {!ticket ?
          <ActivityIndicator size="large" color="#00C6D2"/>
          :
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{ticket.event}</Text>
            <Text style={styles.modalText}>Cost: £{ticket.cost}.00</Text>
            <Text></Text>
            <QRCode value={JSON.stringify(ticket.encryptedData)} size={250} color="black"/>
            <Text></Text>
            <Pressable style={({ pressed }) => [
              {
                  backgroundColor: pressed
                      ? "#008a92"
                      : "#00C6D2",
              },
              styles.ticketButton]}
              onPress={() => handleState(!state)}>
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        }
      </View>
    </Modal>
  )
}

function GetActiveTickets(tickets)
{
  activeTickets = []
  tickets.forEach(ticket => {
    if(!ticket.ticketMeta.used.booleanValue)
      {
        const newTicket = {
          encryptedData: ticket.qrPayload,
          cost: ticket.ticketMeta.cost.integerValue,
          event: ticket.ticketMeta.event.stringValue,
        }
        activeTickets.push(newTicket)
      }
  });
  return activeTickets
}

function GetUsedTickets(tickets)
{
  const usedTickets = []
  tickets.forEach(ticket => {
    if(ticket.ticketMeta.used.booleanValue)
      {
        const newTicket = {
          encryptedData: ticket.qrPayload,
          cost: ticket.ticketMeta.cost.integerValue,
          event: ticket.ticketMeta.event.stringValue,
        }
        usedTickets.push(newTicket)
      }
  });
  return usedTickets
}

export const useData = (user_tickets,props) => {
  const [state, setState] = useState();
  useEffect(() => {
    const dataFetch = async () => {
      const user = firebase.firestore().collection("users").doc(props.extraData.id);
      const userData = await user.get();
      user_tickets = userData.data().ticketsOwned;
        var urls = []
        user_tickets.forEach(ticket => {
          urls.push('https://us-central1-qrapp-fe2f3.cloudfunctions.net/getTicket?id=' + ticket)
        });
        const responsesJSON = await Promise.all(urls.map(url =>
          fetch(url)
        ))
        const data = await Promise.all(responsesJSON.map(r => r.json()));

        setState(data)
    };

    dataFetch();
  }, [user_tickets]);

  return { data: state };
};