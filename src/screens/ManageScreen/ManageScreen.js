import React, { useEffect, useState } from 'react'
import { Pressable, Alert, Modal, SafeAreaView, StatusBar, StyleSheet, FlatList, SectionList, Keyboard, Text, TextInput, TouchableOpacity, View, Button, ActivityIndicator } from 'react-native'
import NavButton from '../../Components/NavButton'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default function ManageScreen(props) {

  const user = props.extraData
  const user_tickets = user.ticketsOwned

  const { data } = useData(user_tickets)
  const [modalVisible, setModalVisible] = useState(false);

  /*
  FetchTickets(user_tickets)
  .then(data => {
    data.forEach(ticket => {
      const newTicket = {
        encryptedData: ticket.qrPayload.encryptedData,
        cost: ticket.ticketMeta.cost.integerValue,
        event: ticket.ticketMeta.event.stringValue,
      }
      if(!ticket.ticketMeta.used.booleanValue)
      {
        if(!activeTickets)
        {
          activeTickets = []
        }
        activeTickets.push(ticket.ticketMeta.event.stringValue)
        activeTicketsCombined.data.push({task: ticket.ticketMeta.event.stringValue})
      }
      else
      {
        usedTickets.push(ticket.ticketMeta.event.stringValue)
        usedTicketsCombined.data.push({task: ticket.ticketMeta.event.stringValue})
      }
    });
  })
  .then(data => {
    //console.log("Finished:")
    //console.log(activeTicketsCombined)
  })
  .catch(error => error)
  */

  useEffect(() => {
    props.navigation.setOptions({ headerTitle: "Manage Tickets", });
  }, []);

  const Tab = createMaterialTopTabNavigator();

  return(
    <View style={styles.container}>
      <TicketPopup state={modalVisible} handleState={(modalVisible) => setModalVisible(modalVisible)} ticket={data}/>
      <Tab.Navigator>
        <Tab.Screen name="Active" children={()=>
        {
          if(!data) return <ActivityIndicator size="large" color="#123123"/>;

          const activeTickets = GetActiveTickets(data)
        
          return(
            <View style={styles.container}>
              <FlatList data={activeTickets} renderItem={({item}) => <TicketEntry handleState={(modalVisible) => setModalVisible(modalVisible)} ticket={item} />}/>
            </View>
          )
        }}/>
        <Tab.Screen name="Used" children={()=>
        {
          if(!data) return <ActivityIndicator size="large" color="#123123"/>;

          const usedTickets = GetUsedTickets(data)

          return(
            <View style={styles.container}>
              <FlatList data={usedTickets} renderItem={({item}) => <TicketEntry handleState={(modalVisible) => setModalVisible(modalVisible)} ticket={item} />}/>
            </View>
          )
        }}/>
      </Tab.Navigator>
    </View>
  )
}

const TicketEntry = ({handleState, ticket}) => (
  <View style={styles.item}>
    <Button title={ticket.event} onPress={() => handleState(true)}/>
  </View> 
);

const TicketPopup = ({state, handleState, ticket}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={state}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      handleState(!state);
    }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Hello World!</Text>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => handleState(!state)}>
          <Text style={styles.textStyle}>Hide Modal</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);

function GetActiveTickets(tickets)
{
  activeTickets = []
  tickets.forEach(ticket => {
    if(!ticket.ticketMeta.used.booleanValue)
      {
        const newTicket = {
          encryptedData: ticket.qrPayload.encryptedData,
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
          encryptedData: ticket.qrPayload.encryptedData,
          cost: ticket.ticketMeta.cost.integerValue,
          event: ticket.ticketMeta.event.stringValue,
        }
        usedTickets.push(newTicket)
      }
  });
  return usedTickets
}

export const useData = (user_tickets) => {
  const [state, setState] = useState();

  console.log("GETTING TICKETS!!!!")

  useEffect(() => {
    const dataFetch = async () => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});