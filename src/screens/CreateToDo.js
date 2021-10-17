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
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../components/CustomInput';
import uuid from 'react-native-uuid';

const CreateToDo = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pogress, setPogress] = useState('true');

  const createPost = async () => {
    var value = await AsyncStorage.getItem('username');
    const data = JSON.parse(value);
    const tId = uuid.v4();
    firestore()
      .collection('todo')

      .add({
        taskId: tId,
        user: data.user.uid,
        title: title,
        description: description,
        pogress: pogress,
      })
      .then(() => {
        console.log('Post added!');
        setTitle('');
        setDescription('');
        setPogress(true);
      });
    navigation.navigate('Target Board');
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{...styles.root}}>
        <View style={{fontSize: 12, color: '#000'}}>
          <View>
            <Text style={{fontSize: 12, color: '#000'}}>Title</Text>
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
              style={{
                borderColor: '#8c8c8c',
                borderBottomWidth: 2,
                padding: 10,
              }}
              placeholder={'Enter your Idea'}
              multiline={true}
              numberOfLines={2}
              onChangeText={setDescription}
              value={description}
            />
          </View>
        </View>

        <View style={{marginTop: 15, alignItems: 'flex-end'}}>
          <Pressable
            onPress={() => createPost()}
            style={{...styles.buttonContainer}}>
            <Text style={{fontSize: 15, color: '#fff'}}>Post</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CreateToDo;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  root: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingVertical: 20,
    marginTop: 20,
    marginHorizontal: 20,
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 20,
  },
  buttonContainer: {
    backgroundColor: '#0072ff',
    marginTop: 10,
    width: '30%',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
});
