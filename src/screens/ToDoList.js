import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToDoCard from '../components/ToDoCard';
const ToDoList = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [key, setKey] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      let data = JSON.parse(value);
      const list = [];
      // console.log(data.user);
      firestore()
        .collection('todo')
        .where('user', '==', data.user.uid)
        .get()
        .then(querySnapshot => {
          console.log('Total To Do Card:', querySnapshot.size);

          querySnapshot.forEach(documentSnapshot => {
            console.log(
              'Card id: ',
              documentSnapshot.id,
              documentSnapshot.data(),
            );
            setKey(documentSnapshot.id);
            list.push(documentSnapshot.data());
          });
          setTodoList(list);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{backgroundColor: '#fff'}}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            style={{backgroundColor: '#fff', margin: 10}}
            data={todoList}
            renderItem={({item}) => (
              <ToDoCard item={item} navigation={navigation} />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ToDoList;

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
