import React, { useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, FlatList, SectionList, Keyboard, Text, TextInput, TouchableOpacity, View, Button, ActivityIndicator } from 'react-native'
import NavButton from '../../Components/NavButton'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default function ManageScreen(props) {

  const [refresh, setRefresh] = useState(true);

  const user = props.extraData
  const user_tickets = user.ticketsOwned

  var activeTickets = undefined
  var usedTickets = []

  const activeTicketsCombined = {title: "Active", data: []}
  const usedTicketsCombined = {title: "Used", data: []}
  var allTickets = []

  const { data } = useData(user_tickets)

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

  //if(!data) return <ActivityIndicator size="large" />;

  //const ticketNames = []
  //data.forEach(ticket => {
  //  ticketNames.push(ticket.ticketMeta.event.stringValue)
  //});

  const Tab = createMaterialTopTabNavigator();

  return(
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Active" children={()=>
        {
          if(!data) return <ActivityIndicator size="large" color="#123123"/>;

          /*
          const ticketNames = []
          data.forEach(ticket => {
            console.log(ticket)
            ticketNames.push(ticket.ticketMeta.event.stringValue)
          });
          */

          const activeTickets = GetActiveTickets(data)
        
          return(
            <View style={styles.container}>
              <FlatList data={activeTickets.eventNames} renderItem={({item}) => (<Item title={item}/>)}/>
            </View>
          )
        }}/>
        <Tab.Screen name="Used" children={()=>
        {
          if(!data) return <ActivityIndicator size="large" color="#123123"/>;

          const usedTickets = GetUsedTickets(data)
        
          return(
            <View style={styles.container}>
              <FlatList data={usedTickets.eventNames} renderItem={({item}) => (<Item title={item}/>)}/>
            </View>
          )
        }}/>
      </Tab.Navigator>
    </View>
  )
}

function GetActiveTickets(tickets)
{
  const activeTickets = {tickets: [], eventNames: []}
  tickets.forEach(ticket => {
    if(!ticket.ticketMeta.used.booleanValue)
      {
        const newTicket = {
          encryptedData: ticket.qrPayload.encryptedData,
          cost: ticket.ticketMeta.cost.integerValue,
          event: ticket.ticketMeta.event.stringValue,
        }
        activeTickets.tickets.push(newTicket)
        activeTickets.eventNames.push(ticket.ticketMeta.event.stringValue)
      }
  });
  return activeTickets
}

function GetUsedTickets(tickets)
{
  const usedTickets = {tickets: [], eventNames: []}
  tickets.forEach(ticket => {
    if(ticket.ticketMeta.used.booleanValue)
      {
        const newTicket = {
          encryptedData: ticket.qrPayload.encryptedData,
          cost: ticket.ticketMeta.cost.integerValue,
          event: ticket.ticketMeta.event.stringValue,
        }
        usedTickets.tickets.push(newTicket)
        usedTickets.eventNames.push(ticket.ticketMeta.event.stringValue)
      }
  });
  return usedTickets
}

export const useData = (user_tickets) => {
  const [state, setState] = useState();

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

const FetchTickets = async (user_tickets) => {
  try {
    var urls = []
    user_tickets.forEach(ticket => {
      urls.push('https://us-central1-qrapp-fe2f3.cloudfunctions.net/getTicket?id=' + ticket)
    });
    const responsesJSON = await Promise.all(urls.map(url =>
      fetch(url)
    ))
    return ticketResponses = await Promise.all(responsesJSON.map(r => r.json()));
  } catch (err) {
    throw err;
  }
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
});

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

function TicketEntry(title) {
  return(
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}