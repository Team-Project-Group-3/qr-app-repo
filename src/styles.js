import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
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
    tabContainer: {
        flex: 1,
    },
    ticketEntry: {
        backgroundColor: '#e1e1e1',
        padding: 5,
        marginTop: 15,
        marginHorizontal: 15,
        borderRadius: 5,
    },
    ticketButton: {
        padding: 19,
        borderRadius: 5,
    },
    ticketText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    title: {
        fontSize: 32,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        color: 'black',
        fontSize: 20,
        fontWeight: "bold"
    },
});