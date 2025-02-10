import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  useWindowDimensions,
  BackHandler,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {colors} from '../Configuration';
//import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import {useNavigationState, useFocusEffect} from '@react-navigation/native';
//import {GetProductList} from '../../Network/API';
import {GetProductList} from '../../Network/API';
import {useContext} from 'react';
//import { MyContext } from '../../Context/MyContext';
//import FastImage from 'react-native-fast-image';

const AllCategories = ({route, navigation}) => {
  const UserDetails = {id: 1, username: 'guru', mobileno: '9732434343'};
  // const {UserDetails} = useContext(MyContext);
  // console.log("UserDetails"+JSON.stringify(UserDetails))
  // const {
  //   requestUserPermission,
  //   getFCMToken,
  //   listenToBackgroundNotifications,
  //   listenToForegroundNotifications,
  //   onNotificationOpenedAppFromBackground,
  //   onNotificationOpenedAppFromQuit,
  // } = usePushNotification();
  const {width, height} = useWindowDimensions();
  // const {ItemList} = route.params;
  const CategoryItemList = [
    {
      id: 1,
      itemname: 'ALMOND',
      label: 'ALMOND',
      imageurl: 'https://www.acinuts.com/intime_images/ACI_2.jpeg',
    },
    {
      id: 2,
      itemname: 'Berries',
      label: 'BERRIES',
      imageurl: 'https://www.acinuts.com/intime_images/ACI_35.jpeg',
    },
    {
      id: 3,
      itemname: 'CASHEWS',
      label: 'CASHEWS',
      imageurl: 'https://www.acinuts.com/intime_images/ACI_3.jpeg',
    },
    {
      id: 4,
      itemname: 'CANDY',
      label: 'CANDY',
      imageurl: 'https://www.acinuts.com/intime_images/ACI_109.jpeg',
    },

    {
      id: 5,
      itemname: 'DATES & AMLA',
      label: 'DATES & AMLA',
      imageurl: 'https://www.acinuts.com/intime_images/ACI_20.jpeg',
    },
    {
      id: 15,
      itemname: 'Dry Fruits',
      label: 'DRY FRUITS',
      imageurl: 'https://www.acinuts.com/intime_images/ACI_63.jpeg',
    },

    {
      id: 6,
      itemname: 'FIG',
      label: 'FIG',
      imageurl: 'https://www.acinuts.com/intime_images/ACI_13.jpeg',
    },
    {
      id: 7,
      itemname: 'NUTS ',
      label: 'NUTS',
      imageurl: 'https://www.acinuts.com/intime_images/ACI_49.jpeg',
    },

    {
      id: 8,
      itemname: 'Others',
      label: 'Others',
      imageurl: 'https://www.acinuts.com/intime_images/ACI_23.jpeg',
    },
    {
      id: 9,
      itemname: 'PALM & CANE',
      label: 'PALM & CANE ',
      imageurl: 'https://www.acinuts.com/intime_images/ACI_94.jpeg',
    },
    {
      id: 10,
      itemname: 'PISTA',
      label: 'PISTA',
      imageurl: 'https://www.acinuts.com/intime_images/ACI_11.jpeg',
    },
    {
      id: 11,
      itemname: 'RAISINS',
      label: 'RAISINS',
      imageurl: 'https://www.acinuts.com/intime_images/ACI_56.jpeg',
    },
    {
      id: 12,
      itemname: 'SEEDS',
      label: 'SEEDS',
      imageurl: 'https://www.acinuts.com/intime_images/ACI_24.jpeg',
    },

    {
      id: 13,
      itemname: 'Spices',
      label: 'SPICES',
      imageurl: 'https://www.acinuts.com/intime_images/ACI_41.jpeg',
    },
    {
      id: 14,
      itemname: 'WALNUT',
      label: 'WALNUT',
      imageurl: 'https://www.acinuts.com/intime_images/ACI_90.jpeg',
    },
  ];

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
          setItemList(res.data);
        } else {
          setItemList([]);
        }
      })
      .catch(error => {
        console.error('Error occurred:', error);
        console.log('problem in fetch data for getProductItemDetails ');
      });
  };

  useEffect(() => {
    console.log('UserDetails' + JSON.stringify(UserDetails));
    const listenToNotifications = () => {
      try {
        getFCMToken(UserDetails.user_id, UserDetails.mobileno);
        requestUserPermission();
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error);
      }
    };
    if (Platform.OS === 'android') {
      listenToNotifications();
    }
    GetProductListDetails();
  }, [navigation]);

  const navigateToCategoryList = groupName => {
    if (groupName !== 'Palm') {
      const data = ItemList.filter(group => group.groupname === groupName);
      navigation.navigate('CategoryItemList', {
        Category: groupName,
        ItemList: data,
      });
    } else if (groupName == 'Palm') {
      const data = ItemList.filter(group => group.groupname === 'Palm Product');
      navigation.navigate('CategoryItemList', {
        Category: groupName,
        ItemList: data,
      });
    }
  };

  const getGreeting = username => {
    console.log('user' + username);
    const currentHour = new Date().getHours(); // Get the current hour
    let greeting = '';

    if (currentHour < 12) {
      greeting = `Good morning, ${username}!!`;
    } else if (currentHour < 18) {
      greeting = `Good afternoon, ${username}!!`;
    } else {
      greeting = `Good evening, ${username}!!`;
    }

    return greeting;
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => navigateToCategoryList(item.itemname)}
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
          //width: 90,
          width: width / 3 - 30,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          {/*
          <Image
            source={{uri: item.imageurl}}
            style={{
              height: 50,
              width: 50,
              resizeMode: 'contain',
              borderRadius: 50,
              marginTop: 5,
              marginBottom: 5,
            }}
          />
          */}
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              marginTop: 5,
              marginBottom: 5,
            }}
            source={{
              uri: item.imageurl,
              //headers: {Authorization: 'someAuthToken'},
              //priority: FastImage.priority.high,
            }}
            //resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 5, marginBottom: 5}}>
          <Text
            numberOfLines={2}
            style={{
              //fontFamily: secondaryFontfamily,
              fontSize: 12,
              marginLeft: 5,
              marginRight: 5,
              color: 'black',
              //textAlign:'center'
            }}>
            {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.primaryColor}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {/*
        <TouchableOpacity
        // onPress={() => navigation.navigate('AllCategories',{ItemList})}
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
      */}

        <View
          style={{
            backgroundColor: colors.primaryColor,
            paddingTop: 10,
            paddingBottom: 10,
            height: 250,
            flexDirection: 'row',
            //borderBottomLeftRadius: 25,
            //borderBottomRightRadius: 25,
            marginBottom: 0,
            //justifyContent:'center'
            //alignItems: 'center',
            //justifyContent: 'center',
            paddingTop: 15,
          }}>
          <Image
            //source={require('../../Assets/ACIlogo.png')}
            //source={require('../Assets/app_icons/ACIlogo.png')}
            source={require('../Assets/ACIlogo.png')}
            style={{height: 60, width: 60, marginLeft: 5}}
          />

          <View style={{}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: 'white',
                marginLeft: 10,
                marginTop: 10,
              }}>
              {getGreeting(UserDetails?.username)}
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: 'white',
                marginLeft: 20,
              }}>
              Eat Dry Fruits! Stay Healthy!
            </Text>
          </View>

          {/*
          <TouchableOpacity
            style={{position: 'absolute', right: 15, top: 25}}
            onPress={() => navigation.navigate('Search', {ItemList: ItemList})}>
              
            <MaterialCommunityIcons
              name="store-search"
              size={32}
              color="white"
            />            
          </TouchableOpacity>
          */}

          <View style={{position: 'absolute', right: 15, top: 25}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity 
              onPress={()=>navigation.navigate("Cart")}
              style={{marginRight: 12}}>
                <Text style={styles.heading}>Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={()=>navigation.navigate("MyOrders")}
              style={{marginRight: 12}}>
                <Text style={styles.heading}>Orders</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{marginRight: 12}}>
                <Text style={styles.heading}>Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            //height: '90%',
            //height: height - 300,

            backgroundColor: 'white',
            position: 'absolute',
            width: '100%',
            top: 90,
          }}>
          <FlatList
            data={CategoryItemList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AllCategories;

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    marginBottom: 10,
  },
  itemContainer: {
    flex: 1,
    // margin: 5,
    // padding: 20,
    // backgroundColor: colors.primaryColor,
    // borderRadius: 5,
    alignItems: 'center',
  },
  heading: {
    fontSize: 14,
    color: 'white',
    fontWeight: '400',
    
  },
});
