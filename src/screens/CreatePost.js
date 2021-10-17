import React, {useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import CustomInputTwo from '../components/CustomInputTwo';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePost = ({navigation}) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [hashtag, setHashtag] = React.useState('');
  const [createdAt, setCreatedAt] = React.useState(new Date());
  const [imagePath, setImagePath] = useState(
    'https://cdn-icons-png.flaticon.com/512/1829/1829500.png',
  );

  function uploadByGallery() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImagePath(image.path);
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
  const uploadPost = async path => {
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
    var value = await AsyncStorage.getItem('username');
    const data = JSON.parse(value);
    const pId = uuid.v4();
    firestore()
      .collection('posts')
      .add({
        user: data.user.uid,
        title: title,
        description: description,
        hashTag: hashtag,
        createdAt: createdAt,
        imageUrl: url,
        postId: pId,
      })
      .then(() => {
        console.log('Post added!');
        setHashtag('');
        setCreatedAt('');
        setTitle('');
        setDescription('');
        setImagePath(
          'https://api-private.atlassian.com/users/8f525203adb5093c5954b43a5b6420c2/avatar',
        );
      });
    navigation.navigate('Home');
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
              uri: imagePath,
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
        <View>
          <View>
            <Text style={{fontSize: 12, color: '#000'}}>Post Title</Text>
          </View>
          <View>
            <CustomInput
              placeholder={'Enter Your Title'}
              value={title}
              setValue={setTitle}
            />
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <View>
            <Text style={{fontSize: 12, color: '#000'}}>Description</Text>
          </View>
          <View>
            <TextInput
              placeholder={'Enter your Idea'}
              multiline={true}
              numberOfLines={4}
              onChangeText={setDescription}
              value={description}
            />
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <View>
            <Text style={{fontSize: 12, color: '#000'}}>Hashtag #</Text>
          </View>
          <View>
            <CustomInputTwo
              placeholder={'Enter Your Email'}
              value={hashtag}
              setValue={setHashtag}
            />
          </View>
        </View>

        <View style={{marginTop: 15, alignItems: 'flex-end'}}>
          <Pressable
            onPress={() => uploadPost(imagePath)}
            style={{...styles.buttonContainer}}>
            <Text style={{fontSize: 15, color: '#fff'}}>Post</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CreatePost;

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
    width: '30%',
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
