import React, {useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import CustomInputTwo from '../components/CustomInputTwo';

const onSignInPress = () => {
  console.warn('pressed sign in');
};
const onSignUpPress = () => {
  console.warn('pressed sign up');
};

const EditProfile = ({onPressLearnMore}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
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
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 12, color: '#000'}}>First Name</Text>
          </View>
          <View style={{flex: 2}}>
            <CustomInputTwo
              placeholder={'Enter Your Email'}
              value={username}
              setValue={setUsername}
            />
          </View>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 12, color: '#000'}}>Last Name</Text>
          </View>
          <View style={{flex: 2}}>
            <CustomInputTwo
              placeholder={'Enter Your Email'}
              value={username}
              setValue={setUsername}
            />
          </View>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 12, color: '#000'}}>Email Address</Text>
          </View>
          <View style={{flex: 2}}>
            <CustomInputTwo
              placeholder={'Enter Your Email'}
              value={username}
              setValue={setUsername}
            />
          </View>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 12, color: '#000'}}>City</Text>
          </View>
          <View style={{flex: 2}}>
            <CustomInputTwo
              placeholder={'Enter Your Email'}
              value={username}
              setValue={setUsername}
            />
          </View>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 12, color: '#000'}}>Contact Number</Text>
          </View>
          <View style={{flex: 2}}>
            <CustomInputTwo
              placeholder={'Enter Your Email'}
              value={username}
              setValue={setUsername}
            />
          </View>
        </View>

        <View style={{marginTop: 15, alignItems: 'flex-end'}}>
          <Pressable
            onPress={() => navigation.navigate('EditProfile')}
            style={{...styles.buttonContainer}}>
            <Text style={{fontSize: 15, color: '#fff'}}>Update</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default EditProfile;

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
  buttonContainer: {
    backgroundColor: '#0072ff',
    marginTop: 10,
    width: '40%',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
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
