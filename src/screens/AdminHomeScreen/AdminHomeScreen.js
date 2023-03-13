import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button, StyleSheet } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import styles from './scanStyles';

export default function AdminHomeScreen({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(()=> {
        const getBarCodeScannerPermissions = async () => {
            // requests permissions
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data}) =>{
        // function to handle data scanned from QR scanner
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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