import React, {useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const _storeData = async c => {
    try {
      console.log(c);
      await AsyncStorage.setItem('username', c);
    } catch (error) {
      console.log(error);
      // Error saving data
    }
  };
  const onSignInPress = async () => {
    // console.warn('pressed sign up');
    let err = '';
    // console.warn(username, password);
    if (username == '' || password == '') {
      err = 'Empty Usrname Or Password';
      Alert.alert('Error on Login Account', err, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      try {
        const c = await auth().signInWithEmailAndPassword(username, password);
        const cd = JSON.stringify(c);
        console.log('return value:' + cd);
        await _storeData(cd);
        navigation.replace('Feeds');

        //   login(userName, password);
      } catch (error) {
        console.log(error);
        let err = '';
        console.log(error.code);
        if (error.code === 'auth/weak-password') {
          err = 'Password should be at least 6 characters';
        } else if (error.code === 'auth/email-already-in-use') {
          err = 'The email address is already in use by another account';
        } else if (error.code === 'auth/invalid-email') {
          err = 'The email address is badly formatted';
        } else if (error.code === 'auth/user-not-found') {
          err =
            'There is no user record corresponding to this identifier. The user may have been deleted';
        } else if (error.code === 'auth/wrong-password') {
          err = 'User name or password is invalid';
        }
        Alert.alert('Error on Login Account', err, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    }

    // navigation.navigate('Login');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={{...styles.root}}>
            <Image
              source={require('../../assets/logo.jpg')}
              style={{...styles.logo}}
            />
            <Text style={{fontSize: 24, fontWeight: 'bold', color: '#3EB489'}}>
              Are You Ready
            </Text>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: '#000'}}>
              To Be A Good Leader
            </Text>
          </View>
          <View style={{paddingLeft: 40, paddingRight: 40, marginTop: 20}}>
            <Text style={{fontSize: 12, color: '#000'}}>User Email</Text>
            <CustomInput
              placeholder={'Enter Your Email'}
              value={username}
              setValue={setUsername}
            />
            <Text style={{fontSize: 12, color: '#000'}}>Password</Text>
            <CustomInput
              placeholder={'Enter Your Password'}
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
            />
            <View style={{marginTop: 15, alignItems: 'center'}}>
              <CustomButton btnOnPress={onSignInPress} title={'Sign In'} />
            </View>
          </View>
          <View style={{...styles.footer}}>
            <Text style={{fontSize: 14}}>If You Don't Have Account</Text>
            <Pressable onPress={() => navigation.navigate('SignUp')} style={{}}>
              <Text style={{fontSize: 14, color: '#0072ff'}}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '50%',
    maxHeight: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    // backgroundColor: '#0072ff',
    borderTopEndRadius: 100,
    borderTopStartRadius: 100,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
});
