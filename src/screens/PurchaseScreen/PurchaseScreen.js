import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button, StyleSheet, Pressable } from 'react-native'
import NavButton from '../../Components/NavButton'
import { firebase } from '../../firebase/config'


export default function PurchaseScreen(props) {
    
    const eventsRef = firebase.firestore().collection('events');

    const user = props.extraData
    
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [ticket, setTicket] = useState(null);
    const [success, setSuccess] = useState('');
    

    useEffect(() => {
        const unsubscribe = eventsRef.onSnapshot((querySnapshot) => {
            const events = [];
            querySnapshot.forEach((doc) => {
                events.push({ id: doc.id, ...doc.data() });
            });
            setEvents(events);
        });

        return () => unsubscribe();
    }, []);

    const handleEventPress = (event) => {
        if (selectedEvent === event) {
            setSelectedEvent(null);
        } else {
            setSelectedEvent(event);
        }
    };

    const buyTicket = (item) => {
       ticketName = (item.id)
        userName = (user.id)
        const url = `https://us-central1-qrapp-fe2f3.cloudfunctions.net/generateTicket?uid=${userName}&eventName=${ticketName}`;
        fetch(url)
      .then(response => response.json())
      .then((data) => {
        setSuccess('Ticket purchased successfully!');
        console.log(data);
    })
    .catch(error => {
        console.log('Error: ', error );
    });
      
      /*
      .then(data => setTicket(data))
      .then(console.log(data))
      .catch(error => console.error(error));*/
      
    }

    return(
        <View>
            <Text>Credits:  {user.credit}</Text>
            {success !== '' && (
                <Text style={styles.success}>{success}</Text>
            )}
             <Text style={styles.title}>Upcoming Events</Text>
            <FlatList
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.Events}
                        onPress={() => handleEventPress(item)}
                    >
                        <Text style={styles.Name}>{item.id}</Text>
                        {selectedEvent === item && (
                            <View style={styles.Details}>
                                <Text style={styles.TextDetails}>Cost: {item.cost}</Text>
                                <Text style={styles.TextDetails}>Available Tickets: {item.AvailableTickets}</Text>
                                <TouchableOpacity onPress={() => buyTicket(item)}>
                                <View style={styles.button}>
                                <Text style={styles.buttonText}>Buy Ticket</Text>
                                </View>
                            </TouchableOpacity>
                            </View>
                        )}
                    </TouchableOpacity>
                )}
            />

            <NavButton page="Manage" navigation={props.navigation} label="See My Tickets"/>
            <NavButton page="Home" navigation={props.navigation} label="Home"/>
        </View>
    )
}
const styles = StyleSheet.create({
    Events: {
        borderBottomWidth: 2,
        borderColor: 'gray',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    Name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    Details: {
        marginTop: 10,
    },
    TextDetails: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 15,
        backgroundColor: '#00C6D2',
        marginTop: 45,
        position: 'relative',
        height: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 12,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
      },
      success: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
        marginTop: 10,
        textAlign: 'center',
    },
});