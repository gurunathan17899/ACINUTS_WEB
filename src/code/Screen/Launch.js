import {StyleSheet, Image, View} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation, useRoute} from '@react-navigation/native';
//import { MyContext } from '../Context/MyContext';
//import { useContext } from 'react';
//import { GenerateBearerToken } from '../Network/API';

const Launch = ({}) => {
  const navigation = useNavigation();
  // const {setUserDetails,setToken} = useContext(MyContext);

  useEffect(() => {
    setTimeout(() => {
      // retrieveData()
      navigation.navigate('Dashboard');
    }, 1000);
  }, []);

  useFocusEffect(() => {
    const routes = navigation.getState().routes;
    const currentRoute = routes[routes.length - 1];
    const previousRoute = routes[routes.length - 2];
    console.log('Current Route:', currentRoute.name);
    if (previousRoute) {
      console.log('Previous Route:', previousRoute.name);
    }
  });

  const retrieveData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('ACINUTS_USER_DETAILS');
      if (storedData !== null) {
        console.log('Data retrieval was successful');
        const data = JSON.parse(storedData);
        console.log('login data:' + JSON.stringify(data));
        GenerateBearerToken(data.mobileno)
          .then(res => {
            console.log('Generated token', JSON.stringify(res));
            if (res.data.issuccess == true) {
              setToken(res.data.token);
              navigation.navigate('Dashboard', {screen: 'Home'});
            } else {
              showMessage({
                message: 'Something went wrong. Please try again later.',
                //description: "Password must be at least 4 characters long.",
                type: 'danger',
              });
            }
          })
          .catch(error => {
            console.error('Error occurred:', error);
            console.log('problem in fetch data for getProductItemDetails ');
          });
        setUserDetails(data);
      } else {
        console.log('No Data found');
        //setData("No data found");
        navigation.navigate('Signup');
      }
    } catch (error) {
      // Error retrieving data
      console.log('No Data found with error');
      console.log(error);
    }
  };

  return (
    <View
      style={{
        //flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}>
      <Image
        source={require('../Assets/ACIlogo.png')}
        style={{
          height: 300,
          width: 300,
          borderRadius: 100,
        }}
      />
    </View>
  );
};

export default Launch;

const styles = StyleSheet.create({});
