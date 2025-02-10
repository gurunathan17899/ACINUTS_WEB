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
  const ItemList = [
    {
      itemcode: 34,
      itemname: 'Dates Regular',
      imageurl:
        'http://213.210.21.17:3000/ACINUTS/ORDERMGMT/api/uploads/image-1733939800326.jpg',
      rate: [
        {price: 41, CategoryCode: 1, CategoryName: '100 gm'},
        {price: 85, CategoryCode: 2, CategoryName: '250 gm'},
        {price: 170, CategoryCode: 3, CategoryName: '500 gm'},
        {price: 340, CategoryCode: 4, CategoryName: '1 kg'},
      ],
    },
    {
      itemcode: 35,
      itemname: 'Tunisian - Branched Dates',
      imageurl:
        'http://213.210.21.17:3000/ACINUTS/ORDERMGMT/api/uploads/image-1733939909689.jpg',
      rate: [
        {price: 280, CategoryCode: 3, CategoryName: '500 gm'},
        {price: 560, CategoryCode: 4, CategoryName: '1 kg'},
      ],
    },
    {
      itemcode: 36,
      itemname: 'Dates Premium Safawi',
      imageurl: 'https://www.omgtechminds.com/ACINUTS/ACI_19.jpeg',
      rate: [
        {price: 100, CategoryCode: 1, CategoryName: '100 gm'},
        {price: 205, CategoryCode: 2, CategoryName: '250 gm'},
        {price: 410, CategoryCode: 3, CategoryName: '500 gm'},
        {price: 820, CategoryCode: 4, CategoryName: '1 kg'},
      ],
    },
    {
      itemcode: 37,
      itemname: 'Dates Superior Mabroom',
      imageurl: 'https://www.omgtechminds.com/ACINUTS/ACI_20.jpeg',
      rate: [
        {price: 160, CategoryCode: 1, CategoryName: '100 gm'},
        {price: 350, CategoryCode: 2, CategoryName: '250 gm'},
        {price: 700, CategoryCode: 3, CategoryName: '500 gm'},
        {price: 1400, CategoryCode: 4, CategoryName: '1 kg'},
      ],
    },
    {
      itemcode: 38,
      itemname: 'Dates Classic Mejdol',
      imageurl: 'https://www.omgtechminds.com/ACINUTS/ACI_101.jpeg',
      rate: [
        {price: 168, CategoryCode: 1, CategoryName: '100 gm'},
        {price: 375, CategoryCode: 2, CategoryName: '250 gm'},
        {price: 750, CategoryCode: 3, CategoryName: '500 gm'},
        {price: 1500, CategoryCode: 4, CategoryName: '1 kg'},
      ],
    },
    {
      itemcode: 39,
      itemname: 'Dates Ajwa - Queen of dates',
      imageurl: 'https://www.omgtechminds.com/ACINUTS/ACI_43.jpeg',
      rate: [
        {price: 180, CategoryCode: 1, CategoryName: '100 gm'},
        {price: 400, CategoryCode: 2, CategoryName: '250 gm'},
        {price: 800, CategoryCode: 3, CategoryName: '500 gm'},
        {price: 1600, CategoryCode: 4, CategoryName: '1 kg'},
      ],
    },
    {
      itemcode: 40,
      itemname: 'Dates Brown - Seedless',
      imageurl:
        'http://213.210.21.17:3000/ACINUTS/ORDERMGMT/api/uploads/image-1733939969872.jpg',
      rate: [
        {price: 90, CategoryCode: 3, CategoryName: '500 gm'},
        {price: 180, CategoryCode: 4, CategoryName: '1 kg'},
      ],
    },
    {
      itemcode: 41,
      itemname: 'Dates Brown - Seed 1 kg',
      imageurl:
        'http://213.210.21.17:3000/ACINUTS/ORDERMGMT/api/uploads/image-1733940212422.jpg',
      rate: [
        {price: 70, CategoryCode: 3, CategoryName: '500 gm'},
        {price: 140, CategoryCode: 4, CategoryName: '1 kg'},
      ],
    },
    {
      itemcode: 42,
      itemname: 'Dates Syrup - 400 gms',
      imageurl:
        'http://213.210.21.17:3000/ACINUTS/ORDERMGMT/api/uploads/image-1733940286337.jpg',
      rate: [{price: 180, CategoryCode: 4, CategoryName: '400 gm'}],
    },
    {
      itemcode: 43,
      itemname: 'Khajoor / Dry Dates',
      imageurl:
        'http://213.210.21.17:3000/ACINUTS/ORDERMGMT/api/uploads/image-1733940348794.jpg',
      rate: [
        {price: 60, CategoryCode: 1, CategoryName: '100 gm'},
        {price: 110, CategoryCode: 2, CategoryName: '250 gm'},
        {price: 220, CategoryCode: 3, CategoryName: '500 gm'},
        {price: 440, CategoryCode: 4, CategoryName: '1 kg'},
      ],
    },
    {
      itemcode: 44,
      itemname: 'Alpakoda',
      imageurl: 'https://www.omgtechminds.com/ACINUTS/ACI_71.jpeg',
      rate: [
        {price: 48, CategoryCode: 1, CategoryName: '100 gm'},
        {price: 100, CategoryCode: 2, CategoryName: '250 gm'},
        {price: 200, CategoryCode: 3, CategoryName: '500 gm'},
        {price: 400, CategoryCode: 4, CategoryName: '1 kg'},
      ],
    },
    {
      itemcode: 45,
      itemname: 'Amla Dry - Sweet',
      imageurl: 'https://www.omgtechminds.com/ACINUTS/ACI_22.jpeg',
      rate: [
        {price: 48, CategoryCode: 1, CategoryName: '100 gm'},
        {price: 100, CategoryCode: 2, CategoryName: '250 gm'},
        {price: 200, CategoryCode: 3, CategoryName: '500 gm'},
        {price: 400, CategoryCode: 4, CategoryName: '1 kg'},
      ],
    },
    {
      itemcode: 46,
      itemname: 'Amla Honey Single Piece',
      imageurl: 'https://www.omgtechminds.com/ACINUTS/ACI_54.jpeg',
      rate: [{price: 12, CategoryCode: 1, CategoryName: 'Single Piece'}],
    },
    {
      itemcode: 47,
      itemname: 'Ground Nuts Roasted',
      imageurl:
        'http://213.210.21.17:3000/ACINUTS/ORDERMGMT/api/uploads/image-1733940419455.jpg',
      rate: [
        {price: 75, CategoryCode: 2, CategoryName: '250 gm'},
        {price: 150, CategoryCode: 3, CategoryName: '500 gm'},
        {price: 300, CategoryCode: 4, CategoryName: '1 kg'},
      ],
    },
    {
      itemcode: 48,
      itemname: 'Ground Nuts Plain-Desi',
      imageurl:
        'http://213.210.21.17:3000/ACINUTS/ORDERMGMT/api/uploads/image-1733940482892.jpg',
      rate: [
        {price: 55, CategoryCode: 2, CategoryName: '250 gm'},
        {price: 110, CategoryCode: 3, CategoryName: '500 gm'},
        {price: 220, CategoryCode: 4, CategoryName: '1 kg'},
      ],
    },
  ];
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
