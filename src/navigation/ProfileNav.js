import 'react-native-gesture-handler';
import * as React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import CreatePost from '../screens/CreatePost';

const Stack = createStackNavigator();
const ProfileNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 16,
        },
      }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
    </Stack.Navigator>
  );
};

export default ProfileNav;
