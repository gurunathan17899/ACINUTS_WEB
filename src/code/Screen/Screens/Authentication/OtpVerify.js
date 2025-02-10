import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyContext } from '../../Context/MyContext';
import { useContext } from 'react';
import { colors, primaryFontfamily, secondaryFontfamily } from '../../Configuration';
import { SingInAPI } from '../../Network/API';

const OtpVerify = ({ navigation, route }) => {
  const {data,mobileno} = route.params;
  //console.log("current data:"+JSON.stringify(data))
  const { setUserDetails,setToken } = useContext(MyContext);
  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const forthInputRef = useRef(null);
  const fifthInputRef = useRef(null);
  const sixthInputRef = useRef(null);

  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [otp5, setOtp5] = useState('');
  const [otp6, setOtp6] = useState('');
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendEnabled(true);
    }
  }, [timer]);

  const Otp_validation = () => {
    if (
      otp1 == '' ||
      otp2 == '' ||
      otp3 == '' ||
      otp4 == '' ||
      otp5 == '' ||
      otp6 == ''
    ) {
      showMessage({
        message: 'Please enter OTP',
        autoHide: 1000,
        type: 'danger',
      });
    } else if (otp6 !== "") {
      const otp = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`
      console.log("entered otp:" + otp)
      if (otp == route.params.data.data.otp) {
        storeData(route.params.data.data);
      }

    }
  };

  const storeData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      console.log(jsonValue + 'user data')
      await AsyncStorage.setItem("ACINUTS_USER_DETAILS", jsonValue);
      setUserDetails(data) //directly storing the value in global context.
      setToken(data.token)
      console.log('Data successfully stored');
      navigation.navigate('Dashboard',{screen:'Home'});
    } catch (e) {
      console.error('Failed to store data', e);
    }
  };

  const handleTextChange = (value, setValue, nextInputRef) => {
    setValue(value);

    if (value && nextInputRef && nextInputRef.current) {
      nextInputRef.current.focus();
    }
  };

  const handleKeyPress = (
    { nativeEvent },
    setValue,
    nextInputRef,
    prevInputRef,
  ) => {
    if (nativeEvent.key === 'Backspace') {
      setValue('');
      if (prevInputRef) {
        prevInputRef.current.focus();
      }
    } else {
      if (nextInputRef) {
        nextInputRef.current.focus();
      }
    }
  };

  const resendOtp = () => {
    setTimer(60);
    setResendEnabled(false);
    SingInAPI(mobileno)
    .then(res => {
      console.log('Sign in api', JSON.stringify(res));
      if (res.data.issuccess == true) {
        //navigation.navigate('OtpVerify', {mobile: mobile, data: res.data});
        showMessage({
          message: 'OTP send successfully.',
          //description: "Password must be at least 4 characters long.",
          type: 'success',
          duration: 1000,
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
    // Call the resend OTP API here
    showMessage({
      message: 'OTP resent successfully',
      autoHide: 1000,
      type: 'success',
    });
  };

  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors.primaryColor}}>
    <View style={{backgroundColor: colors.primaryColor, flex: 1}}>
      <View style={{marginTop: 30, flexDirection: 'row'}}>
        <View
          style={{
            marginLeft: 20,
            marginRight: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={26} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={{color: 'white', fontSize: 18,fontFamily:secondaryFontfamily}}>
          Enter Verification Code
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 40,
          height: 200,
          width: '100%',
        }}>
        <MaterialIcons name="security-update-good" size={100} color="white" />
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'white', fontSize: 14}}>
          We have sent OTP on your number
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
          marginLeft: 40,
          marginRight: 40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <View style={styles.otpbox}>
          <TextInput
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
            ref={firstInputRef}
            onChangeText={value =>
              handleTextChange(value, setOtp1, secondInputRef)
            }
            onKeyPress={e => handleKeyPress(e, setOtp1, secondInputRef, null)}
            style={{color: 'black'}}
            autoFocus={true}
          />
        </View>
        <View style={styles.otpbox}>
          <TextInput
            keyboardType="numeric"
            maxLength={1}
            ref={secondInputRef}
            textAlign="center"
            onChangeText={value =>
              handleTextChange(value, setOtp2, thirdInputRef)
            }
            onKeyPress={e =>
              handleKeyPress(e, setOtp2, thirdInputRef, firstInputRef)
            }
            style={{color: 'black'}}
          />
        </View>
        <View style={styles.otpbox}>
          <TextInput
            keyboardType="numeric"
            maxLength={1}
            ref={thirdInputRef}
            textAlign="center"
            onChangeText={value =>
              handleTextChange(value, setOtp3, forthInputRef)
            }
            onKeyPress={e =>
              handleKeyPress(e, setOtp3, forthInputRef, secondInputRef)
            }
            style={{color: 'black'}}
          />
        </View>
        <View style={styles.otpbox}>
          <TextInput
            keyboardType="numeric"
            textAlign="center"
            ref={forthInputRef}
            maxLength={1}
            onChangeText={value =>
              handleTextChange(value, setOtp4, fifthInputRef)
            }
            onKeyPress={e =>
              handleKeyPress(e, setOtp4, fifthInputRef, thirdInputRef)
            }
            style={{color: 'black'}}
          />
        </View>
        <View style={styles.otpbox}>
          <TextInput
            keyboardType="numeric"
            maxLength={1}
            ref={fifthInputRef}
            textAlign="center"
            onChangeText={value =>
              handleTextChange(value, setOtp5, sixthInputRef)
            }
            onKeyPress={e =>
              handleKeyPress(e, setOtp5, sixthInputRef, forthInputRef)
            }
            style={{color: 'black'}}
          />
        </View>
        <View style={styles.otpbox}>
          <TextInput
            keyboardType="numeric"
            textAlign="center"
            ref={sixthInputRef}
            maxLength={1}
            onChangeText={value => handleTextChange(value, setOtp6, null)}
            onKeyPress={e => handleKeyPress(e, setOtp6, null, fifthInputRef)}
            style={{color: 'black'}}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => Otp_validation()}
        style={{
          height: 50,
          backgroundColor: 'white',
          marginTop: 20,
          marginLeft: 40,
          marginRight: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: colors.primaryColor, fontSize: 14}}>Verify</Text>
      </TouchableOpacity>
      <View
        style={{
          height: 20,
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 12,
            color: 'white',
            fontFamily: secondaryFontfamily,
          }}>
          Didn't receive a OTP?
        </Text>
        <TouchableOpacity onPress={resendOtp} disabled={!resendEnabled}>
          <Text
            style={{
              fontSize: 16,
              color: resendEnabled ? 'white' : 'ligthgray',
              fontWeight: '600',
              marginLeft: 5,
              fontFamily: primaryFontfamily,
            }}>
            Resend OTP
          </Text>
        </TouchableOpacity>
        {!resendEnabled && (
          <Text style={{fontSize: 12, color: 'white', marginLeft: 5}}>
            ({timer}s)
          </Text>
        )}
      </View>
    </View>
    </SafeAreaView>
  );
};

export default OtpVerify;

const styles = StyleSheet.create({
  otpbox: {
    height: 40,
    width: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: 'white',
  },
});