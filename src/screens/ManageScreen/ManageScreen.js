import React, { useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, FlatList, SectionList, Keyboard, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import NavButton from '../../Components/NavButton'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default function ManageScreen(props) {

  const [refresh, setRefresh] = useState(true);

  const user = props.extraData
  const user_tickets = user.ticketsOwned

  var activeTickets = []
  var usedTickets = []

  const activeTicketsCombined = {title: "Active", data: []}
  const usedTicketsCombined = {title: "Used", data: []}
  var allTickets = []

  const completedTaskData = [{
    title: "Completed Tasks",
    data: [
      {
        id: "6",
        task: "Make a section list tutorial"
      },
      {
        id: "7",
        task: "Share this tutorial"
      },
      {
        id: "8",
        task: "Ask doubt in the Comments"
      },
      {
        id: "9",
        task: "Subscribe to logrocket"
      },
      {
        id: "10",
        task: "Read next Article"
      },
      {
        id: "11",
        task: "Read next Article 2"
      },
      {
        id: "12",
        task: "Read next Article 3"
      },
      {
        id: "13",
        task: "Read next Article 4"
      },
      {
        id: "14",
        task: "Read next Article 5"
      },
      {
        id: "15",
        task: "Read next Article 6"
      },
      {
        id: "16",
        task: "Read next Article 7"
      },
      {
        id: "17",
        task: "Read next Article 8"
      },
      {
        id: "18",
        task: "Read next Article 9"
      },
      {
        id: "19",
        task: "Read next Article 10"
      },
    ]
  }];

  FetchTickets(user_tickets)
  .then(data => {
    data.forEach(ticket => {
      const newTicket = {
        encryptedData: ticket.qrPayload.encryptedData,
        cost: ticket.ticketMeta.Cost,
        event: ticket.ticketMeta.Event,
        seat: ticket.ticketMeta.SeatNumber
      }
      if(!ticket.ticketMeta.Used.booleanValue)
      {
        activeTicketsCombined.data.push({task: ticket.ticketMeta.Event.stringValue})
      }
      else
      {
        usedTicketsCombined.data.push({task: ticket.ticketMeta.Event.stringValue})
      }
    });
  })
  .then(data => {
    console.log(activeTicketsCombined)
  })
  .catch(error => error)
  

  useEffect(() => {
    props.navigation.setOptions({ headerTitle: "Manage Tickets", });
  }, []);

  const Tab = createMaterialTopTabNavigator();

  console.log(activeTicketsCombined)

  return(
      /*<View style={styles.container}>
        <Tab.Navigator onPress={() => console.log("fortnite")}>
          <Tab.Screen
            name="Active"
            listeners={{ tabPress: e => {
              ticketNames.pop()
            }}}
            children={props => <ActiveTicketsTab
            ticketNames={ticketNames} {...props} />}
          />
          <Tab.Screen name="Used" component={UsedTicketsTab} />
        </Tab.Navigator>
      </View>*/
    <View style={styles.container}>
      <SectionList
        sections={[activeTicketsCombined, ...completedTaskData]}
        extraData={refresh}
        renderItem={({item})=>(
            TicketEntry(item.task)
        )}
        renderSectionHeader={({section})=>(
          <Text style={styles.taskTitle}>{section.title}</Text>
        )}
        keyExtractor={item=>item.id}
        stickySectionHeadersEnabled
      />
    </View>
  )
}

function ActiveTicketsTab(props) {
  return(
    <View style={styles.container}>
      <FlatList data={props.ticketNames} renderItem={({item}) => (<Item title={item}/>)}/>
      <Button onPress={() => console.log(props.ticketNames)} title="get ticket names"/>
    </View>
  )
}

function UsedTicketsTab() {

  return(
    <Text>Used Tickets: </Text>
  )
}

const FetchTickets = async (user_tickets) => {
  try {
    var urls = []
    user_tickets.forEach(ticket => {
      urls.push('https://us-central1-qrapp-fe2f3.cloudfunctions.net/encryptTicket?id=' + ticket)
    });

    const responsesJSON = await Promise.all(urls.map(url =>
      fetch(url)
    ))
    return ticketResponses = await Promise.all(responsesJSON.map(r => r.json()));
  } catch (err) {
    throw err;
  }
};

function GetTickets(user_tickets)
{
  const activeTickets = []
  const usedTickets = []
  /*
  user_tickets.forEach(ticket => {
    url = 'https://us-central1-qrapp-fe2f3.cloudfunctions.net/encryptTicket?id=' + ticket
    data = fetch(url,).then((response) => response.json())
    .then((data) => {
      if(!data.ticketExists) return;
      const newTicket = {encryptedData: data.qrPayload.encryptedData, cost: data.ticketMeta.Cost, event: data.ticketMeta.Event, seat: data.ticketMeta.SeatNumber}
      if(data.ticketMeta.Used) usedTickets.push(newTicket)
      else activeTickets.push(newTicket)
    })
  })
  .then((data) => {
    console.log("E")
  })
  */

  Promise.all(user_tickets.map(ticket => {
    url = 'https://us-central1-qrapp-fe2f3.cloudfunctions.net/encryptTicket?id=' + ticket
    fetch(url,).then((response) => response.json())
    .then((data) => {
      if(!data.ticketExists) return;
      const newTicket = {encryptedData: data.qrPayload.encryptedData, cost: data.ticketMeta.Cost, event: data.ticketMeta.Event, seat: data.ticketMeta.SeatNumber}
      console.log(newTicket)
      if(data.ticketMeta.Used) usedTickets.push(newTicket)
      else activeTickets.push(newTicket)
    })
  }))
  .then(data => {
    console.log(activeTickets)
    console.log(usedTickets)
  })
}

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