import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
      borderWidth: 5,
      borderColor: "white",
      alignSelf:"center",
      height: 400,
      width: "100%",
      marginVertical: 1,
      padding: 20,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      height: 47,
      borderRadius: 5,
      backgroundColor: '#788eec',
      width: 80,
      alignSelf: "center",
      justifyContent: 'center'
  },
  buttonText: {
      color: 'white',
      fontSize: 16
  },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  });