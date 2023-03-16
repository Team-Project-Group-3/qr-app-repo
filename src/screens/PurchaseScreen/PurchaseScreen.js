import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import NavButton from '../../components/NavButton'
import { firebase } from '../../firebase/config'


export default function PurchaseScreen(props) {
    
    const eventsRef = firebase.firestore().collection('events');

    const user = props.extraData
    const [isLoading, setIsLoading] = useState(false);
    
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
        setIsLoading(true);
        const url = `https://us-central1-qrapp-fe2f3.cloudfunctions.net/generateTicket?uid=${userName}&eventName=${ticketName}`;
        fetch(url)
      .then(response => response.json())
      .then((data) => {
        setSuccess('Ticket purchased successfully!');
    })
    .catch(error => {
        console.log('Error: ', error );
    })
    .finally(() => setIsLoading(false));
      
      /*
      .then(data => setTicket(data))
      .catch(error => console.error(error));*/
      
    }

    return(
        <View>
            <Text>Credits:  {user.credit}</Text>


            {success !== '' && (
                <Text style={styles.success}>{success}</Text>
            )}


             <Text style={styles.title}>Upcoming Events</Text>
             {isLoading && <ActivityIndicator />}
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
        </View>
    )
}
const styles = StyleSheet.create({
    Events: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 2,
        borderColor: 'gray',
        
    },
    Name: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    Details: {
        marginTop: 10,
    },
    TextDetails: {
        fontSize: 12,
    },
    button: {
        position: 'relative',
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        backgroundColor: '#00C6D2',
        marginTop: 45,
    },
    text: {
        fontSize: 12,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'rgb(255,255,255)',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
      },
      success: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(73,252,3)',
        marginTop: 10,
        textAlign: 'center',
    },
});