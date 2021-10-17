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

const ToDo = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{...StyleSheet.absoluteFill}}>
        <Image
          source={require('../../assets/task.jpg')}
          style={{flex: 1, height: null, width: null}}
        />
      </View>
      <View style={{...styles.root}}>
        <View style={{...styles.card}}>
          <View style={{marginBottom: 10}}>
            <Text style={{color: '#3EB489', fontWeight: 'bold', fontSize: 30}}>
              The board is just the beginning
            </Text>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={{color: 'black', fontSize: 16}}>
              Lists and cards are the building blocks of your target on a Target
              board.
            </Text>
          </View>
          {/* <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 12, color: '#000'}}>Title</Text>
            </View>
            <View style={{flex: 2}}>
              <CustomInputTwo
                placeholder={'Enter Your Title'}
                value={title}
                setValue={setTitle}
              />
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 12, color: '#000'}}>Predict Task</Text>
            </View>
            <View style={{flex: 2}}>
              <CustomInputTwo
                placeholder={'Enter Your Task'}
                value={title}
                setValue={setTitle}
              />
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 12, color: '#000'}}>Time Period</Text>
            </View>
            <View style={{flex: 2}}>
              <CustomInputTwo
                placeholder={'Enter Your Period'}
                value={title}
                setValue={setTitle}
              />
            </View>
          </View> */}
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Pressable
                onPress={() => navigation.navigate('CreateToDo')}
                style={{...styles.buttonContainerTwo}}>
                <Text style={{fontSize: 15, color: '#fff'}}>Set Plan</Text>
              </Pressable>
            </View>
            <View style={{flex: 1}}>
              <Pressable
                onPress={() => navigation.navigate('View To Do')}
                style={{...styles.buttonContainerThree}}>
                <Text style={{fontSize: 15, color: '#000'}}>View Plans</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ToDo;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  root: {
    height: 0.4 * height,
    borderBottomEndRadius: 85,
  },
  card: {
    padding: 10,
    margin: 35,
    borderRadius: 20,
  },
  buttonContainerTwo: {
    backgroundColor: '#0072ff',
    borderColor: '#0072ff',
    borderWidth: 2,
    marginTop: 10,
    width: '60%',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContainerThree: {
    backgroundColor: '#fff',
    borderColor: '#0072ff',
    borderWidth: 2,
    marginTop: 10,
    width: '60%',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
});
