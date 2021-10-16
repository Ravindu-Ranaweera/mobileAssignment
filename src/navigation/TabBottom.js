import 'react-native-gesture-handler';
import * as React from 'react';
import {Text, View, Animated, TouchableOpacity, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewsFeed from '../screens/NewsFeed';
import Profile from '../screens/Profile';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faUser} from '@fortawesome/free-solid-svg-icons';
import {useRef} from 'react';
import ProfileNav from './ProfileNav';
const Tab = createBottomTabNavigator();

const TabBottom = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        // Floating Tab Bar...
        style: {
          backgroundColor: '#000',
          // position: 'absolute',
          bottom: 10,
          marginHorizontal: 20,
          // Max Height...
          height: 60,
          borderRadius: 10,
          // Shadow...
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10,
          },
          paddingHorizontal: 20,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={NewsFeed}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                // centring Tab Button...
                position: 'absolute',
                top: 20,
              }}>
              <FontAwesomeIcon
                icon={faHome}
                size={20}
                color={focused ? '#0072ff' : '#fff'}
              />
            </View>
          ),
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
        })}
      />

      <Tab.Screen
        name={'ActionButton'}
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <TouchableOpacity>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#000',

                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginBottom: Platform.OS == 'android' ? 30 : 30,
                }}>
                <Image
                  source={require('../../assets/plus.png')}
                  style={{
                    width: 22,
                    height: 22,
                    tintColor: 'white',
                  }}></Image>
              </View>
            </TouchableOpacity>
          ),
        }}></Tab.Screen>

      <Tab.Screen
        name="Settings"
        component={ProfileNav}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                // centring Tab Button...
                position: 'absolute',
                top: 20,
              }}>
              <FontAwesomeIcon
                icon={faUser}
                size={18}
                color={focused ? '#0072ff' : 'white'}
              />
            </View>
          ),
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default TabBottom;
