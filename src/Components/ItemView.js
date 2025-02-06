import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const ItemView = props => {
  const item = props.item;

  const ItemDetails = ({title, price}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            fontFamily: 'Montserrat-Medium',
            color: 'black',
          }}>
          {title}:{' '}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            fontFamily: 'Montserrat-Medium',
            color: 'black',
          }}>
          {' '}
          ₹{price}
        </Text>
      </View>
    );
  };
  return (
    <TouchableOpacity
      style={{
        marginRight: 10,
        marginLeft: 10,
        width: '45%',
        backgroundColor: 'white',
        marginBottom: 0,
        marginTop: 10,
        alignItems: 'center',
        //padding:10,
        borderRadius: 10,
        paddingBottom: 20,
      }}>
      <Image
        source={require('../assets/ACI_1.jpeg')}
        style={{
          height: 130,
          width: '90%',
          resizeMode: 'stretch',
          borderRadius: 5,
          marginTop: 10,
        }}
      />
      <View style={{alignItems: 'center', padding: 10}}>
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            fontWeight: '400',
            //fontFamily: primaryFontfamily,
          }}>
          {item.name}
        </Text>

        <ItemDetails title={'100 gms'} price={100} />
        <ItemDetails title={'250 gms'} price={200} />
        <ItemDetails title={'500 gms'} price={400} />
        <ItemDetails title={'1 KG'} price={1000} />
      </View>
      <TouchableOpacity
        onPress={() => props.MoveToCartOnpress()}
        style={{
          backgroundColor: colors.primaryColor,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 8,
          paddingRight: 8,
          paddingTop: 4,
          paddingBottom: 4,
          borderRadius: 10,
        }}>
        <Text
          style={{
            marginLeft: 4,
            marginRight: 4,
            // fontFamily: primaryFontfamily,
            color: 'white',
            fontSize: 12,
          }}>
          Add to Cart{' '}
        </Text>
        {/* <FontAwesome name="cart-plus" size={22} color="white" /> */}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ItemView;

const styles = StyleSheet.create({
  weightText: {
    fontSize: 12,
    color: 'black',
    //fontFamily: secondaryFontfamily,
  },
  title: {
    fontSize: 14,
    //fontFamily: LightFontfamily,
    color: 'black',
  },
  weightView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    backgroundColor: 'white',
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 15,
  },
});
