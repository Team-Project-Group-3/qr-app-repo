import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

const NavButton = ({ page, label, navigation }) => {
  
    const handlePress = () => {
      navigation.navigate(page);
    };
  
    return (
      <Pressable
        onPress={handlePress}
        style={styles.button}>
        <Text style={styles.text}>{label}</Text>
      </Pressable>
    );
  };

export default NavButton;

const styles = StyleSheet.create({
button: {
    borderRadius: 15,
    backgroundColor: '#00C6D2',
    marginTop: 45,
    position: 'relative',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
},
text: {
    fontSize: 22,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
},
});