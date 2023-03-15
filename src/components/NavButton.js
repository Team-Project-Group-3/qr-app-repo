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
        style={({ pressed }) => [
          {
              backgroundColor: pressed
                  ? "#008a92"
                  : "#00C6D2",
          },
          styles.button]}>
        <Text style={styles.buttonText}>{label}</Text>
      </Pressable>
    );
  };

export default NavButton;