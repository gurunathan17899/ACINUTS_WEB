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
import {useFocusEffect} from '@react-navigation/native';
//import FontAwesome from 'react-native-vector-icons/FontAwesome'
//import FastImage from 'react-native-fast-image';

const CategoryItemList = ({navigation, route}) => {
  const ItemList = route.params.ItemList[0].Item
  console.log('route:' + JSON.stringify(route.params));

  // //const groupname = ItemList.length > 0 ? ItemList[0].groupname : 'Group Name';
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

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerStyle: {
          borderBottomWidth: 0,
          //alignItems: 'center',
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
        headerTitle: () => (
          <Text
            style={{
              fontWeight: '600',
              color: 'white',
              fontSize: 20,
              fontFamily: primaryFontfamily,
            }}>
            {route.params.Category}
          </Text>
        ),
        headerLeft: () =>
          Platform.OS == 'ios' && (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{marginRight: 10}}>
                {/*
              <FontAwesome name="angle-left" size={33} color="white" />
              */}
              </TouchableOpacity>
            </View>
          ),
      });
    }, [navigation]),
  );

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
            width: 150,
            alignItems: 'center',
            marginBottom: 20,
            marginTop: 10,
          }}>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: secondaryFontfamily,
              marginLeft: 5,
              marginRight: 5,
              color: 'black',
            }}>
            {item.itemname} ({findMaxPrice(item.rate).maxCategoryName})
            {/*item.rate !== undefined && item.rate.length > 0 && (
              <Text style={{fontFamily: LightFontfamily, fontSize: 12}}>
                {` (${item.rate[0]?.CategoryName})`}
              </Text>
            )*/}
          </Text>

          <View
            style={{
              width: '100%',
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                fontFamily: secondaryFontfamily,
                fontSize: 14,
                fontWeight: '600',
                color: colors.primaryColor,
                marginTop: 8,
                marginRight: 8,
              }}>
              Rs.{findMaxPrice(item.rate).maxPrice}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/*
      <View
        style={{
          padding: 10,
          backgroundColor: colors.primaryColor,
        }}>
        <Text
          style={{
            fontFamily: primaryFontfamily,
            textAlign: 'center',
            fontSize: 18,
            color: 'white',
          }}>
          {groupname}
        </Text>
      </View>
        */}
      

      <FlatList
        data={ItemList}
        renderItem={renderItem}
        keyExtractor={item => item.itemcode}
        numColumns={4}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default CategoryItemList;

const styles = StyleSheet.create({
  itemContainer: {
    // /flex: 1,
    alignItems: 'center',
    width:200,
    //height: 50,
  },
  listContainer: {
    padding: 10,
    marginBottom: 10,
  },
});
