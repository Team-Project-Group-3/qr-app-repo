import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import NavButton from '../../components/NavButton'
import { firebase } from '../../firebase/config'
import { Alert } from 'react-native'


export default function PurchaseScreen(props) {
    
    const eventsRef = firebase.firestore().collection('events');
    const usersRef = firebase.firestore().collection("users");
    const user = props.extraData;
    const [isLoading, setIsLoading] = useState(false);
    const [credits, setCredits] = useState('');
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
        const creditUpdate = usersRef.doc(user.id).onSnapshot((update) => {
            const data = update.data();
            const credits = data.credit;
            setCredits(credits);
        });

        return () => {
            unsubscribe();
            creditUpdate();
        }
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
      .then(data => {


        console.log("Datamessage: "+data.message);

        if(data.message == "User already has a ticket for this event"){

            Alert.alert(
                'Ticket purchase unsuccessful',
                data.message,
                [
                    {text: 'OK', onPress:() => console.log("User acknowledged message")},
                ],
                {cancelable: false},
                );

        }
        if(data.message == "User is out of credits, cannot buy a ticket"){

            Alert.alert(
                'User is out of credits, cannot buy a ticket',
                data.message,
                [
                    {text: 'OK', onPress:() => console.log("User acknowledged message")},
                ],
                {cancelable: false},
                );

        }
        else{
        Alert.alert(
                    'Ticket purchase successful',
                    'Thank you for purchasing a ticket for '+ticketName,
                    [
                        {text: 'OK', onPress:() => console.log("User acknowledged message")},
                    ],
                    {cancelable: false},
                    );
        console.log(data);
    }})
    .catch(error => {
        console.log('Error: ', error );
    })
    .finally(() => setIsLoading(false));
      
    }

    return( 
        <View>
            <View style={[styles.creditsContainer, {marginTop: 0}]}>
                <Text style={[styles.credits, {textAlign: 'center', marginBottom: 0}]}>Credits: £{credits}</Text>
            </View>

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
                            <Text style={styles.TextDetails}><Text style={styles.bold}>Location: </Text>{item.location}</Text>
                            <Text style={styles.TextDetails}><Text style={styles.bold}>Date:</Text> {item.date.toDate().toLocaleDateString()}</Text>
                            <Text style={styles.TextDetails}><Text style={styles.bold}>Cost:</Text> £{item.cost}</Text>
                            <Text style={styles.TextDetails}><Text style={styles.bold}>Available Tickets:</Text> {item.availableTickets}</Text>
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
        fontSize: 20
    },
    TextDetails: {
        fontSize: 20,
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
    creditsContainer: {
        backgroundColor: '#00C6D2',
        borderRadius: 0,
        padding: 10,
        marginBottom: 30,
        // borderColor: 'black',
        // borderTopWidth: 2,
        // borderBottomWidth: 2
      },
      credits: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'right',
      },
      Details: {
        },
        TextDetails: {
        
        },
        buttonText: {
            color: "white"
        },
        bold: {
        fontWeight: 'bold'
        }
});