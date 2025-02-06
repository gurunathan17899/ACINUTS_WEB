import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, secondaryFontfamily} from '../Configuration';
const AllCategories = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          backgroundColor: colors.primaryColor,
          paddingTop: 10,
          paddingBottom: 10,
          //height: 125,
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
          source={require('../Assets/ACIlogo.png')}
          style={{height: 60, width: 60, marginLeft: 5}}
        />

        <View
          style={{
            //backgroundColor: 'red',
            width: '85%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: secondaryFontfamily,
              fontWeight: '600',
              color: 'white',
              marginLeft: 10,
              marginTop: 10,
            }}>
            {/* Welcome {UserDetails.username}!! */}
            Welcome
          </Text>

          <Text
            style={{
              fontSize: 14,
              fontFamily: secondaryFontfamily,
              fontWeight: '600',
              color: 'white',
              marginLeft: 20,
            }}>
            Dry Fruits! Stay Healthy!
          </Text>
        </View>

        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 15,
            top: 30,
          }}
          //   onPress={() => navigation.navigate('Search', {ItemList: ItemList})}
        >
          <Text>hi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AllCategories;

const styles = StyleSheet.create({});
