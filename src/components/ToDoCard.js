import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircle, faTrash} from '@fortawesome/free-solid-svg-icons';
import firestore from '@react-native-firebase/firestore';

const ToDoCard = ({item, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [Key, setDocId] = useState('');
  // console.log(item);

  const deleteByID = async userKey => {
    console.log(userKey);
    await firestore()
      .collection('todo')
      .doc(userKey)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
    navigation.navigate('Target Board');
  };
  const updateByID = async changeKey => {
    // console.log(key);
    await firestore()
      .collection('todo')
      .doc(changeKey)
      .update({
        pogress: 'false',
      })
      .then(() => {
        console.log('User updated!');
      });
    navigation.navigate('Target Board');
  };
  const deleteTask = async taskId => {
    var userkey;
    console.log(taskId);
    await firestore()
      .collection('todo')
      .where('taskId', '==', taskId)
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
  const changeTask = async taskId => {
    console.log(taskId);
    var changeKey;
    await firestore()
      .collection('todo')
      .where('taskId', '==', taskId)
      .get()
      .then(querySnapshot => {
        console.log('Total task:', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          setDocId(documentSnapshot.id);
          changeKey = documentSnapshot.id;
        });
      });
    updateByID(changeKey);
  };
  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={{...styles.card}}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={{flex: 2, margin: 10, marginLeft: 25}}>
              <Pressable
                onPress={() => deleteTask(item.taskId)}
                style={{...styles.buttonContainerTwo}}>
                <FontAwesomeIcon icon={faTrash} style={{color: '#ff1a1a'}} />
              </Pressable>
            </View>
            {item.pogress == 'true' ? (
              <View style={{flex: 2, margin: 10}}>
                <Pressable
                  onPress={() => changeTask(item.taskId)}
                  style={{...styles.buttonContainerThree}}>
                  <Text style={{color: 'white'}}>Mark as Complete</Text>
                </Pressable>
              </View>
            ) : (
              <Text></Text>
            )}
          </View>

          <View style={{...styles.textFrame}}>
            <View style={{}}>
              <View>
                <View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        color: '#3EB489',
                        flex: 1,
                        fontSize: 18,
                        textTransform: 'capitalize',
                      }}>
                      {item.title}
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    marginTop: 5,
                    marginBottom: 5,
                  }}>
                  {item.description}
                </Text>
                {item.pogress == 'true' ? (
                  <View
                    style={{display: 'flex', flexDirection: 'row', margin: 10}}>
                    <FontAwesomeIcon
                      icon={faCircle}
                      style={{color: '#0072ff'}}
                    />
                    <Text> In Pogress</Text>
                  </View>
                ) : (
                  <View
                    style={{display: 'flex', flexDirection: 'row', margin: 10}}>
                    <FontAwesomeIcon
                      icon={faCircle}
                      style={{color: '#3EB489'}}
                    />
                    <Text> Completed</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ToDoCard;

const styles = StyleSheet.create({
  card: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    backgroundColor: '#fff',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 20,
  },
  textFrame: {
    height: 'auto',
    paddingLeft: 30,
    paddingRight: 30,
  },

  buttonContainerTwo: {
    // backgroundColor: '#0072ff',
    marginTop: 10,
    marginRight: 20,
    width: '10%',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContainerThree: {
    backgroundColor: '#0072ff',
    marginTop: 10,
    marginRight: 20,
    width: '100%',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
});
