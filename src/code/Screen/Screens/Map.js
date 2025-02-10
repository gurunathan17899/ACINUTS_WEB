import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  PermissionsAndroid,
  Platform,TouchableOpacity
} from 'react-native';
//import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { getCurrentLocation } from '../Network/API';
import axios from 'axios';


const Map = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'd4ce3761c83f43dfa0b45aa1c280bda7';
  const BASE_URL = 'https://api.opencagedata.com/geocode/v1/json';

  const getAddressFromLatLong = async (latitude, longitude) => {
    const apiKey = 'AIzaSyAF84qEmdKi__yix6_MubEL_H3l8Ycx5bM';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.data.status === 'OK') {
        const formattedAddress = response.data.results[0].formatted_address;
        setAddress(formattedAddress);
      } else {
        setError('No results found');
      }
    } catch (err) {
      setError('Error fetching address');
    }
  };
  const getCurrentLocationDetails = (lat,lng)=>{
    //navigation.navigate('Buynow')
    console.log('here')
    getCurrentLocation(lat,lng)
    .then(res => {
      console.log(
        'Add item cart list response',
        JSON.stringify(res),
      );
      // if (res?.data.issuccess == true) {
      //   showMessage({
      //     message: "Item Added Successfully.",
      //     //description: "Password must be at least 4 characters long.",
      //     type: "success",
      //   });
      // } else if(res?.data.issuccess  == false){
      //   console.log("res"+JSON.stringify(res))
      //   showMessage({
      //     message: res.data.message,
      //     //description: "Password must be at least 4 characters long.",
      //     type: "danger",
      //   });
      //}
    })
    .catch(error => {
          console.error('Error occurred:', error);
      console.log(
        'problem in fetch data for AddItemToCartList ',
      );
      showMessage({
        message: "Item Not Added. Please try again later.",
        //description: "Password must be at least 4 characters long.",
        type: "danger",
      });
    });
  }

  useEffect(() => {
    const getCurrentLocation = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission denied');
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn(err);
          setLoading(false);
          return;
        }
      }

      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          console.log("current lat:long:"+ latitude+" "+longitude)
          // setLocation({
          //   latitude,
          //   longitude,
          //   latitudeDelta: 0.01,
          //   longitudeDelta: 0.01,
          // });
          getAddressFromLatLong(37.421998333333335, -122.084);
          setLoading(false);
        },
        error => {
          Alert.alert(
            'Error',
            `Failed to get your location: ${error.message}. Make sure your location is enabled.`,
          );
          setError('Failed to get location');
          setLoading(false);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    };

    getCurrentLocation();
  }, []);


  // const getGeocode = (latitude, longitude) => {
  //   Geocoder.geocodePosition({ lat: 40.7809261, lng: -73.9637594 })
  //     .then(res => {
  //       //setAddress(res[0].formattedAddress);
  //       console.log("address current:"+ JSON.stringify(res))
  //     })
  //     .catch(err => console.log(err));
  // };

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        //`${BASE_URL}?q=${lat},${lng}&key=${API_KEY}&limit=1`,        
        `https://api.opencagedata.com/geocode/v1/json?q=11.392300,79.703003&key=d4ce3761c83f43dfa0b45aa1c280bda7&limit=1`
      );
      const data = await response.json();
      console.log("data add:"+JSON.stringify(data))

      if (data.results.length > 0) {
        const result = data.results[0];
        setAddress(result.formatted);
        console.log('res', result);
        setError(null);
      } else {
        setAddress('No address found');
      }
    } catch (err) {
      setError('An error occurred');
      console.error(err);
    }
  };
  const handleMapPress = event => {
    const {coordinate} = event.nativeEvent;
    fetchAddress(coordinate.latitude, coordinate.longitude);
    setLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        
        {/*<MapView
          style={styles.map}
          showsUserLocation={true}
          // onPress={handleMapPress}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker coordinate={location} />
        </MapView>
        */}
        <Text>Address: {address}</Text>       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    height: 500,
    marginBottom: 10,
  },
});

export default Map;
