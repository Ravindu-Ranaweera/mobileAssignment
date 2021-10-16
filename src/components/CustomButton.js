import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';

const CustomButton = ({btnOnPress, title}) => {
  return (
    <Pressable onPress={btnOnPress} style={{...styles.buttonContainer}}>
      <Text style={{fontSize: 18, color: '#fff'}}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#0072ff',
    width: '50%',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
});

export default CustomButton;
