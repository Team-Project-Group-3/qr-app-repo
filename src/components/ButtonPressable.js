import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function Button(props) {
    const { onPress, title = 'Save' } = props;
    return (
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderTopEndRadius:10,
        borderTopStartRadius:10,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        marginTop: 10,
        width: 190,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'blue',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      letterSpacing: 0.25,
      color: 'white',
    },
  });