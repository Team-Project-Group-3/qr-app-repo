import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../../styles';
import { firebase } from '../../firebase/config'
import { usePreventScreenCapture } from 'expo-screen-capture';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onDevLinkPress = () => {
        navigation.navigate('Buy Ticket')
    }

    const onDev2LinkPress = () => {
        navigation.navigate('QR Code Tester')
    }

    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()

                        if(user.isVerifier) navigation.navigate('AdminHome', {user})
                        else navigation.navigate('UserHome', {user})
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../assets/icon.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>No account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
                {/* <View style={styles.footerView}>
                    <Text style={styles.footerText}>Go to <Text onPress={onDevLinkPress} style={styles.footerLink}>Buy Ticket Dev Page</Text></Text>
                </View>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Go to <Text onPress={onDev2LinkPress} style={styles.footerLink}>QR Code Tester Dev Page</Text></Text>
                    <Text onPress={onDevLinkPress} style={styles.footerLink}>Go To Dev Page</Text> */}
                {/* </View> */}
            </KeyboardAwareScrollView>
        </View>
    )
}