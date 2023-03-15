import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 25,
        marginBottom: 0,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: '#00C6D2',
        fontWeight: "bold",
        fontSize: 16
    },
    button: {
        backgroundColor: '#00C6D2',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 35,
        height: 72,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    loginButton: {
        backgroundColor: '#00C6D2',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 25,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
});