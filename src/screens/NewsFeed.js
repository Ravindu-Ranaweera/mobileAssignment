import React, {useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

const onEditProf = () => {
  console.warn('pressed sign in');
};

const NewsFeed = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View>
          <View style={{...styles.card}}>
            <View style={{...styles.root}}>
              <Image
                source={require('../../assets/profile.jpg')}
                style={{...styles.logo}}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: '#000',
                  marginTop: 5,
                  marginLeft: 10,
                }}>
                Pasindu Ayya
              </Text>
            </View>
            <View style={{...styles.photoFrame}}>
              <Image
                source={require('../../assets/nf1.jpg')}
                style={{...styles.photo}}
              />
            </View>
            <View style={{...styles.textFrame}}>
              <Text>
                Expo CLI configures your project to use the most recent React
                Native version that is supported by the Expo client app. The
                Expo client app usually gains support for a given React Native
                version about a week after the React Native version
              </Text>
            </View>
          </View>
          <View style={{...styles.card}}>
            <View style={{...styles.root}}>
              <Image
                source={require('../../assets/profile.jpg')}
                style={{...styles.logo}}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: '#000',
                  marginTop: 5,
                  marginLeft: 10,
                }}>
                Pasindu Ayya
              </Text>
            </View>
            <View style={{...styles.photoFrame}}>
              <Image
                source={require('../../assets/nf1.jpg')}
                style={{...styles.photo}}
              />
            </View>
            <View style={{...styles.textFrame}}>
              <Text>
                Expo CLI configures your project to use the most recent React
                Native version that is supported by the Expo client app. The
                Expo client app usually gains support for a given React Native
                version about a week after the React Native version
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsFeed;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 25,
    backgroundColor: '#fff',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 20,
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  photo: {
    height: 250,
    width: '100%',
  },
  photoFrame: {
    height: 250,
    overflow: 'hidden',
    padding: 20,
  },
  textFrame: {
    height: 'auto',
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3EB489',
  },
});
