import {StyleSheet, Text, View, TouchableOpacity, FlatList, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import {colors, primaryFontfamily, secondaryFontfamily} from '../Configuration';
import Icon from 'react-native-vector-icons/Feather';
import Entypo from "react-native-vector-icons/Entypo"
import FlashMessage, { showMessage } from 'react-native-flash-message';
import Dots from 'react-native-dots-pagination';



const Buynow = ({navigation}) => {
  const [activePageIndex, setActivePageIndex] = useState(0); // State to store the index of the active page
  const {width,height} = useWindowDimensions()

  const [shipingAddress, setShippingAddress] = useState([
    
    {
      name: 'gurunathan s',

      address:
        '117, New Street, keezhamoongiladi, Chidambaram,tamil nadu - 608 102',
      mobile: '6385330956',
      isactive: true,
    },
    {
      name: 'swathi m',
      address:
        '117, New Street, keezhamoongiladi, Chidambaram,tamil nadu - 608 102',
      mobile: '6385330956',
      isactive: false,
    },
    {
      name: 'Roshini',
      address:
        '117, New Street, keezhamoongiladi, Chidambaram,tamil nadu - 608 102',
      mobile: '6385330956',
      isactive: false,
    },
    
  ]);
  const [ItemList, setItemList] = useState([
    {
      id: 1,
      name: 'Badam',
      rate: 250,
      qty: "1 kg",
    },
    {
      id: 2,
      name: 'Grapes',
      rate: 500,
      qty: "100 gm",
    },
    {
      id: 3,
      name: 'Badam',
      rate: 1000,
      qty: "100 gm",
    },
    {
      id: 4,
      name: 'Grapes',
      rate: 700,
      qty: "100 gm",
    },
    {
      id: 5,
      name: 'Grapes',
      rate: 700,
      qty: "100 gm",
    },
    {
      id: 6,
      name: 'Grapes',
      rate: 700,
      qty: "500 gm",
    },
    {
      id: 7,
      name: 'Grapes',
      rate: 700,
      qty: "100 gm",
    },
    {
      id: 8,
      name: 'Grapes',
      rate: 700,
      qty: "100 gm",
    },
  ]);

  const navigate_to_next=()=>{
    if(shipingAddress == undefined){
      showMessage({
        message: 'Please add a shipping address',
        autoHide: 1000,
        type: 'danger',
      });

    }else{
    navigation.navigate('PaymentMethod')
    }
  }

  const handleScrollEnd = (event) => {
    // Calculate the index of the active page based on the scroll position and item width
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const activeIndex = Math.floor(contentOffset / viewSize);
    setActivePageIndex(activeIndex);
  };


  return (
    <View
      style={{
        flex: 1, // backgroundColor: 'white'
      }}>
      <View style={{marginTop: 20, flexDirection: 'row', width: '100%'}}>
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
              fontWeight: '600',
              fontFamily: primaryFontfamily,
            }}>
            Order Summary
          </Text>
        </View>
      </View>
      <View
        style={{
          // height: 300,
          backgroundColor: 'white',
          marginTop: 20,
          marginLeft: 20,
          marginRight: 20,
          //marginBottom:20
          paddingBottom: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '33%', marginLeft: 10, marginTop: 10}}>
            <Text
              style={{
                color: colors.primaryColor,
                fontFamily: secondaryFontfamily,
                fontSize: 14,
              }}>
              NAME
            </Text>
          </View>
          <View style={{width: '33%', marginLeft: 10, marginTop: 10}}>
            <Text
              style={{
                color: colors.primaryColor,
                fontFamily: secondaryFontfamily,
                fontSize: 14,
              }}>
              QTY
            </Text>
          </View>
          <View style={{marginTop: 10, position: 'absolute', right: 30}}>
            <Text
              style={{
                color: colors.primaryColor,
                fontFamily: secondaryFontfamily,
                fontSize: 14,
              }}>
              PRICE
            </Text>
          </View>
        </View>

        <FlatList
          data={ItemList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={{flexDirection: 'row'}}>
              <View style={{marginLeft: 10, marginTop: 20, width: '33%'}}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: secondaryFontfamily,
                    fontSize: 13,
                  }}>
                  {item.name}
                </Text>
              </View>
              <View style={{marginLeft: 10, marginTop: 20, width: '33%'}}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: secondaryFontfamily,
                    fontSize: 13,
                  }}>
                  {item.qty}
                </Text>
              </View>
              <View style={{marginTop: 20, position: 'absolute', right: 30}}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: secondaryFontfamily,
                    fontSize: 13,
                  }}>
                  Rs.{item.rate}
                </Text>
              </View>
            </View>
          )}
        />
        <View
          style={{
            // /position: 'absolute',
            //bottom: -20,
            flexDirection: 'row',
            width: '100%',
            marginTop: 20,
          }}>
          <Text
            style={{
              color: 'black',
              marginLeft: 10,
              fontFamily: secondaryFontfamily,
              fontWeight: '600',
              marginLeft: 10,
            }}>
            Total:
          </Text>
          <Text
            style={{
              color: 'black',
              marginLeft: 10,
              fontFamily: secondaryFontfamily,
            }}>
            ({ItemList.length} items)
          </Text>
          <View style={{position: 'absolute', right: 30}}>
            <Text
              style={{
                color: 'black',

                fontFamily: secondaryFontfamily,
                fontWeight: '800',
              }}>
              Rs 2450
            </Text>
          </View>
        </View>
      </View>

      <View style={{marginTop: 40, marginLeft: 20}}>
        <Text
          style={{fontFamily: primaryFontfamily, color: 'black', fontSize: 16}}>
          Shipping Address
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ShippingAddress')}
          style={{position: 'absolute', right: 20, flexDirection: 'row'}}>
          <Entypo name="squared-plus" size={20} color={colors.primaryColor} />
          <Text
            style={{
              fontFamily: secondaryFontfamily,
              color: colors.primaryColor,
              marginLeft: 5,
            }}>
            Add
          </Text>
        </TouchableOpacity>
      </View>

      {shipingAddress.length > 0 ? (
        <View style={{width: '100%', marginLeft: 0, marginRight: 20}}>
          <FlatList
            horizontal
            data={shipingAddress}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScrollEnd}
            contentContainerStyle={{paddingLeft: 20, paddingRight: 20}}
            renderItem={({item}) => (
              <View
                style={{
                  //marginLeft: 20,
                  marginRight: 20,
                  //marginTop: 20,
                  width: width - 20,
                  paddingRight: 20,
                }}>
                <View
                  style={{
                    marginTop: 20,
                    backgroundColor: 'white',
                    paddingBottom: 20,
                    borderRadius: 15,
                    shadowColor: colors.primaryColor,
                    shadowOffset: {
                      width: 0,
                      height: 5,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      marginLeft: 10,
                      marginTop: 10,
                      marginRight: 10,
                      fontFamily: secondaryFontfamily,
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: 'gray',
                      marginLeft: 10,
                      marginTop: 10,
                      marginRight: 10,
                      fontFamily: secondaryFontfamily,
                    }}>
                    {item.address}
                  </Text>
                  <Text
                    style={{
                      color: 'gray',
                      marginLeft: 10,
                      marginTop: 10,
                      marginRight: 10,
                      fontFamily: secondaryFontfamily,
                    }}>
                    Phone: {item.mobile}{' '}
                  </Text>
                </View>
              </View>
            )}
          />
          <View style={{marginTop: 10}}>
            <Dots
              length={shipingAddress.length}
              active={activePageIndex}
              activeColor={colors.primaryColor}
            />
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('ShippingAddress')}
          style={{
            backgroundColor: 'white',
            padding: 40,
            marginRight: 20,
            marginLeft: 20,
            marginTop: 20,
            marginBottom: 20,
            borderRadius: 15,
            shadowColor: colors.primaryColor,
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            // flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent:'center'
            }}>
            <Entypo name="location" size={32} color={colors.primaryColor} />
            <Text
              style={{
                fontFamily: secondaryFontfamily,
                marginTop: 10,
                marginLeft: 20,
                color: 'gray',
                fontSize: 14,
              }}>
              Click here to Add new shipping address
            </Text>
          </View>
        </TouchableOpacity>
      )}

      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 20,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigate_to_next()}
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
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Buynow;

const styles = StyleSheet.create({});