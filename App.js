import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  StatusBar,
  Image,
} from 'react-native';
import HomeNav from './src/navigation/homeNav';

const App = () => {
  return (
    <NavigationContainer>
      <HomeNav />
    </NavigationContainer>
  );
};

export default App;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({});
