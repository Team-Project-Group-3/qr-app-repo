import {Component, Fragment} from 'react';
import { TouchableOpacity, Text, Linking, View, Image, ImageBackground, BackHandler } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanStyles';

class Scan extends Component{
    constructor(props){
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null
        };
    }
    onSuccess = (e) => {
        // decrypt QR
        // check token
        // check with DB
    }
    activeQR = () => {
        this.setState({ scan: true })
    }
    scanAgain = () => {
        this.setState({ scan: true, ScanResult: false })
    }
}