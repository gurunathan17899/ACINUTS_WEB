import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {
  colors,
  LightFontfamily,
  primaryFontfamily,
  secondaryFontfamily,
} from '../Configuration';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FastImage from 'react-native-fast-image';
import Svg, {Path} from 'react-native-svg';

const SearchItems = ({route, navigation}) => {
  const {ItemList} = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(flattenItemList(ItemList));

  function flattenItemList(list) {
    let flatList = [];
    list.forEach(group => {
      group.Item.forEach(item => {
        flatList.push({...item, groupname: group.groupname});
      });
    });
    return flatList;
  }

  const handleSearch = query => {
    setSearchQuery(query);
    if (query) {
      const result = flattenItemList(ItemList).filter(item =>
        item.itemname
          .toLowerCase()
          .replace(/[_\s]/g, '' && ' ')
          .includes(query.toLowerCase().replace(/[_\s]/g, '' && ' ')),
      );
      setFilteredItems(result.length > 0 ? result : []);
    } else {
      setFilteredItems(flattenItemList(ItemList));
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ItemDetails', {Item: item})}
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
          {item.imageurl == '' ? (
            <MaterialIcons name="hide-image" size={100} color={'grey'} />
          ) : (
            <FastImage
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
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        </View>
        <View style={{width: 150, alignItems: 'center', marginBottom: 20,marginTop:10}}>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: secondaryFontfamily,
              marginLeft: 5,
              marginRight: 5,
              color: 'black',
            }}>
            {item.itemname}
            
          </Text>        
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors.primaryColor}}>
    <View style={{flex: 1, paddingBottom: 10, backgroundColor: 'white'}}>
      <View style={{
        height:100
      }}>
      <Svg height="300" width="100%" viewBox="50 50 500 200">
        <Path
          fill={colors.primaryColor}
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0z"
        />
      </Svg>
      </View>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: 'row',
          marginTop: -95,
          alignItems: 'center',
          marginLeft: 10,
        }}>
        <EvilIcons name="chevron-left" size={30} color={'white'} />
        <Text
          style={{fontFamily: secondaryFontfamily, color:'white'}}>
          Back
        </Text>
      </TouchableOpacity>

      <View style={styles.searchbar}>
        <FontAwesome name="search" size={18} color={'grey'} />

        <TextInput
          // style={styles.searchInput}
          placeholder="Search items..."
          placeholderTextColor={colors.primaryColor}
          value={searchQuery}
          onChangeText={handleSearch}
          style={{
            color: 'black',
            fontSize: 12,
            marginLeft: 15,
            width: '85%',
            height:40,
            fontFamily: secondaryFontfamily,
          }}
        />
      </View>
      <View style={{padding: 5}}></View>
      {filteredItems.length === 0 && searchQuery.length > 0 ? (
        <View style={styles.noItemContainer}>
          <Text style={styles.noItemText}>No item found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={item => item.itemcode}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
    </SafeAreaView>
  );
};

export default SearchItems;

const styles = StyleSheet.create({
  searchbar: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom:10,
    backgroundColor: 'white',
    paddingLeft: 10,
    borderRadius: 125,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
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
  itemText: {
    fontSize: 16,
    color: 'white',
    fontFamily: primaryFontfamily,
  },
  searchInput: {
    height: 40,
    borderColor: colors.primaryColor,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  noItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemText: {
    fontSize: 18,
    color: colors.primaryColor,
    fontFamily: primaryFontfamily,
  },
});
