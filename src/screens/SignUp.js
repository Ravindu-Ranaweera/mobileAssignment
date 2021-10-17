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
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import {AuthContext} from '../navigations/authentication';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SignUp = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [profileImg, setProfileImg] = React.useState(
    'https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar',
  );
  const [loading, setLoading] = useState(false);

  const _storeData = async c => {
    try {
      console.log(c);
      await AsyncStorage.setItem('username', c);
    } catch (error) {
      console.log(error);
      // Error saving data
    }
  };

  const onSignUpPress = async () => {
    let err;
    if (
      username == '' ||
      password == '' ||
      location == '' ||
      firstName == '' ||
      lastName == ''
    ) {
      err = 'All Fields Are Required';
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
        // console.log(username);
        // console.log(password);
        await auth().createUserWithEmailAndPassword(username, password);
        const c = await auth().signInWithEmailAndPassword(username, password);
        const cd = JSON.stringify(c);
        console.log('return value:' + cd);
        await _storeData(cd);
        const value = await AsyncStorage.getItem('username');
        var user;
        if (value !== null) {
          let js = JSON.parse(value);
          user = js.user.uid;
        }
        try {
          await firestore().collection('users').add({
            userId: user,
            email: username,
            firstName: firstName,
            lastName: lastName,
            location: location,
            profileImg: profileImg,
          });
        } catch (err) {
          console.log(err);
        }
        navigation.navigate('Feeds');
      } catch (error) {
        console.log(error);
        setLoading(false);

        console.log(error.code);
        if (error.code == 'auth/weak-password') {
          err = 'Password should be at least 6 characters';
        } else if (error.code == 'auth/email-already-in-use') {
          err = 'The email address is already in use by another account';
        } else if (error.code == 'auth/invalid-email') {
          err = 'The email address is badly formatted';
        }
        Alert.alert('Error on Creating Account', err, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    }
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
            {/* <Text style={{fontSize: 24, fontWeight: 'bold', color: '#3EB489'}}>
          Are You Ready
        </Text>
        <Text style={{fontSize: 24, fontWeight: 'bold', color: '#000'}}>
          To Be A Good Leader
        </Text> */}
          </View>
          <View style={{paddingLeft: 40, paddingRight: 40}}>
            <Text style={{fontSize: 12, color: '#000'}}>First Name</Text>
            <CustomInput
              placeholder={'Enter Your Email'}
              value={firstName}
              setValue={setFirstName}
            />
            <Text style={{fontSize: 12, color: '#000'}}>Last Name</Text>
            <CustomInput
              placeholder={'Enter Your Password'}
              value={lastName}
              setValue={setLastName}
              secureTestEntry={true}
            />
            <Text style={{fontSize: 12, color: '#000'}}>Email Address</Text>
            <CustomInput
              placeholder={'Enter Your Password'}
              value={username}
              setValue={setUsername}
              secureTestEntry={true}
            />
            <Text style={{fontSize: 12, color: '#000'}}>Location</Text>
            <CustomInput
              placeholder={'Enter Your Password'}
              value={location}
              setValue={setLocation}
              secureTestEntry={true}
            />
            <Text style={{fontSize: 12, color: '#000'}}>Password</Text>
            <CustomInput
              placeholder={'Enter Your Password'}
              value={password}
              setValue={setPassword}
              secureTestEntry={true}
            />
            <View style={{marginTop: 15, alignItems: 'center'}}>
              <CustomButton btnOnPress={onSignUpPress} title={'Sign Up'} />
            </View>
          </View>
          <View style={{...styles.footer}}>
            <Text style={{fontSize: 14}}>If You Already Have Account</Text>
            <Pressable
              onPress={onSignUpPress}
              style={{...styles.buttonContainer}}>
              <Text style={{fontSize: 14, color: '#0072ff'}}>Sign In</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '30%',
    maxHeight: 100,
    height: 100,
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
