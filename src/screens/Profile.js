import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import MyPostCard from '../components/MyPostCard';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import auth from '@react-native-firebase/auth';

import {
  faCircle,
  faMapMarkedAlt,
  faMailBulk,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
const Profile = ({navigation}) => {
  const [userId, setUserId] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [profileImg, setProfileImg] = React.useState(
    'https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar',
  );
  const [user, setUser] = useState([]);
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      var value = await AsyncStorage.getItem('username');
      const data = JSON.parse(value);
      const list = [];
      let l;
      firestore()
        .collection('users')
        .where('userId', '==', data.user.uid)
        .get()
        .then(querySnapshot => {
          console.log('Total User', querySnapshot.size);

          querySnapshot.forEach(documentSnapshot => {
            console.log(
              'User id: ',
              documentSnapshot.id,
              documentSnapshot.data(),
            );
            setKey(documentSnapshot.id);
            setUserId(documentSnapshot.data().userId);
            setFirstName(documentSnapshot.data().firstName);
            setLastName(documentSnapshot.data().lastName);
            setLocation(documentSnapshot.data().location);
            setUsername(documentSnapshot.data().email);
            setProfileImg(documentSnapshot.data().profileImg);
            list.push(documentSnapshot.data());

            setUser(list);
          });
        });
    };
    getUser();
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        let js = JSON.parse(value);
        // console.log(js.user.uid);
        getId(js.user.uid);
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };
  const getId = async e => {
    const list = [];
    let l;
    firestore()
      .collection('posts')
      .where('user', '==', e)
      .get()
      .then(querySnapshot => {
        console.log('Total post:', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'my post id: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          setKey(documentSnapshot.id);
          list.push(documentSnapshot.data());
        });
        setPostList(list);
        setLoading(false);
        console.log(111111111111111111111111);
        console.log(postList);
      });
  };

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.navigate('Home');
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{...styles.root}}>
        <View style={{flex: 1, marginLeft: 10}}>
          <Image source={{uri: profileImg}} style={{...styles.logo}} />
        </View>
        <View style={{flex: 2}}>
          <View style={{display: 'flex', flexDirection: 'row', margin: 5}}>
            <FontAwesomeIcon icon={faUserShield} style={{color: '#3EB489'}} />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 15,
                textTransform: 'capitalize',
                color: '#fff',
              }}>
              {firstName + ' ' + lastName}
            </Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', margin: 5}}>
            <FontAwesomeIcon icon={faMailBulk} style={{color: '#3EB489'}} />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 15,
                color: '#fff',
              }}>
              {username}
            </Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', margin: 5}}>
            <FontAwesomeIcon icon={faMapMarkedAlt} style={{color: '#3EB489'}} />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 15,
                textTransform: 'capitalize',
                color: '#fff',
              }}>
              {location}
            </Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate('EditProfile')}
            style={{...styles.buttonContainer}}>
            <Text style={{fontSize: 15, color: '#fff'}}>Edit</Text>
          </Pressable>
          <Pressable
            onPress={() => signOut()}
            style={{...styles.buttonContainer}}>
            <Text style={{fontSize: 15, color: '#fff'}}>Sign Out</Text>
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
            <View
              style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}}>
              <Image
                source={require('../../assets/image.png')}
                style={{height: 25, width: 30}}
              />
              <Text style={{color: 'black', fontSize: 16}}>Post</Text>
            </View>

            <View style={{display: 'flex', flexDirection: 'row', margin: 5}}>
              <View style={{flex: 2}}>
                <Text>Share Your Leadership Idea with Us</Text>
              </View>
              <View style={{flex: 2, alignItems: 'flex-end', marginRight: 10}}>
                <Pressable
                  onPress={() => navigation.navigate('CreatePost')}
                  style={{...styles.buttonContainerTwo}}>
                  <Text style={{fontSize: 15, color: '#fff'}}>Create</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* my past posts */}
          {loading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={postList}
              renderItem={({item}) => (
                <MyPostCard item={item} navigation={navigation} />
              )}
            />
          )}
        </View>
      </View>
    </View>
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
