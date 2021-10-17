import 'react-native-gesture-handler';
import * as React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import CreatePost from '../screens/CreatePost';
import ToDo from '../screens/ToDo';
import CreateToDo from '../screens/CreateToDo';
import ToDoList from '../screens/ToDoList';

const Stack = createStackNavigator();
const ToDoNav = () => {
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
        name="Target Board"
        component={ToDo}
        options={{headerLeft: null}}
      />
      <Stack.Screen name="CreateToDo" component={CreateToDo} />
      <Stack.Screen name="View To Do" component={ToDoList} />
    </Stack.Navigator>
  );
};

export default ToDoNav;
