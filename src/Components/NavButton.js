import React from 'react';
import { Text, Pressable } from 'react-native';
import styles from '../styles'

const NavButton = ({ page, label, navigation }) => {
  
    const handlePress = () => {
      navigation.navigate(page);
    };
  
    return (
      <Pressable
        onPress={handlePress}
        style={styles.button}>
        <Text style={styles.buttonText}>{label}</Text>
      </Pressable>
    );
  };

export default NavButton;