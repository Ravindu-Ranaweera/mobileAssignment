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
import {
  faCircle,
  faMapMarkedAlt,
  faMailBulk,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
const FriendCard = ({item, navigation}) => {
  const [loading, setLoading] = useState(false);
  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={{...styles.cardTwo}}>
          <View style={{...styles.photoFrame}}>
            <Image source={{uri: item.profileImg}} style={{...styles.logo}} />
          </View>
          <View style={{...styles.textFrame}}>
            <View style={{}}>
              <View style={{display: 'flex', flexDirection: 'row', margin: 5}}>
                <FontAwesomeIcon
                  icon={faUserShield}
                  style={{color: '#3EB489'}}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 15,
                    textTransform: 'capitalize',
                    color: '#000',
                  }}>
                  {item.firstName + ' ' + item.lastName}
                </Text>
              </View>
              <View style={{display: 'flex', flexDirection: 'row', margin: 5}}>
                <FontAwesomeIcon icon={faMailBulk} style={{color: '#3EB489'}} />
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 15,
                  }}>
                  {item.email}
                </Text>
              </View>
              <View style={{display: 'flex', flexDirection: 'row', margin: 5}}>
                <FontAwesomeIcon
                  icon={faMapMarkedAlt}
                  style={{color: '#3EB489'}}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 15,
                    textTransform: 'capitalize',
                  }}>
                  {item.location}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default FriendCard;

const styles = StyleSheet.create({
  cardTwo: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    backgroundColor: '#fff',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  photoFrame: {
    height: 100,
    overflow: 'hidden',
    borderRadius: 15,
  },
  textFrame: {
    height: 'auto',
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 10,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#fff',
    marginLeft: 10,
    marginTop: 15,
  },
});
