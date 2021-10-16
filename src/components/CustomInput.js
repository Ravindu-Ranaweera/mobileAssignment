import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderColor: '#8c8c8c',
    borderBottomWidth: 2,
    padding: 10,
  },
});

export default CustomInput;
