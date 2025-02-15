import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, primaryFontfamily, secondaryFontfamily } from '../../Configuration'

const SignUp = ({navigation}) => {
 
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

          <TextInput
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
              //borderColor: colors.primaryColor,
              //borderWidth: 2,
            }}
          />

          <TouchableOpacity
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
            <TouchableOpacity onPress={()=>navigation.navigate("SignIn")}>
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