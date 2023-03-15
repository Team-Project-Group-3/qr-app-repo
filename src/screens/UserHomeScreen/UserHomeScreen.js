import { Text, View } from 'react-native'
import NavButton from '../../Components/NavButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../../styles';

export default function UserHomeScreen(props) {

    const user = props.extraData

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Text style={{ fontSize: 32, textAlign: 'center', color: 'black', marginTop: 75, marginBottom: 25}}>
                    Welcome {user.fullName}!
                </Text>

                <NavButton page="Purchase" label="Purchase Tickets" navigation={props.navigation} />
                <NavButton page="Manage" label="Manage Tickets" navigation={props.navigation}/>
                <NavButton page="Login" label="Logout" navigation={props.navigation}/>
            </KeyboardAwareScrollView>
        </View>
    )
}