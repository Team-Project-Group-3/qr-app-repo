import React from 'react';
import { Button } from 'react-native';

const NavButton = ({ page,navigation }) => {
  
    const handlePress = () => {
      navigation.navigate(page);
    };
  
    return (
      <Button
        title={`Go to ${page}`}
        onPress={handlePress}
      />
    );
  };
  
  export default NavButton;