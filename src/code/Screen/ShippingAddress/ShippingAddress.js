import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  PermissionsAndroid,Alert,Linking,
  Platform
} from 'react-native';
import React, {useState, useMemo} from 'react';
import {
  primaryFontfamily,
  secondaryFontfamily,
  colors,
} from '../../Configuration';
import {showMessage} from 'react-native-flash-message';
import {useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {TextInput} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import { AddShippingAddress, UpdateShippingAddress, getAddressBasedonPincode } from '../../Network/API';
import { MyContext } from '../../Context/MyContext';
import { useContext } from 'react';
import DeviceInfo from 'react-native-device-info'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ShippingAddress = ({navigation,route}) => {


  const address = route.params?.item;
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [Recivername, setRecivername] = useState('');
  const [houseno, setHouseno] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [village, setVillage] = useState('');
  const [State,setState] = useState("")
  const [District,setDistrict] = useState("")
  const [pincode, setPincode] = useState(0);
  const [landmark, setLandmark] = useState('');
  
  
  const [selectedId, setSelectedId] = useState('1');
  const {setUserShippingAddress,UserDetails,Token} = useContext(MyContext);
  const [contactno, setContactno] = useState("");

  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'HOME',
        value: 'option1',
        labelStyle: {
          color: 'black',
          fontSize: 16,
          fontFamily: primaryFontfamily,
        },
      },
      {
        id: '2',
        label: 'OFFICE',
        value: 'option2',
        labelStyle: {
          color: 'black',
          fontSize: 16,
          fontFamily: primaryFontfamily,
        },
      },
    ],
    [],
  );


  const SaveShippingAddress=()=>{
    
    if(address?.Address_Code != undefined){
      console.log("updating address")
      UpdateShippingAddress(Token,address.Address_Code,houseno,street,city,State,pincode,landmark,contactno,Recivername,0,District)
      .then(res => {      
        if (res.issuccess == true) {
          showMessage({
            message: 'Address Updated Successfully',
            autoHide: 1000,
            type: 'success',
          });
          //navigation.navigate('Home');
          setUserShippingAddress([]);
          navigation.goBack()
        } else {
          showMessage({
            message: 'Address not updated. Please try again later.',
            autoHide: 1000,
            type: 'danger',
          });
        }
      })
      .catch(error => {
            console.error('Error occurred:', error);
        console.log(
          'problem in fetch data for getProductItemDetails ',
        );
      });
    }else{
    AddShippingAddress(Token,houseno,street,city,State,pincode,landmark,contactno,Recivername,0,District)
    .then(res => {
      console.log(
        'Save  shipping address',
        JSON.stringify(res),
      );
      if (res.issuccess == true) {
        showMessage({
          message: 'Address added Successfully.',
          autoHide: 1000,
          type: 'success',
        });
        //navigation.navigate('Home');
        setUserShippingAddress([]);
        navigation.goBack()
      } else {
        showMessage({
          message: 'Address not added. Please try again later.',
          autoHide: 1000,
          type: 'danger',
        });
      }
    })
    .catch(error => {
          console.error('Error occurred:', error);
      console.log(
        'problem in fetch data for getProductItemDetails ',
      );
    });
  }
  
  }

  useEffect(() => {    
    //console.log("ccurr:"+JSON.stringify(address))
    if(address?.city != undefined){
      console.log("here updatedchange")
      setRecivername(address.user_name)
      setCity(address?.city != undefined? address?.city:address?.village)     
      setHouseno(address.house_no)
      setStreet(address.street)
      setLandmark(address.landmark)
      setPincode(address.pincode)      
      setState(address.state);          
      setDistrict(address?.District)
      setContactno(address.Contact_NO)
    }
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [navigation]);

  const AddressBasedonPincode=(pincode)=>{
    setPincode(pincode)    
    getAddressBasedonPincode(pincode)
    .then(res => {
      console.log(
        'address detail',
        JSON.stringify(res.data[0].PostOffice[0].District)
      );      
      if (res.data.length>0) {
        setState(`${res.data[0].PostOffice[0].State}`)
        setDistrict(res.data[0].PostOffice[0].District)
        //setDistrict(res.data[0].PostOffice[0].District)
        
      }
    })
    .catch(error => {
          console.error('Error occurred:', error);
      console.log(
        'problem in fetch data for getAddressBasedonPincode ',
      );
    });
  
  }

  const AddAddress_validation = () => {
    if (Recivername === '') {
      showMessage({
        message: 'Please enter Customer name',
        autoHide: 1000,
        type: 'danger',
      });
    }else if (contactno <6000000000) {
      showMessage({
        message: 'Invalid Mobile Number',
        description: 'Please enter a 10-digit mobile number.',
        type: 'danger',
      });
    }  else if (houseno === '') {
      showMessage({
        message: 'Please enter house number',
        autoHide: 1000,
        type: 'danger',
      });
    } else if (street === '') {
      showMessage({
        message: 'Please enter street name',
        autoHide: 1000,
        type: 'danger',
      });
    } else if (city === '') {
      showMessage({
        message: 'Please enter city name',
        autoHide: 1000,
        type: 'danger',
      });
    } else if (landmark === '') {
      showMessage({
        message: 'Please enter landmark',
        autoHide: 1000,
        type: 'danger',
      });
    } else if (pincode === '') {
      showMessage({
        message: 'Please enter pincode',
        autoHide: 1000,
        type: 'danger',
      });
    } else if (!/^[a-zA-Z0-9]{6}$/.test(pincode)) {
      showMessage({
        message: 'Invalid Pincode',
        description: 'Please enter a valid 6-digit pincode.',
        type: 'danger',
      });
    }  else if (State === '') {
      showMessage({
        message: 'Please enter State - District',
        autoHide: 1000,
        type: 'danger',
      });
    }else {
      SaveShippingAddress()
    }
  };

  useFocusEffect(    
    React.useCallback(() => {
      navigation.setOptions({
        headerStyle: {
          borderBottomWidth: 0,
          alignItems: 'center',
          shadowColor: Platform.OS === 'lightgrey',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowRadius: 3,
          shadowOpacity: 1.0,
          elevation: 3,
          backgroundColor: colors.primaryColor,
        },
        headerTransparent: false,
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerLeft: () => Platform.OS =="ios" &&(
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginRight: 10}}>
              <FontAwesome name="angle-left" size={33} color="white" />
            </TouchableOpacity>
          </View>
        ),

        headerTitle: () => (
          <Text
            style={{
              fontWeight: '600',
              color: 'white',
              fontSize: 20,
              fontFamily: primaryFontfamily,
            }}>
            Shipping Address
          </Text>
        ),
      });

      if( UserDetails.mobileno.length == 13){
          setContactno(UserDetails.mobileno.slice(-10))
      }else{
        setContactno(UserDetails.mobileno)
      }
       
        
    }, [navigation]),
  );

  const getCurrentLocation = async () => {
    // Check if location services are enabled
    console.log("get currnt loc")
    const isLocationEnabled = await DeviceInfo.isLocationEnabled();
  
    if (!isLocationEnabled) {
      Alert.alert(
        'Enable Location Services',
        'Your location services are disabled. Please enable them to continue.',
        [
          {
            text: 'Okay',
            style: 'cancel',
          },
          {
      //       text: 'Open Settings',
      //       onPress: () => {
      //         if (Platform.OS === 'ios') {
      //           Linking.openURL('App-Prefs:root=LOCATION_SERVICES'); // iOS only, may not work on all versions
      //         } else {
      //           Linking.openSettings(); // Open settings for Android
      //         }
      //       },
      //     },
      //   ],
      // );
      text: 'Turn On',
      onPress: () => {
        if (Platform.OS === 'android') {
          Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
        } else {
          Linking.openSettings();
        }
      },
    },
  ]
);
      return;
    }
  
    // Request location permission
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
          
          return;
        }
      } catch (err) {
        console.warn(err);
        //setLoading(false);
        return;
      }
    }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log("current lat:long:"+ latitude+" "+longitude)
        getAddressFromCoordinates(latitude,longitude)        
      },
      error => {
        Alert.alert(
          'Error',
          `Failed to get your location: ${error.message}. Make sure your location is enabled.`,
        );        
      },
      // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    console.log("get coordi loc")
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
      console.log("displayh name:"+JSON.stringify(data))
      //return data.display_name;
      setCity(data.address.town)
      setStreet(data.address.road)
      //setCity(data.address.city)
      setCity(data.address?.village != undefined? data.address?.village:data.address?.city)
      setPincode(data.address.postcode)
      setState(`${data.address.state}`)
      setDistrict(`${data.address?.District != undefined ? data.address?.District: data.address?.state_district}`)      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <KeyboardAwareScrollView
          extraScrollHeight={Platform.OS === 'ios' ? 95 : 0}
          contentContainerStyle={styles.subContainer}
          disableScrollViewPanResponder
          keyboardOpeningTime={0.05}>
          {address?.Address_Code == undefined && (
            <TouchableOpacity
              onPress={() => getCurrentLocation()}
              style={{
                flexDirection: 'row',
                marginTop: 20,
                //marginBottom: 5,
                marginLeft: 10,
                marginRight: 10,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                backgroundColor: 'white',
                padding: 10,
              }}>
              <MaterialIcons
                name="gps-fixed"
                size={20}
                color={colors.primaryColor}
              />
              <Text
                style={{
                  fontFamily: secondaryFontfamily,
                  marginLeft: 10,
                  color: 'black',
                }}>
                Use My Current Location
              </Text>
            </TouchableOpacity>
          )}
          <View style={{width: '100%'}}>
            <View style={styles.heading}>
              <Text style={styles.headingtext}>Contact Details</Text>
            </View>
          </View>

          <View style={{width: '100%', alignItems: 'center', marginTop: 10}}>
            <TextInput
              label="Customer name"
              value={Recivername}
              maxLength={50}
              onChangeText={text => setRecivername(text)}
              contentStyle={{fontFamily: primaryFontfamily, fontSize: 14}}
              style={{
                width: '90%',
                color: colors.primaryColor,
                backgroundColor: 'white',
                fontSize: 12,
              }}
              outlineColor={colors.primaryColor}
              activeOutlineColor={colors.primaryColor}
              mode="outlined"
            />
          </View>

          <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
            <TextInput
              label="Contact Number"
              value={contactno}
              keyboardType="numeric"
              maxLength={10}
              onChangeText={text => setContactno(text)}
              contentStyle={{fontFamily: primaryFontfamily, fontSize: 14}}
              style={{
                width: '90%',
                color: colors.primaryColor,
                backgroundColor: 'white',
                fontSize: 12,
              }}
              outlineColor={colors.primaryColor}
              activeOutlineColor={colors.primaryColor}
              mode="outlined"
            />
          </View>

          <View style={styles.heading}>
            <Text style={styles.headingtext}>Address Details</Text>
          </View>

          <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
            <TextInput
              label="House no"
              value={houseno}
              maxLength={50}
              onChangeText={text => setHouseno(text)}
              contentStyle={{fontFamily: primaryFontfamily, fontSize: 14}}
              style={{
                width: '90%',
                color: colors.primaryColor,
                backgroundColor: 'white',
                fontSize: 12,
              }}
              outlineColor={colors.primaryColor}
              activeOutlineColor={colors.primaryColor}
              mode="outlined"
            />
          </View>

          <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
            <TextInput
              label="Street"
              value={street}
              maxLength={50}
              onChangeText={text => setStreet(text)}
              contentStyle={{fontFamily: primaryFontfamily, fontSize: 14}}
              style={{
                width: '90%',
                color: colors.primaryColor,
                backgroundColor: 'white',
                fontSize: 12,
              }}
              outlineColor={colors.primaryColor}
              activeOutlineColor={colors.primaryColor}
              mode="outlined"
            />
          </View>

          <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
            <TextInput
              label="City/Village"
              value={city}
              maxLength={50}
              onChangeText={text => setCity(text)}
              contentStyle={{fontFamily: primaryFontfamily, fontSize: 14}}
              style={{
                width: '90%',
                color: colors.primaryColor,
                backgroundColor: 'white',
                fontFamily: secondaryFontfamily,
                fontSize: 12,
              }}
              outlineColor={colors.primaryColor}
              activeOutlineColor={colors.primaryColor}
              mode="outlined"
            />
          </View>

          <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
            <TextInput
              label="Landmark"
              value={landmark}
              maxLength={50}
              onChangeText={text => setLandmark(text)}
              contentStyle={{fontFamily: primaryFontfamily, fontSize: 14}}
              style={{
                width: '90%',
                color: colors.primaryColor,
                backgroundColor: 'white',
                fontSize: 12,
              }}
              outlineColor={colors.primaryColor}
              activeOutlineColor={colors.primaryColor}
              mode="outlined"
            />
          </View>

          <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
            <TextInput
              label="Pincode"
              value={pincode}
              maxLength={6}
              keyboardType="numeric"
              onChangeText={text =>
                text.length == 6
                  ? AddressBasedonPincode(text)
                  : setPincode(text)
              }
              contentStyle={{fontFamily: primaryFontfamily, fontSize: 14}}
              style={{
                width: '90%',
                color: colors.primaryColor,
                backgroundColor: 'white',
                fontSize: 12,
              }}
              outlineColor={colors.primaryColor}
              activeOutlineColor={colors.primaryColor}
              mode="outlined"
            />
          </View>

          <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
            <TextInput
              label="District"
              value={District}
              keyboardType="default"
              maxLength={50}
              onChangeText={text => setDistrict(text)}
              contentStyle={{fontFamily: primaryFontfamily, fontSize: 14}}
              style={{
                width: '90%',
                color: colors.primaryColor,
                backgroundColor: 'white',
                fontSize: 12,
              }}
              outlineColor={colors.primaryColor}
              activeOutlineColor={colors.primaryColor}
              mode="outlined"
            />
          </View>

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: 20,
              //marginBottom: 100,
            }}>
            <TextInput
              label="State"
              value={State}
              keyboardType="default"
              maxLength={50}
              onChangeText={text => setState(text)}
              contentStyle={{fontFamily: primaryFontfamily, fontSize: 14}}
              style={{
                width: '90%',
                color: colors.primaryColor,
                backgroundColor: 'white',
                fontSize: 12,
              }}
              outlineColor={colors.primaryColor}
              activeOutlineColor={colors.primaryColor}
              mode="outlined"
            />
          </View>
        </KeyboardAwareScrollView>

        <View
          style={{
            alignItems: 'center',
            //backgroundColor:'orange',
            position: 'absolute',
            bottom: 10,
            width: '100%',
            height: 50,
          }}>
          <TouchableOpacity
            onPress={() => AddAddress_validation()}
            style={{
              height: 40,
              width: '90%',
              backgroundColor: colors.primaryColor,
              marginTop: 10,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: secondaryFontfamily,
                fontSize: 14,
              }}>
              Save Address
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ShippingAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textinput: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    width: '90%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  heading: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  headingtext: {
    color: colors.primaryColor,
    fontFamily: secondaryFontfamily,
    fontSize: 14,
  },
  subContainer: {
    flex: 1,
    //height:'90%',
  },
});
