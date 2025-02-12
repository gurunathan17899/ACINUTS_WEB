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
import React, {useState} from 'react';
import {colors, primaryFontfamily, secondaryFontfamily} from '../Configuration';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderComponent from '../../Components/HeaderComponent';


//import FontAwesome from 'react-native-vector-icons/FontAwesome'
//import FastImage from 'react-native-fast-image';

const CategoryItemList = ({navigation, route}) => {
  const ItemList = route.params.ItemList[0].Item
  console.log('route:' + JSON.stringify(route.params));

  const groupname = ItemList.length > 0 ? ItemList[0].groupname : 'Group Name';
  // const flattenItemList = list => {
  //   return list.reduce((acc, group) => {
  //     const itemsWithGroupname = group.Item.map(item => ({
  //       ...item,
  //       groupname: group.groupname,
  //     }));
  //     return acc.concat(itemsWithGroupname);
  //   }, []);
  // };

  // const flattenedItems = flattenItemList(ItemList);

  function findMaxPrice(dataArray) {
    // Use reduce to find the maximum price
    const maxItem = dataArray.reduce(
      (max, item) => {
        return item.price > max.price ? item : max;
      },
      {price: 0},
    );

    return {maxPrice: maxItem.price, maxCategoryName: maxItem.CategoryName};
  }

  // useFocusEffect(
  //   React.useCallback(() => {
  //     navigation.setOptions({
  //       headerStyle: {
  //         borderBottomWidth: 0,
  //         //alignItems: 'center',
  //         shadowColor: Platform.OS === 'lightgrey',
  //         shadowOffset: {
  //           width: 0,
  //           height: 1,
  //         },
  //         shadowRadius: 3,
  //         shadowOpacity: 1.0,
  //         elevation: 3,
  //         backgroundColor: colors.primaryColor,
  //       },
  //       headerTransparent: false,
  //       headerTintColor: 'white',

  //       headerTitleAlign: 'center',
  //       headerTitle: () => (
  //         <Text
  //           style={{
  //             fontWeight: '600',
  //             color: 'white',
  //             fontSize: 20,
  //             fontFamily: primaryFontfamily,
  //           }}>
  //           {route.params.Category}
  //         </Text>
  //       ),
  //       headerLeft: () =>
  //         Platform.OS == 'ios' && (
  //           <View style={{flexDirection: 'row'}}>
  //             <TouchableOpacity
  //               onPress={() => navigation.goBack()}
  //               style={{marginRight: 10}}>
  //               {/*
  //             <FontAwesome name="angle-left" size={33} color="white" />
  //             */}
  //             </TouchableOpacity>
  //           </View>
  //         ),
  //     });
  //   }, [navigation]),
  // );

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ItemDetails', {Item: item})}
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
              renderItem={({item}) => (
                <View style={{flexDirection: 'row', marginTop: 4}}>
                  <View style={{}}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'gray',
                        fontFamily: secondaryFontfamily,
                      }}>
                      {item.CategoryName}:
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
                    ₹{item.price}
                  </Text>
                </View>
              )}
            />
          </View>

          <View style={{flexDirection: 'row', marginTop: 12, marginBottom: 8}}>
            <TouchableOpacity
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
                1
              </Text>
            </View>
            <TouchableOpacity
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
