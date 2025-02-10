import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  colors,
  primaryFontfamily,
  secondaryFontfamily,
} from '../../Configuration';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {MyContext} from '../../Context/MyContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Delete_Account} from '../../Network/API';
import {showMessage} from 'react-native-flash-message';

//import Entypo from 'react-native-vector-icons/Entypo';

const Profile = ({navigation}) => {
  const {UserDetails,setUserDetails} = useContext(MyContext);  
  const [username, setusername] = useState(UserDetails.username);  
  const [usermobileno, setUsermobileno] = useState(
    UserDetails.username == 'guest'
      ? '************'
      : UserDetails?.mobileno?.length == 13
      ? UserDetails?.mobileno.slice(-10)
      : UserDetails?.mobileno,
  );

  const removeDataFromStorage = async () => {
    //const navigation = useNavigation();

    try {
      // Check if the user name key exists
      const userNameKey = 'ACINUTS_USER_DETAILS';
      const userName = await AsyncStorage.getItem(userNameKey);

      if (userName !== null) {
        // Remove the item from AsyncStorage
        await AsyncStorage.removeItem(userNameKey);
        console.log(
          'ACINUTS_USER_DETAILS Data removed successfully from AsyncStorage.',
        );
        setUserDetails({username: 'guest', Mobile: 9876543210});
        navigation.navigate('SignIn');
      } else {
        console.log('ACINUTS_USER_DETAILS Key does not exist in AsyncStorage.');
        navigation.navigate('SignIn');
        setUserDetails({username: 'guest', Mobile: 9876543210});
      }
    } catch (error) {
      console.error('Error removing data from AsyncStorage:', error);
    }
  };

  const handleLogOut = () => {
    Alert.alert(
      'Log Out',
      'You will be logged out of your account. Continue?',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Yes',
          onPress: () => {
            removeDataFromStorage('ACINUTS_USER_MOBILENO');
          },
        },
      ],
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Yes',
          onPress: () => {
            DeleteAccount();
          },
        },
      ],
    );
  };

  const handleSignUp = () => {
    navigation.navigate('Signup');
  };

  const DeleteAccount = async () => {
    Delete_Account(UserDetails.user_id)
      .then(res => {
        if (res.data.data === 1) {
          showMessage({
            message:
              'your account has been deleted successfully. Please login again.',
            type: 'success',
            duration: 3000,
          });
          setUserDetails({username: 'guest', Mobile: 9876543210});
          navigation.navigate('SignIn');
        }
      })
      .catch(error => {
        console.error('Error occurred:', error);
        showMessage({
          message: 'Please try again later.',
          type: 'danger',
        });
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '20%',

              marginTop: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={22} color={colors.primaryColor} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 20,
              color: colors.primaryColor,
              fontFamily: primaryFontfamily,
            }}>
            Profile
          </Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <View
            style={{
              height: 150,
              width: 150,
              borderWidth: 1,
              borderRadius: 80,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: colors.primaryColor,
            }}>
            <View
              style={{
                height: 110,
                width: 110,
                borderWidth: 1,
                borderRadius: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: colors.primaryColor,
              }}>
              <View
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesome
                  name="user-circle-o"
                  size={65}
                  color={colors.primaryColor}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={{alignItems: 'center', marginTop: 16}}>
          <Text
            style={{
              fontSize: 16,
              color: colors.primaryColor,
              fontWeight: '600',
              fontFamily: secondaryFontfamily,
            }}>
            {username.toUpperCase()}
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: colors.primaryColor,
              marginTop: 5,
              fontFamily: secondaryFontfamily,
              fontVariant: '200',
            }}>
            {UserDetails?.username != 'guest' ? usermobileno : ''}
          </Text>
        </View>

        <ScrollView>
          {UserDetails.username != 'guest' && (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddressInfo')}
              style={{
                marginTop: 20,
                marginLeft: 40,
                marginRight: 40,
                width: '80%',
                flexDirection: 'row',
              }}>
              <View style={{width: '20%', alignItems: 'flex-start'}}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.primaryColor,
                  }}>
                  <Entypo name="location-pin" size={25} color="white" />
                </View>
              </View>
              <View
                style={{
                  width: '60%',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 14,
                    fontFamily: secondaryFontfamily,
                  }}>
                  Shipping Address
                </Text>
              </View>
              <View
                style={{
                  width: '20%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Icon
                  name="chevron-right"
                  size={20}
                  color={colors.primaryColor}
                />
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate('About')}
            style={{
              marginTop: 20,
              marginLeft: 40,
              marginRight: 40,
              width: '80%',
              flexDirection: 'row',
            }}>
            <View style={{width: '20%', alignItems: 'flex-start'}}>
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.primaryColor,
                }}>
                <FontAwesome name="info-circle" size={20} color="white" />
              </View>
            </View>
            <View
              style={{
                width: '60%',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  fontFamily: secondaryFontfamily,
                }}>
                Contact Us
              </Text>
            </View>
            <View
              style={{
                width: '20%',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Icon
                name="chevron-right"
                size={20}
                color={colors.primaryColor}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Privacy')}
            style={{
              marginTop: 20,
              marginLeft: 40,
              marginRight: 40,
              width: '80%',
              flexDirection: 'row',
            }}>
            <View style={{width: '20%', alignItems: 'flex-start'}}>
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.primaryColor,
                }}>
                <FontAwesome name="file-text-o" size={20} color="white" />
              </View>
            </View>
            <View
              style={{
                width: '60%',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  fontFamily: secondaryFontfamily,
                }}>
                Privacy Policy
              </Text>
            </View>
            <View
              style={{
                width: '20%',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Icon
                name="chevron-right"
                size={20}
                color={colors.primaryColor}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginTop: 20,
              marginLeft: 40,
              marginRight: 40,
              width: '80%',
              flexDirection: 'row',
            }}
            onPress={() => navigation.navigate('TermsAndConditions')}>
            <View style={{width: '20%', alignItems: 'flex-start'}}>
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.primaryColor,
                }}>
                <FontAwesome name="lock" size={22} color="white" />
              </View>
            </View>
            <View
              style={{
                width: '60%',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  fontFamily: secondaryFontfamily,
                }}>
                Terms & Conditions
              </Text>
            </View>
            <View
              style={{
                width: '20%',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Icon
                name="chevron-right"
                size={20}
                color={colors.primaryColor}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              UserDetails.username != 'guest' ? handleLogOut() : handleSignUp();
            }}
            style={{
              marginTop: 20,
              marginLeft: 40,
              marginRight: 40,
              width: '80%',
              flexDirection: 'row',
            }}>
            <View style={{width: '20%', alignItems: 'flex-start'}}>
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.primaryColor,
                }}>
                <Entypo name="log-out" size={20} color="white" />
              </View>
            </View>
            <View
              style={{
                width: '60%',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  fontFamily: secondaryFontfamily,
                }}>
                {UserDetails.username != 'guest' ? 'Log Out' : 'Sign Up'}
              </Text>
            </View>
            <View
              style={{
                width: '20%',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Icon
                name="chevron-right"
                size={20}
                color={colors.primaryColor}
              />
            </View>
          </TouchableOpacity>

          {UserDetails.username != 'guest' && (
            <TouchableOpacity
              onPress={() => {
                handleDelete();
              }}
              style={{
                marginTop: 20,
                marginLeft: 40,
                marginRight: 40,
                width: '80%',
                flexDirection: 'row',
              }}>
              <View style={{width: '20%', alignItems: 'flex-start'}}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.primaryColor,
                  }}>
                  <MaterialCommunityIcons
                    name="delete"
                    size={20}
                    color="white"
                  />
                </View>
              </View>
              <View
                style={{
                  width: '60%',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 14,
                    fontFamily: secondaryFontfamily,
                  }}>
                  Delete Account
                </Text>
              </View>
              <View
                style={{
                  width: '20%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Icon
                  name="chevron-right"
                  size={20}
                  color={colors.primaryColor}
                />
              </View>
            </TouchableOpacity>
          )}

          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              // backgroundColor:'lightgray',
              marginLeft: 20,
              paddingRight: 20,
              padding: 10,
              borderRadius: 15,
            }}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: secondaryFontfamily,
                  color: 'black',
                  fontSize: 14,
                }}>
                {Platform.OS == 'ios' ? 'Version 1.8.0' : 'Version 2.8.0'}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
