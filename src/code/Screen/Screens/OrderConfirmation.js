import {StyleSheet, Text, View, TouchableOpacity,BackHandler} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors, primaryFontfamily, secondaryFontfamily} from '../Configuration';
import {useFocusEffect,useNavigationState} from '@react-navigation/native';
import { useRef } from 'react';

const OrderConfirmation = ({navigation,route}) => {
  const{total,Address} = route.params;  
  const backHandlerRef = useRef(null);
  const currentRouteName = useNavigationState(state => {
    const route = state.routes[state.index];
    return route.name;
  });


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
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Dashboard")} // Navigate back when pressed
            style={{ paddingLeft: 15 }}
          >
            <Icon name="arrow-back" size={24} color="white" /> 
          </TouchableOpacity>
        ),     
        headerTitle: () => (
          <Text
            style={{
              fontWeight: '600',
              color: 'white',
              fontSize: 20,
              fontFamily: primaryFontfamily,
            }}>
            Acinuts
          </Text>
        ),
      });
      const backAction = () => {           
        console.log("back handler added")               
        // Check if the current screen is the login screen
        if (currentRouteName === 'OrderConfirmed') {
          navigation.navigate("Dashboard",{scren:"Home"})
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
    }, [navigation]),
  );
  return (
    <View style={{flex: 1}}>
      {/* <View style={{marginTop: 20, flexDirection: 'row', width: '100%'}}>
        <View
          style={{
            //height: '100%',
            width: '20%',
            //backgroundColor: "#3498db",

            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={32} color={colors.primaryColor} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '60%',
          }}>
          <Text
            style={{
              color: colors.primaryColor,
              fontSize: 20,

              fontFamily: primaryFontfamily,
            }}>
            Acinuts
          </Text>
        </View>
      </View> */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 200,
          //height: '20%',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AntDesign
            name="checkcircle"
            size={100}
            color={colors.primaryColor}
          />
        </View>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            color: colors.primaryColor,
            fontFamily: secondaryFontfamily,
            fontSize: 16,
            fontWeight: '600',
          }}>
          Thanks for
        </Text>
        <Text
          style={{
            color: colors.primaryColor,
            fontFamily: secondaryFontfamily,
            fontSize: 16,
            fontWeight: '600',
          }}>
          ordering with us!
        </Text>
      </View>
      <View style={{position: 'absolute', bottom: 40, width: '100%'}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '10%',
            marginTop: 0,
          }}>
          <Text
            style={{
              fontFamily: secondaryFontfamily,
              fontSize: 14,
              color: 'gray',
            }}>
            Order Confirmed
          </Text>
          <Text
            style={{
              fontFamily: secondaryFontfamily,
              fontSize: 16,
              color: 'black',
              fontWeight: '600',
            }}>
            Rs.{total}
          </Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 100,
          }}>
          {/*
          <Text
            style={{
              fontFamily: secondaryFontfamily,
              fontSize: 14,
              color: 'gray',
            }}>
            Delivering to
          </Text>
          <Text
          numberOfLines={3}
            style={{
              color: colors.primaryColor,
              fontFamily: secondaryFontfamily,
              fontSize: 14,
              marginLeft:20,
              marginRight:20
            }}>
            {Address}
          </Text>
          */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Orders')}
            style={{
              height: 40,
              width: '80%',
              backgroundColor: colors.primaryColor,
              marginTop: 30,
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
              Track Order
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{
              height: 40,
              width: '80%',
              backgroundColor: colors.primaryColor,
              marginTop: 30,
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
              Back To Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OrderConfirmation;

const styles = StyleSheet.create({});
