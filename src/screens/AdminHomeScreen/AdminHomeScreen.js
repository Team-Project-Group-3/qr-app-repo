import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button, StyleSheet } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import axios from 'axios';
import styles from './scanStyles';
import { Background } from '@react-navigation/elements';

export default function AdminHomeScreen({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    let id = null;
    let encData = null;
    

    useEffect(()=> {
        const getBarCodeScannerPermissions = async () => {
            // requests permissions
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);
    const handleVerify = async () => {
        try {
            
        } 
        catch (error) {
          res = response.data.response;
          stat = response.data.status;
          console.log(`Response : ${res} Status: ${stat}`);
          console.error(error);
          return(false);
        }
      };
    const handleBarCodeScanned = async ({ type, data}) =>{
        // function to handle data scanned from QR scanner
        setScanned(true);
        verified = false;
        try{
            qrPayload = JSON.parse(data);
            id = qrPayload.ticketId;
            encData = qrPayload.encryptedData;
        }
        catch(err){
            console.log("invalid payload " + err);
        }
        try{
            console.log(id);
            url = `https://us-central1-qrapp-fe2f3.cloudfunctions.net/verifyTicket?id=${id}&encData=${encData}`
            const response = await axios.get(url);
            res = response.data.response;
            stat = response.data.status;
            console.log(`Response : ${res} Status: ${stat}`);
            if (stat === "success"){
                console.log("verified");
                this.color = "green";
                alert("Ticket valid");
            }
            else{
                this.color = "red";
                console.log("verification failed");
                alert(`Ticket invalid: ${res}`);
            }
        }
        catch(err){
            console.log(err);
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>Camera permissions rejected</Text>;
    }

    return(
        <View>
            <BarCodeScanner style={styles.camera}
             onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
             />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
}