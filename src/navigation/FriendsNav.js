import 'react-native-gesture-handler';
import * as React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import CreatePost from '../screens/CreatePost';
import Friends from '../screens/Friends';

const Stack = createStackNavigator();
const FriendsNav = () => {
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
      <Stack.Screen
        name="Friend List"
        component={Friends}
        options={{headerLeft: null}}
      />
    </Stack.Navigator>
  );
};

export default FriendsNav;
