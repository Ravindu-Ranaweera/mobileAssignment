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
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const onEditProf = () => {
  console.warn('pressed sign in');
};

const Profile = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={{...styles.root}}>
            <View style={{flex: 1, marginLeft: 10}}>
              <Image
                source={require('../../assets/profile.jpg')}
                style={{...styles.logo}}
              />
            </View>
            <View style={{flex: 2}}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#fff',
                  marginTop: 20,
                }}>
                Pasindu Ayya
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: '#fff',
                  marginTop: 5,
                }}>
                Pasindu@gmail.com
              </Text>
              <Pressable
                onPress={() => navigation.navigate('EditProfile')}
                style={{...styles.buttonContainer}}>
                <Text style={{fontSize: 15, color: '#fff'}}>Edit</Text>
              </Pressable>
            </View>
          </View>

          <View style={{...styles.footer}}>
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: '#000',
              }}
            />

            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                borderTopStartRadius: 85,
              }}>
              {/* create post card */}
              <View style={{...styles.card}}>
                <View style={{marginBottom: 10}}>
                  <Text style={{color: 'black', fontSize: 16}}>Post</Text>
                </View>

                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Image
                    source={require('../../assets/image.png')}
                    style={{height: 25, width: 30}}
                  />
                  <Text>Share Your Leadership Idea with Us</Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <Pressable
                    onPress={() => navigation.navigate('CreatePost')}
                    style={{...styles.buttonContainerTwo}}>
                    <Text style={{fontSize: 15, color: '#fff'}}>
                      Create Post
                    </Text>
                  </Pressable>
                </View>
              </View>

              {/* my past posts */}
              <View style={{...styles.cardTwo}}>
                <View style={{...styles.photoFrame}}>
                  <Image
                    source={require('../../assets/nf1.jpg')}
                    style={{...styles.photo}}
                  />
                </View>
                <View style={{...styles.textFrame}}>
                  <Text style={{color: '#3EB489'}}>#BePositive</Text>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 16,
                      marginTop: 5,
                      marginBottom: 5,
                    }}>
                    How to Be Positive
                  </Text>
                  <Text>
                    Expo CLI configures your project to use the most recent
                    React Native version that is supported by the Expo client
                    app. The Expo client app usually gains support for a given
                    React Native version about a week after the React Native
                    version
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#000',
    height: 0.22 * height,
    borderBottomEndRadius: 85,
    display: 'flex',
    flexDirection: 'row',
  },
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
  cardTwo: {
    margin: 25,
    backgroundColor: '#fff',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 20,
  },
  photo: {
    height: 250,
    width: '100%',
  },
  photoFrame: {
    height: 250,
    overflow: 'hidden',
  },
  textFrame: {
    height: 'auto',
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#fff',
    marginLeft: 10,
    marginTop: 15,
  },
  footer: {
    flex: 1,
  },
  buttonContainer: {
    // borderColor: '#0072ff',
    backgroundColor: '#0072ff',
    borderWidth: 2,
    marginTop: 10,
    width: '40%',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContainerTwo: {
    backgroundColor: '#0072ff',
    marginTop: 10,
    width: '40%',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
});
