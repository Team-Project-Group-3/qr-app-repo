import React, { useEffect, useState } from 'react'
import { Text, View, Button } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import axios from 'axios';
import styles from './scanStyles';
import CustomButton from './ButtonPressable';

export default function AdminHomeScreen({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [color, setColor] = useState("white");
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
                setColor("#65ff15");
                alert("Ticket valid");
            }
            else{
                setColor("red");
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
            <BarCodeScanner style={{
                borderWidth: 10,
                borderColor: color,
                alignSelf:"center",
                height: 400,
                width: "100%",
                marginVertical: 1,
                padding: 20,
                }}
             onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
             />
        {scanned && <CustomButton onPress={() => setScanned(false)} title={"Press to scan again"}/>}
        </View>
    );
}