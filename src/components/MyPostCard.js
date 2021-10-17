import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {AuthContext} from '../Auth/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';
const MyPostCard = ({item, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [Key, setDocId] = useState('');

  const deleteByID = async userKey => {
    console.log(userKey);
    await firestore()
      .collection('posts')
      .doc(userKey)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
    navigation.navigate('Profile');
  };
  const deletePost = async taskId => {
    var userkey;
    console.log(taskId);
    await firestore()
      .collection('posts')
      .where('postId', '==', taskId)
      .get()
      .then(querySnapshot => {
        console.log('Total task:', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.id);
          setDocId(documentSnapshot.id);
          userkey = documentSnapshot.id;
        });
      });
    deleteByID(userkey);
  };
  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={{...styles.cardTwo}}>
          <View style={{...styles.photoFrame}}>
            <Image source={{uri: item.imageUrl}} style={{...styles.photo}} />
          </View>
          <View style={{...styles.textFrame}}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View>
                <Text style={{color: '#3EB489', flex: 1}}>#{item.hashTag}</Text>
              </View>

              <View style={{flex: 2, alignItems: 'flex-end'}}>
                <Pressable
                  onPress={() => deletePost(item.postId)}
                  style={{...styles.buttonContainer}}>
                  <Text style={{color: '#fff'}}>Delete</Text>
                </Pressable>
              </View>
            </View>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                marginTop: 5,
                marginBottom: 5,
              }}>
              {item.title}
            </Text>
            <Text>{item.description}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default MyPostCard;

const styles = StyleSheet.create({
  cardTwo: {
    margin: 25,
    backgroundColor: '#fff',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 20,
  },
  buttonContainer: {
    backgroundColor: '#ff1a1a',
    width: '30%',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
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
    borderRadius: 15,
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
