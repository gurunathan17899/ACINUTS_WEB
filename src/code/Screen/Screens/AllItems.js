import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  BackHandler,
} from 'react-native';
import React, {useState} from 'react';
import {colors, primaryFontfamily, secondaryFontfamily} from '../Configuration';
import {LightFontfamily} from '../Configuration';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import {useEffect, useRef} from 'react';
import {
  useNavigationState,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import axios from 'axios';
import {ServerURL} from '../Network/Config';
import { GetProductList } from '../Network/API';
import Category from './Category';

const AllItems = ({navigation}) => {
  const [ItemList, setItemList] = useState([]);
  const backHandlerRef = useRef(null);
  const [imageError, setImageError] = useState(false);

  const currentRouteName = useNavigationState(state => {
    const route = state.routes[state.index];
    return route.name;
  });

  useFocusEffect(() => {
    const backAction = () => {
      console.log('back handler added');

      console.log('current route name' + currentRouteName);
      // Check if the current screen is the login screen
      if (currentRouteName === 'Home') {
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


  const GetProductListDetails = () => {
    GetProductList()
      .then(res => {
        // console.log(
        //   'new guru GetAppointmentVerifiedByBotAndTotalAppointmentVerified',
        //   JSON.stringify(res.data),
        // );
        if (res.data !== undefined) {
        setItemList(res.data)
        } else {
          setItemList([])
        }
      })
      .catch(error => {
            console.error('Error occurred:', error);
        console.log(
          'problem in fetch data for getProductItemDetails ',
        );
      });
  };


  useEffect(() => {
    GetProductListDetails()
  
  }, [navigation]);


  const navigateToCategoryList=(groupName)=>{
    const data = ItemList.filter(group => group.groupname === groupName);
    navigation.navigate('Search',{Category:groupName,ItemList:data})
  }

  

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => navigateToCategoryList(item.name)}
        style={{
          marginTop: 20,
          marginLeft: 10,
          marginRight: 10,
          backgroundColor: colors.primaryColor, //'white',
          padding: 10,
          borderRadius: 125,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{marginLeft: 5, fontFamily: LightFontfamily, color: 'white'}}>
          Search Items
        </Text>
        <View style={{position: 'absolute', right: 20}}>
          <FontAwesome name="search" size={18} />
        </View>
      </TouchableOpacity>
      <View style={{height: '95%'}}>
        <FlatList
          data={ItemList}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View
              style={{
                //   backgroundColor: '#F2F9F9',
                //marginTop: 10,
                //marginBottom: 10,
                marginRight: 10,
                marginLeft: 10,
                padding: 10,
              }}>
              <Text
                style={{
                  fontFamily: primaryFontfamily,
                  fontSize: 16,
                  color: colors.primaryColor,
                }}>
                {item.groupname}
              </Text>
              <FlatList
                data={item.Item}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ItemDetails', {Item: item})
                    }
                    style={{
                      marginRight: 10,
                      marginBottom: 10,
                      marginTop: 10,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 5,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                      backgroundColor: 'white',
                      borderRadius: 15,
                      width: 150,
                    }}>
                    <View style={{alignItems: 'center'}}>
                      {item.imageurl == "" ? (
                        <MaterialIcons
                          name="hide-image"
                          size={100}
                          color={'grey'}
                        />
                      ) : (
                        <Image
                          source={{uri: item.imageurl}}
                          style={{
                            height: 100,
                            width: 100,
                            resizeMode: 'contain',
                            borderRadius: 50,
                            marginTop: 5,
                            marginBottom: 5,
                          }}
                          //onError={() => setImageError(true)}
                        />
                      )}
                    </View>
                    <View style={{width: 150}}>
                      <Text
                        numberOfLines={2}
                        style={{
                          fontFamily: secondaryFontfamily,
                          marginLeft: 5,
                          marginRight: 5,
                          color: 'black',
                        }}>
                        {item.itemname}
                        {item.rate !== undefined && item.rate.length > 0 && (
                          <Text
                            style={{fontFamily: LightFontfamily, fontSize: 12}}>
                            {` (${item.rate[0]?.CategoryName})`}
                          </Text>
                        )}
                      </Text>

                      {item.rate !== undefined && item.rate.length > 0 && (
                        <View
                          style={{
                            // backgroundColor: 'lightgray',
                            flexDirection: 'row-reverse',
                          }}>
                          <Text
                            style={{
                              fontFamily: primaryFontfamily,
                              marginLeft: 5,
                              fontSize: 16,
                              marginRight: 20,
                              marginBottom: 10,
                              marginTop: 5,
                              color: colors.primaryColor,
                            }}>
                            {' '}
                            Rs.{item.rate[0].price}
                          </Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        />

        <View style={{height: 20}} />
      </View>
    </View>
  );
};

export default AllItems;

const styles = StyleSheet.create({});
