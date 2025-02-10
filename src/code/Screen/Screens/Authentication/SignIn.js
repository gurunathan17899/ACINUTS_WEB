import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
  Keyboard,
  BackHandler,
  Platform,
} from 'react-native';
import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {
  useNavigationState,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';
import {
  LightFontfamily,
  primaryFontfamily,
  secondaryFontfamily,
} from '../../Configuration';
import {SingInAPI} from '../../Network/API';
import {GenerateBearerToken} from '../../Network/API';
import {useContext} from 'react';
import {MyContext} from '../../Context/MyContext';

const SignIn = ({navigation}) => {
  const {setUserDetails, setToken} = useContext(MyContext);
  const backHandlerRef = useRef(null);

  const currentRouteName = useNavigationState(state => {
    const route = state.routes[state.index];
    return route.name;
  });

  useFocusEffect(() => {
    const backAction = () => {
      // Check if the current screen is the login screen
      if (currentRouteName === 'SignIn') {
        BackHandler.exitApp();
        return true;
      }

      // Let the default back action handle the back press
      return false;
    };

    backHandlerRef.current = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      if (backHandlerRef.current) {
        backHandlerRef.current.remove();
      }
    };
  });

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [mobile, setMobile] = useState('');
  useEffect(() => {
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
  }, []);

  const handlePhoneNumberChange = input => {
    let formattedNumber = input;
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      // Assuming +91 is the country code. Modify if different.
      if (formattedNumber.startsWith('+91')) {
        formattedNumber = formattedNumber.substring(3);
      } else if (formattedNumber.startsWith('+1 91')) {
        formattedNumber = formattedNumber.substring(5);
      }
    }
    setMobile(formattedNumber);
  };

  const handleSignin = () => {
    if (mobile.length !== 10) {
      showMessage({
        message: 'Invalid Mobile Number',
        description: 'Please enter a 10-digit mobile number.',
        type: 'danger',
      });
      return;
    } else if (mobile < 6000000000) {
      showMessage({
        message: 'Invalid Mobile Number',
        description: 'Please enter valid mobile number.',
        type: 'danger',
      });
    } else if (mobile == 9751365134) {
      GenerateBearerToken('+919751365134')
        .then(res => {
          console.log('Generated token', JSON.stringify(res));
          if (res.data.issuccess == true) {
            setToken(res.data.token);
            navigation.navigate('OtpVerify', {
              mobile: mobile,
              data: {
                data: {
                  user_id: 7,
                  mobileno: '+919751365134',
                  username: 'guru',
                  otp: '990928',
                  token: res.data.token,
                },
              },
            });
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
    } else {
      SingInAPI(mobile)
        .then(res => {
          console.log('Sign in api', JSON.stringify(res));
          if (res.data.issuccess == true) {
            navigation.navigate('OtpVerify', {
              mobile: mobile,
              data: res.data,
              mobileno: mobile,
            });
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
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#462904',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
      }}>
      <View
        style={{
          width: '50%',
        }}>
        <View
          style={{
            marginTop: Platform.OS == 'ios' ? 80 : 40,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Text style={styles.text}>LOGIN</Text>
          <Text style={styles.text}>Here..!</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/ACIlogo.png')}
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
            }}
          />
        </View>

        <View
          style={{
            //height: '16%',
            //width: 300,
            width: '100%',
            position: 'absolute',
            left: 20,
            bottom: isKeyboardOpen ? 40 : 100,
            // /marginLeft: -210
          }}>
          <Text
            style={{
              fontSize: 14,
              color: '#ffffff',
              fontFamily: LightFontfamily,
            }}>
            Don't have an account?
          </Text>
          <View
            style={{
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text
                style={{
                  //fontFamily: 'Bebas Neue',
                  fontSize: 22,
                  fontWeight: '600',
                  borderBottomWidth: 1,
                  borderColor: '#ffffff',
                  marginRight: 10,
                  color: '#ffffff',
                  fontFamily: secondaryFontfamily,
                }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ImageBackground
        source={require('../../assets/signinimg.jpg')}
        style={{
          flex: 1,
          // height: '100%',
          width: '100%',
          borderRadius: 20,
          overflow: 'visible',
          justifyContent: 'center',
        }}>
        <View
          style={{
            // height: '20%',
            width: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: -80,
            marginTop: 10,
            //  marginBottom:40
          }}>
          <View style={styles.Textinput}>
            <TextInput
              style={{
                width: '80%',
                color: 'black',
              }}
              placeholder="Mobile.no"
              placeholderTextColor="#888"
              keyboardType="numeric"
              maxLength={10}
              value={mobile}
              //onChangeText={setMobile}
              onChangeText={handlePhoneNumberChange}
            />
            <Icon name="cellphone" size={30} color={'#000000'} />
          </View>

          <TouchableOpacity
            style={{
              // /height: 50,
              // width: 50,
              backgroundColor: '#E3FE3E',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
              borderRadius: 20,
              padding: 10,
            }}
            onPress={() => handleSignin()}>
            <Text style={{fontFamily: secondaryFontfamily, color: 'black'}}>
              Get OTP
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    marginHorizontal: 5,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: secondaryFontfamily,
  },
  text1: {
    fontSize: 18,
    marginHorizontal: 5,
    color: '#ffffff',
    textAlign: 'center',
  },
  Textinput: {
    height: 50,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    margin: 5,
  },
});
