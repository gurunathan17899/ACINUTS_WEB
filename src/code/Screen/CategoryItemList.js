import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {colors, primaryFontfamily, secondaryFontfamily} from '../Configuration';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderComponent from '../../Components/HeaderComponent';
import { IoMdRadioButtonOff } from "react-icons/io";
import { IoRadioButtonOnOutline } from "react-icons/io5";
import { AddItemToCartList } from '../../Network/API';
import { MyContext } from '../../Context/MyContext';
import showMessage from '../Toast';

//import FontAwesome from 'react-native-vector-icons/FontAwesome'
//import FastImage from 'react-native-fast-image';

const CategoryItemList = ({navigation, route}) => {  
  const {UserDetails,Token} = useContext(MyContext)
  const [ItemList, setItemList] = useState([]);
  //console.log('route:' + JSON.stringify(ItemList));

  useEffect(()=>{
    const data = route.params?.ItemList[0]?.Item.map(item => ({
      ...item,
      QTY: 1,
    }));
    setItemList(data)

  },[navigation])

  const handleRateSelection = (itemCode, categoryCode,CategoryName) => {
    setItemList(prevData =>
      prevData.map(item => {
        if (item.itemcode === itemCode) {
          return {
            ...item,
            rate: item.rate.map(
              rate =>
                rate.CategoryCode === categoryCode
                  ? {...rate, isSelected: true}
                  : {...rate, isSelected: false}, // Deselect other rates
            ),
            ActiveCategoryName: CategoryName,
            Price: item.rate.find(item => item.CategoryCode === categoryCode),
          };
        }
        return item;
      }),
    );
   // console.log(JSON.stringify(ItemList))
  };

  const handleQty = (itemCode, type) => {
    setItemList(prevData =>
      prevData.map(item => {
        if (item.itemcode === itemCode) {
          return {
            ...item,
            QTY:
              type == 'add'
                ? item?.QTY + 1
                : type == 'minus' && item.QTY > 0
                ? item.QTY - 1
                : item.QTY,
          };
        }
        return item;
      }),
    );    
  };

  const AddItemToCart = (item)=>{
    console.log("item",JSON.stringify(item))
    if(UserDetails?.username != 'guest'){
    if(item?.ActiveCategoryName == undefined){
      showMessage({
        message: 'Please select category type',
        type: 'danger',
      });
    }else{
      AddItemToCartList(
        Token,
        item.itemcode,
        item.ActiveCategoryName,
        item.QTY ?? 1,
        item.Price.price,
      )
        .then(res => {
          console.log('Add item cart list response', JSON.stringify(res));
          if (res?.data.issuccess == true) {
            showMessage({
              message: 'Item added in cart successfully.',
              type: 'success',
            });
          } else if (res?.data.issuccess == false) {
            showMessage({
              message: res.data.message,
              type: 'danger',
            });
          }
        })
        .catch(error => {
          console.error('Error occurred:', error);
          console.log('problem in fetch data for AddItemToCartList ');
          showMessage({
            message: 'Item Not Added. Please try again later.',
            //description: "Password must be at least 4 characters long.",
            type: 'danger',
          });
        });
    }
  }else{
    showMessage({
      message: 'Please sign-up to continue shopping.',
      type: 'info',
    });
    navigation.navigate('Signup');
  }
  }
  

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        //onPress={() => navigation.navigate('ItemDetails', {Item: item})}
        style={{
          //   marginRight: 10,
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
          width: 160,
        }}>
        <View style={{alignItems: 'center'}}>
          {item.imageurl == '' ? (
            <View />
          ) : (
            <Image
              style={{
                height: 100,
                width: 100,
                //resizeMode: 'contain',
                borderRadius: 50,
                marginTop: 5,
                marginBottom: 5,
              }}
              source={{
                uri: item.imageurl,
                //headers: {Authorization: 'someAuthToken'},
              }}
              //resizeMode={FastImage.resizeMode.contain}
            />
          )}
        </View>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 20,
            marginTop: 10,
          }}>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: primaryFontfamily,
              fontSize: 16,
              marginLeft: 8,
              marginRight: 8,
              color: 'black',
              fontWeight: '500',
              marginBottom: 4,
            }}>
            {item.itemname}
          </Text>
          <View style={{alignItems: 'center', width: '100%'}}>
            <FlatList
              data={item.rate}
              renderItem={({item: cat}) => (
                <View style={{flexDirection: 'row', marginTop: 4}}>
                  <TouchableOpacity
                    style={{marginRight: 4}}
                    onPress={() =>
                      handleRateSelection(
                        item.itemcode,
                        cat.CategoryCode,
                        cat.CategoryName,
                      )
                    }>
                    {cat?.isSelected == true ? (
                      <IoRadioButtonOnOutline
                        size={16}
                        color={colors.primaryColor}
                      />
                    ) : (
                      <IoMdRadioButtonOff
                        size={16}
                        color={colors.primaryColor}
                      />
                    )}
                  </TouchableOpacity>

                  <View style={{}}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'gray',
                        fontFamily: secondaryFontfamily,
                      }}>
                      {cat.CategoryName}:
                    </Text>
                  </View>

                  <Text
                    style={{
                      color: colors.primaryColor,
                      fontSize: 12,
                      fontWeight: '600',
                      fontFamily: primaryFontfamily,
                    }}>
                    {' '}
                    ₹{cat.price}
                  </Text>
                </View>
              )}
            />
          </View>

          <View style={{flexDirection: 'row', marginTop: 12, marginBottom: 8}}>
            <TouchableOpacity
              onPress={() => handleQty(item.itemcode, 'add')}
              style={{
                borderColor: 'lightgray',
                borderWidth: 0.01,
                paddingVertical: 4,
                paddingHorizontal: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: secondaryFontfamily,
                  color: colors.primaryColor,
                }}>
                +
              </Text>
            </TouchableOpacity>
            <View
              style={{
                borderColor: 'lightgray',
                borderWidth: 0.01,
                padding: 8,
                width: 50,
                alignItems: 'center',
                marginLeft: 4,
                marginRight: 4,
              }}>
              <Text style={{fontFamily: secondaryFontfamily, fontSize: 12}}>
                {item.QTY == undefined ? 1 : item.QTY}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleQty(item.itemcode, 'minus')}
              style={{
                borderColor: 'lightgray',
                borderWidth: 0.01,
                paddingVertical: 4,
                paddingHorizontal: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: secondaryFontfamily,
                  color: colors.primaryColor,
                }}>
                -
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => AddItemToCart(item)}
            style={{
              backgroundColor: colors.primaryColor,
              padding: 12,
              marginTop: 8,
              borderRadius: 8,
            }}>
            <Text
              style={{
                fontFamily: primaryFontfamily,
                fontWeight: '600',
                fontSize: 10,
                color: 'white',
              }}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderComponent navigation={navigation} activeScreen={'Category'} />

      <View
        style={{
          padding: 10,
          marginTop: 24,
          backgroundColor: 'white',
          height: 50,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            color: colors.primaryColor,
            fontFamily: primaryFontfamily,
            fontWeight: '600',
          }}>
          {route.params.Category}
        </Text>
      </View>

      <View style={{alignItems: 'center', width: '100%'}}>
        <FlatList
          data={ItemList}
          renderItem={renderItem}
          keyExtractor={item => item.itemcode}
          numColumns={4}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

export default CategoryItemList;

const styles = StyleSheet.create({
  itemContainer: {
    // /flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    width:200,
    //height: 50,
  },
  listContainer: {
    padding: 10,
    marginBottom: 10,
  },
});
