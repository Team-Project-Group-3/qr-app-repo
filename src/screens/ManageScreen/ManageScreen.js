import React, { useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import NavButton from '../../Components/NavButton'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default function ManageScreen(props) {

  props.navigation.setOptions({ headerTitle: "Manage Tickets", });

  const Tab = createMaterialTopTabNavigator();

  const user = props.extraData
  const user_tickets = user.ticketsOwned

  console.log(user_tickets)

  return(
      <View style={styles.container}>
        <Tab.Navigator>
          <Tab.Screen name="Active" children={props => <ActiveTicketsTab tickets={user_tickets} {...props} />} />
          <Tab.Screen name="Used" component={UsedTicketsTab} />
        </Tab.Navigator>
      </View>
  )
}

function ActiveTicketsTab(tickets) {

  console.log(tickets.tickets)

  return(
    <View style={styles.container}>
      <FlatList data={tickets.tickets} renderItem={({item}) => (<Item title={item}/>)}/>
    </View>
  )
}

function UsedTicketsTab() {

  return(
    <Text>Used Tickets: </Text>
  )
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