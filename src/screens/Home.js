import React, {useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const onEditProf = () => {
  console.warn('pressed sign in');
};

const Home = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
      }}>
      <View style={{...StyleSheet.absoluteFill}}>
        <Image
          source={require('../../assets/bg.jpg')}
          style={{flex: 1, height: null, width: null}}
        />
      </View>
      <View
        style={{
          height: height / 3,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={styles.button}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000000'}}>
            SIGN IN
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('SignUp')}
          style={{...styles.button, backgroundColor: '#0072ff'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
            SIGN UP
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Home;
const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    height: 50,
    width: 220,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
});
