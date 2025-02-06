import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {secondaryFontfamily, LightFontfamily} from '../Configuration';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Signup = ({navigation}) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [mobile, setMobile] = useState('');
  const [username, setUsername] = useState('');
  const image =
    'https://i.pinimg.com/736x/d7/b1/75/d7b1756bf8991c1fc2dbd9936d3b4b9a.jpg';

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#55722E',
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
            //height: '20%',

            marginTop: 40,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Text style={styles.text}>SIGN UP HERE...!</Text>
        </View>
        {isKeyboardOpen == false && (
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={require('../Assets/ACIlogo.png')}
              style={{
                height: 140,
                width: 140,
                borderRadius: 100,
              }}
            />
          </View>
        )}
        {isKeyboardOpen == true && (
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={require('../Assets/ACIlogo.png')}
              style={{
                height: 120,
                width: 120,
                borderRadius: 100,
              }}
            />
          </View>
        )}
        <View
          style={{
            //height: '16%',
            //width: 300,
            width: '100%',
            position: 'absolute',
            left: 50,
            // backgroundColor: 'red',
            bottom: isKeyboardOpen ? 40 : 100,
            // /marginLeft: -210
          }}>
          <Text
            style={{
              fontSize: 14,
              color: '#ffffff',
              fontFamily: LightFontfamily,
            }}>
            Already have an Account?
          </Text>
          <View
            style={{
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
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
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{width: '50%'}}>
        <ImageBackground
          source={{uri: image}}
          style={{
            flex: 1,
            borderRadius: 20,
            //overflow: 'visible',
            justifyContent: 'center',
          }}>
          <View
            style={{
              // height: '20%',
              flex: 1,
              //width: '50%',
              alignItems: 'flex-start',
              justifyContent: 'center',
              // marginLeft: -80,
              // marginTop: 10,
              //backgroundColor: 'red',
              position: 'relative',
              left: -140,
              //  marginBottom:40
            }}>
            <View style={styles.Textinput}>
              <TextInput
                style={{
                  width: '80%',
                  height: '40%',
                  color: 'black',
                }}
                placeholder="Mobile.no"
                placeholderTextColor="#888"
                keyboardType="numeric"
                maxLength={10}
                //value={mobile}
                //onChangeText={setMobile}
                //onChangeText={handlePhoneNumberChange}
              />
              {/* <Icon name="cellphone" size={30} color={'#000000'} /> */}
            </View>
            <View style={styles.Textinput}>
              <TextInput
                style={{
                  width: '80%',
                  height: '40%',
                  color: 'black',
                }}
                placeholder="Your Name"
                placeholderTextColor="#888"
                keyboardType="numeric"
                maxLength={15}
                //value={mobile}
                //onChangeText={setMobile}
                //onChangeText={handlePhoneNumberChange}
              />
              {/* <Icon name="cellphone" size={30} color={'#000000'} /> */}
            </View>
            <View
              style={{
                width: 280,
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#E3FE3E',

                  marginTop: 20,

                  borderRadius: 20,
                  padding: 10,
                }}

                // onPress={() => handleSignin()}
              >
                <Text style={{fontFamily: secondaryFontfamily, color: 'black'}}>
                  Send OTP
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
  },
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
