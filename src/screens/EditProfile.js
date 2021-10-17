import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import CustomInputTwo from '../components/CustomInputTwo';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({onPressLearnMore}) => {
  const [userId, setUserId] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [profileImg, setProfileImg] = React.useState(
    'https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar',
  );
  const [userList, setUserList] = useState([]);
  const [key, setKey] = useState('');

  useEffect(() => {
    getUser();
  }, []);

  function uploadByGallery() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setProfileImg(image.path);
      if (image) {
        // _uploadImage(image.path);
        // _getUrl('004.png');
      }
    });
  }

  const getUrl = async image => {
    const url = await storage()
      .ref('/' + image)
      .getDownloadURL();
    createPost(url);
    console.log('url is' + url);
    // setUrl(url.toString);
  };
  const updateUser = async path => {
    var today = new Date();
    console.log('url pathaaa:', path);
    var time =
      today.getHours().toString() +
      today.getMinutes().toString() +
      today.getSeconds().toString();
    const uId = uuid.v4();
    console.log(uId);
    const reference = storage().ref(uId + '.png');
    await reference.putFile(path);

    const task = reference.putFile(path);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    task.then(() => {
      console.log('Image uploaded to the bucket!');
      getUrl(uId + '.png');
    });
    // _getUrl('001.png');
  };
  const createPost = async url => {
    firestore()
      .collection('users')
      .doc(key)
      .update({
        firstName: firstName,
        lastName: lastName,
        location: location,
        profileImg: url,
      })
      .then(() => {
        console.log('Post added!');
      });
  };

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

          setUserList(list);
        });
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 10,
          paddingLeft: 40,
        }}>
        <View style={{flex: 2}}>
          <Image
            source={{
              uri: profileImg,
            }}
            style={{width: 150, height: 150}}
          />
        </View>
        <View style={{flex: 2}}>
          <Pressable
            onPress={() => uploadByGallery()}
            style={{...styles.buttonContainer}}>
            <Text style={{fontSize: 15, color: '#fff'}}>Add Image</Text>
          </Pressable>
        </View>
      </View>
      <View style={{paddingLeft: 40, paddingRight: 40}}>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 12, color: '#000'}}>First Name</Text>
          </View>
          <View style={{flex: 2}}>
            <CustomInputTwo
              placeholder={'Enter Your First Name'}
              value={firstName}
              setValue={setFirstName}
            />
          </View>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 12, color: '#000'}}>Last Name</Text>
          </View>
          <View style={{flex: 2}}>
            <CustomInputTwo
              placeholder={'Enter Your Last Name'}
              value={lastName}
              setValue={setLastName}
            />
          </View>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 12, color: '#000'}}>Location</Text>
          </View>
          <View style={{flex: 2}}>
            <CustomInputTwo
              placeholder={'Enter Your Email'}
              value={location}
              setValue={setLocation}
            />
          </View>
        </View>

        <View style={{marginTop: 15, alignItems: 'flex-end'}}>
          <Pressable
            onPress={() => updateUser(profileImg)}
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
    width: '60%',
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
