import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {useContext} from 'react';
import {MyContext} from '../Context/MyContext';
import {colors} from '../code/Configuration';

const HeaderComponent = ({navigation, activeScreen}) => {
  const {UserDetails} = useContext(MyContext);

  const getGreeting = username => {
    console.log('user' + username);
    const currentHour = new Date().getHours(); // Get the current hour
    let greeting = '';

    if (currentHour < 12) {
      greeting = `Good morning, ${username}!!`;
    } else if (currentHour < 18) {
      greeting = `Good afternoon, ${username}!!`;
    } else {
      greeting = `Good evening, ${username}!!`;
    }

    return greeting;
  };
  console.log(activeScreen);
  return (
    <View>
      <View
        style={{
          backgroundColor: colors.primaryColor,
          paddingTop: 10,
          paddingBottom: 10,
          height: 100,
          flexDirection: 'row',
          marginBottom: 0,
          paddingTop: 15,
        }}>
        <Image
          //source={require('../Assets/ACIlogo.png')}
          source={require('../code/Assets/ACIlogo.png')}
          style={{height: 60, width: 60, marginLeft: 5}}
        />

        <View style={{}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: 'white',
              marginLeft: 10,
              marginTop: 10,
            }}>
            {getGreeting(UserDetails?.username)}
          </Text>

          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: 'white',
              marginLeft: 20,
            }}>
            Eat Dry Fruits! Stay Healthy!
          </Text>
        </View>

        <View style={{position: 'absolute', right: 15, top: 25}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Dashboard')}
              style={{marginRight: 12}}>
              <Text
                style={
                  activeScreen == 'Home' ? styles.ActiveHeading : styles.heading
                }>
                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              style={{marginRight: 12}}>
              <Text style={ activeScreen == 'Cart' ? styles.ActiveHeading : styles.heading}>Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('MyOrders')}
              style={{marginRight: 12}}>
              <Text style={ activeScreen == 'MyOrders' ? styles.ActiveHeading :  styles.heading}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginRight: 12}}>
              <Text style={styles.heading}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    marginBottom: 10,
  },
  itemContainer: {
    marginLeft: 32,
    alignItems: 'center',
  },
  heading: {
    fontSize: 14,
    color: 'white',
    fontWeight: '400',
  },
  ActiveHeading: {
    fontSize: 14,
    color: 'yellow',
    fontWeight: '600',
  },
});
