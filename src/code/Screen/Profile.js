import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {colors, secondaryFontfamily} from '../Configuration';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {MyContext} from '../../Context/MyContext';
import {Delete_Account} from '../../Network/API';
import HeaderComponent from '../../Components/HeaderComponent';
import About from './ProfileContainer/Policies/About';
import PrivacyPolicy from './ProfileContainer/Policies/PrivacyPolicy';
import TermsAndConditions from './ProfileContainer/Policies/TermsAndConditions';
import AddressInfo from './ShippingAddress/AddressInfo';

const Profile = ({navigation}) => {
  const {UserDetails, setUserDetails} = useContext(MyContext);
  const [username, setusername] = useState(UserDetails.username);
  const [activeTab, setActiveTab] = useState('ShippingAddress');
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
        <HeaderComponent navigation={navigation} activeScreen={'Profile'} />
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View
            style={{
              width: '30%',
              backgroundColor: colors.primaryColor,

              marginTop: 40,
              marginLeft: 16,
              marginRight: 16,
              padding: 8,
              borderRadius: 16,
              height: 400,
            }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                  fontWeight: '600',
                  fontFamily: secondaryFontfamily,
                  marginTop: 8,
                  marginBottom: 8,
                }}>
                {username.toUpperCase()}
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  marginTop: 5,
                  fontFamily: secondaryFontfamily,
                  fontVariant: '200',
                }}>
                {UserDetails?.username != 'guest' ? usermobileno : ''}
              </Text>
            </View>

            <View style={{padding: 16}}>
              <TouchableOpacity onPress={() => setActiveTab('ShippingAddress')}>
                <Text
                  style={
                    activeTab == 'ShippingAddress'
                      ? styles.activeTopic
                      : styles.topic
                  }>
                  Shipping Address
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setActiveTab('ContactUs')}>
                <Text
                  style={
                    activeTab == 'ContactUs' ? styles.activeTopic : styles.topic
                  }>
                  Contact Us
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setActiveTab('PrivacyPolicy')}>
                <Text
                  style={
                    activeTab == 'PrivacyPolicy'
                      ? styles.activeTopic
                      : styles.topic
                  }>
                  Privacy Policy
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setActiveTab('TermsConditions')}>
                <Text
                  style={
                    activeTab == 'TermsConditions'
                      ? styles.activeTopic
                      : styles.topic
                  }>
                  Terms & Conditions
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  //setActiveTab('LogIn');
                  navigation.navigate('SignIn');

                }}>
                <Text
                  style={
                    activeTab == 'LogIn' ? styles.activeTopic : styles.topic
                  }>
                  SignIn
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setActiveTab('DeleteAccount')}>
                <Text
                  style={
                    activeTab == 'DeleteAccount'
                      ? styles.activeTopic
                      : styles.topic
                  }>
                  Delete Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              width: '50%',
              backgroundColor: colors.primaryColor,
              marginTop: 40,
              marginLeft: 16,
              marginRight: 16,
              padding: 8,
              borderRadius: 16,
            }}>
            {activeTab === 'ContactUs' && <About />}
            {activeTab === 'PrivacyPolicy' && <PrivacyPolicy />}
            {activeTab === 'TermsConditions' && <TermsAndConditions />}
            {activeTab == 'ShippingAddress' && <AddressInfo />}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  topic: {
    color: 'white',
    fontFamily: secondaryFontfamily,
    fontSize: 16,
    marginTop: 16,
    marginBottom: 16,
    fontWeight: '600',
  },
  activeTopic: {
    color: colors.secondaryColor,
    fontFamily: secondaryFontfamily,
    fontSize: 16,
    marginTop: 16,
    marginBottom: 16,
    fontWeight: '600',
  },
});
