import 'react-native-gesture-handler';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import Home from '../screens/Home';
import SignUp from '../screens/SignUp';
import TabBottom from './TabBottom';

const Stack = createStackNavigator();
const HomeNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        Options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Login" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen
        name="Feeds"
        component={TabBottom}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeNav;
