import React, {useContext, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import Ionicons from 'react-native-vector-icons/Ionicons';
//import FastImage from 'react-native-fast-image';
import {useFocusEffect} from '@react-navigation/native';
import {CancelOrder, getUserOrders} from '../../Network/API';
import {convertToCustomDateFormat} from '../../Helper/utils';
//import LoaderKit from 'react-native-loader-kit';
//import {showMessage} from 'react-native-flash-message';
import {colors, secondaryFontfamily, primaryFontfamily} from '../Configuration';
import {MyContext} from '../../Context/MyContext';
import HeaderComponent from '../../Components/HeaderComponent';

const MyOrders = ({navigation}) => {
  const {UserDetails, Token} = useContext(MyContext);

  const [showLoader, setShowLoader] = useState(true);
  const [Data, setData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchData = async () => {
        try {
          const res = await getUserOrders(Token);
          if (isActive) {
            if (res.data !== undefined) {
              console.log('order list:' + JSON.stringify(res.data.data));
              setData(res.data.data);
              setShowLoader(false);
            } else {
              setData([]);
              setShowLoader(false);
            }
          }
        } catch (error) {
          setData([]);
          console.error('Error occurred:', error);
          setShowLoader(false);
        }
      };
      fetchData();
      return () => {
        isActive = false;
      };
    }, [UserDetails.user_id]),
  );

  return (
    <View style={styles.container}>
      <HeaderComponent navigation={navigation} activeScreen={'MyOrders'} />

      {showLoader ? (
        <View style={styles.loaderContainer}>
          {/*
          <LoaderKit
            style={styles.loader}
            name={'BallBeat'}
            color={colors.primaryColor}
          />
          */}
        </View>
      ) : Data.length === 0 ? (
        <View style={styles.noOrdersContainer}>
          {/*
          <Ionicons name="bag-handle-outline" size={50} color={colors.primaryColor} />
          */}

          <Text style={styles.noOrdersText}>No Orders Found</Text>
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              paddingVertical:16
            }}>
            <Text style={styles.input}>Order ID</Text>
            <Text style={styles.input}>Order Date</Text>
            <Text style={styles.input}>Status</Text>
            <Text style={styles.input}>Products</Text>
            <Text style={styles.input}>Bill Amount</Text>
          </View>
          <FlatList
            data={Data}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.orderContainer}
                onPress={() => {
                  //console.log('item.items' + JSON.stringify(item));
                  navigation.navigate('OrderedItemList', {
                    items: item.items,
                    order: item,
                  });
                }}>
                <View style={styles.orderDetails}>
                  {/*
                 <Text style={styles.address} numberOfLines={3}>
                  {item.address}
                </Text>
                  
              */}

                  {/*
                <View style={styles.imagesContainer}>
                  {item.items.length > 5 && (
                    <View
                      style={{
                        backgroundColor: 'lightgray',
                        borderRadius: 75,
                        height: 50,
                        width: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 8,
                      }}>
                      <Text
                        style={{
                          fontFamily: secondaryFontfamily,
                          fontSize: 10,
                          color: colors.primaryColor,
                        }}>
                        View More+
                      </Text>
                    </View>
                  )}
                  {item.items.slice(0, 4).map(
                    (item, index) =>
                      item.imageurl !== '' && (
                        <View key={index}>
                          <Image
                            style={styles.productImage}
                            source={{
                              uri: item.imageurl,
                            }}
                          />
                        </View>
                      ),
                  )}
                </View>
                */}

                  <View style={styles.orderMeta}>
                    <Text style={styles.orderPrice}>{item.Order_ID}</Text>
                    <Text style={styles.dateTime}>{`${convertToCustomDateFormat(
                      item.Order_Date,
                    )} `}</Text>
                    <Text style={styles.orderPrice}>
                      {item.Delivery_Status}
                    </Text>
                    <Text style={styles.dateTime}>
                      {' '}
                      {item.items.length} Items
                    </Text>
                    <Text style={styles.orderPrice}>₹ {item.Total_Amount}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.Order_ID.toString()}
            contentContainerStyle={styles.listContainer}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //justifyContent: 'center',
    paddingBottom: 14,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
    fontFamily: primaryFontfamily,
    color: colors.primaryColor,
  },
  searchIcon: {},
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 50,
    height: 50,
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrdersText: {
    fontSize: 16,
    marginTop: 10,
    color: colors.primaryColor,
    fontFamily: secondaryFontfamily,
  },
  listContainer: {
    paddingBottom: 8,
  },
  orderContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 8,
    marginTop: 8,
    marginLeft: 16,
    marginRight: 16,

    marginHorizontal: 5,
  },
  orderDetails: {
    //  marginBottom: 16,
  },
  address: {
    fontSize: 14,
    fontFamily: secondaryFontfamily,
    color: '#000000',

    width: '80%',
    flexDirection: 'row',
  },
  dateTime: {
    fontSize: 12,
    fontFamily: secondaryFontfamily,
    color: 'gray',
    fontWeight:'600'
    //marginBottom: 8,
  },
  imagesContainer: {
    flexDirection: 'row-reverse',
    marginTop: 10,
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 30,
    //backgroundColor: 'red',
  },
  input: {
    fontSize: 14,
    fontWeight:'600',
    color: 'black',
    fontFamily: secondaryFontfamily,
    
  },
  input1: {
    fontSize: 12,
    fontFamily: secondaryFontfamily,
    color: 'black',
  },
  orderMeta: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 5,
  },
  productsCount: {
    fontSize: 12,
    marginRight: 25,
    fontFamily: secondaryFontfamily,
    color: colors.primaryColor,
  },
  orderPrice: {
    fontSize: 12,
    fontFamily: secondaryFontfamily,
    color: colors.primaryColor,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 1,
    left: 1,
    right: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontFamily: primaryFontfamily,
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: colors.primaryColor,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadio: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.primaryColor,
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  },
  additionalInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: 'black',
    fontFamily: secondaryFontfamily,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: colors.primaryColor,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 0.3,
    alignItems: 'center',
    elevation: 1,
    width: '50%',
  },
  actionText: {
    fontFamily: primaryFontfamily,
    fontSize: 16,
    color: colors.primaryColor,
  },
});

export default MyOrders;
