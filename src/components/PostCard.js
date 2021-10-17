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
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {AuthContext} from '../Auth/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
const PostCard = ({item}) => {
  const [key, setKey] = useState('');
  const [singleUser, setSingleUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const list = [];
    let l;
    console.log('user');
    console.log(item.user);
    firestore()
      .collection('users')
      .where('userId', '==', item.user)
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
          list.push(documentSnapshot.data());
        });
        setSingleUser(list);
        setLoading(false);
      });
  };
  //   console.warn(postList);
  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={{...styles.card}}>
          <View style={{...styles.root}}>
            <Image
              source={{uri: singleUser[0].profileImg}}
              style={{...styles.logo}}
            />
            <Text
              style={{
                fontSize: 14,
                color: '#000',
                marginTop: 5,
                marginLeft: 10,
              }}>
              {singleUser[0].firstName + ' ' + singleUser[0].lastName}
            </Text>
          </View>
          <View style={{...styles.photoFrame}}>
            <Image source={{uri: item.imageUrl}} style={{...styles.photo}} />
          </View>
          <View style={{...styles.textFrame}}>
            <Text style={{color: '#3EB489'}}>#{item.hashTag}</Text>
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
            <Text></Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 25,
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
