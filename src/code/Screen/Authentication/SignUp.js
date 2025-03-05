import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors, primaryFontfamily, secondaryFontfamily } from '../../Configuration'
import { MyContext } from '../../../Context/MyContext';
import { SingUpAPI } from '../../../Network/API';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({navigation}) => {
  const [mobile, setMobile] = useState('');
  const [username, setUserName] = useState('');
  const [OTP,setOTP]=useState("");  
  const [userData, setUserData] = useState('');
  const {setToken, setUserDetails} = useContext(MyContext);
  const [otpSent, setOTPSent] = useState(false);

  const handleSignup = () => {
    if (mobile.length !== 10) {
      showMessage({        
        message: "Please enter a 10-digit mobile number.",
        type: "danger",
      });
     // return;
    }
    else if (mobile < 6000000000){
      showMessage({        
        message: "Please enter valid mobile number.",
        type: "danger",
      });
    }

    else if (username == "") {
      showMessage({
        message: "Please enter your name.",        
        type: "danger",
      });
      return;
    } else{
      SingUpAPI(mobile,username)
      .then(res => {
        console.log(
          'SignUP API response',
          JSON.stringify(res),
        );
        if (res.data.issuccess == true) {
          //navigation.navigate('OtpVerify', {mobile: mobile,data:res.data,mobileno:mobile});
          setUserData(res.data.data);
        } else if(res.data.issuccess == false) {
          showMessage({
            message: res.data.message,//"Something went wrong. Please try again later.",            
            type: "danger",
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
  };

  const storeData = async data => {
    try {
      const jsonValue = JSON.stringify(data);
      console.log(jsonValue + 'user data');
      await AsyncStorage.setItem('ACINUTS_USER_DETAILS', jsonValue);
      setUserDetails(data); //directly storing the value in global context.
      setToken(data.token);
      console.log('Data successfully stored');
      navigation.navigate('Dashboard', {screen: 'Home'});
    } catch (e) {
      console.error('Failed to store data', e);
    }
  };
 
  const verifyOTP = ()=>{
    console.log(OTP)
    console.log(userData.otp)
    if(OTP == ""){
      showMessage({message:"Please enter otp",type:'error'})
    }else if(OTP == userData.otp){
      storeData(userData);
      navigation.navigate('Dashboard');
    }    
  }

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{width: '50%'}}>
        <ImageBackground
          source={require('../../Assets/signinimg.jpg')}
          style={{width: '100%', height: '100%'}}>
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text
              style={{
                color: colors.secondaryColor,
                fontSize: 48,
                fontFamily: secondaryFontfamily,
                fontWeight: '600',
              }}>
              EAT DRY FRUITS
            </Text>
            <Text
              style={{
                color: colors.secondaryColor,
                fontSize: 48,
                fontFamily: secondaryFontfamily,
                fontWeight: '600',
              }}>
              {'   '}STAY HEALTHY!
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          width: '50%',
          padding: 16,
          paddingLeft: 40,
          backgroundColor: 'white',
          flex: 1,
          justifyContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../Assets/ACIlogo.png')}
            style={{height: 150, width: 150}}></Image>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: primaryFontfamily,
              fontSize: 16,
              fontWeight: '400',
              marginTop: 24,
              //color: '#bdc3c7',
              //color:'black',
              color: colors.primaryColor,
              marginBottom: 16,
            }}>
            Welcome to ACINUTS!!
          </Text>
          <TextInput
            maxLength={10}
            onChangeText={setUserName}
            placeholder="Enter your name"
            placeholderTextColor={'lightgray'}
            style={{
              backgroundColor: '#ecf0f1',
              width: 300,
              marginTop: 16,
              padding: 8,
              borderRadius: 8,
              fontFamily: secondaryFontfamily,
              fontWeight: '600',
              height: 50,
            }}
          />
          <TextInput
            onChangeText={setMobile}
            maxLength={10}
            placeholder="Enter your mobile number"
            placeholderTextColor={'lightgray'}
            style={{
              backgroundColor: '#ecf0f1',
              width: 300,
              marginTop: 16,
              padding: 8,
              borderRadius: 8,
              fontFamily: secondaryFontfamily,
              fontWeight: '600',
              height: 50,
            }}
          />

          {otpSent && (
            <TextInput
              onChangeText={setOTP}
              maxLength={6}
              placeholder="Enter your OTP"
              secureTextEntry={true}
              placeholderTextColor={'lightgray'}
              style={{
                backgroundColor: '#ecf0f1',
                width: 300,
                marginTop: 16,
                padding: 8,
                borderRadius: 8,
                fontFamily: secondaryFontfamily,
                fontWeight: '600',
                height: 50,
              }}
            />
          )}
          {!otpSent ? (
            <TouchableOpacity
              onPress={() => handleSignin()}
              style={{
                backgroundColor: colors.primaryColor,
                marginTop: 24,
                padding: 16,
                paddingLeft: 24,
                paddingRight: 24,
                borderRadius: 4,
                width: 300,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: secondaryFontfamily,
                  color: 'white',
                  fontSize: 14,
                  fontWeight: '600',
                }}>
                Get OTP
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => verifyOTP()}
              style={{
                backgroundColor: colors.primaryColor,
                marginTop: 24,
                padding: 16,
                paddingLeft: 24,
                paddingRight: 24,
                borderRadius: 4,
                width: 300,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: secondaryFontfamily,
                  color: 'white',
                  fontSize: 14,
                  fontWeight: '600',
                }}>
                Verify OTP
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{alignItems: 'center', marginTop: 24}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: secondaryFontfamily,
                fontWeight: '400',
              }}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text
                style={{
                  color: colors.primaryColor,
                  fontSize: 16,
                  fontFamily: primaryFontfamily,
                  fontWeight: '600',
                }}>
                {' '}
                SignIn
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({})