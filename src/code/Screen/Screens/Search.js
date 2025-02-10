import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View,Image,Modal } from 'react-native'
import React, { useState } from 'react'
import { colors, secondaryFontfamily } from '../Configuration'
import Feather from "react-native-vector-icons/Feather"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { primaryFontfamily,LightFontfamily } from '../Configuration'
import ItemView from '../Components/ItemView'

const Search = ({navigation}) => {
  const [SearchText,setSearchText] = useState("")
  const [ViewModal, setViewModal] = useState(false);
  const [ActiveWeight,setActiveWeight] = useState("250gm")

  const [ItemList, setItemList] = useState([
    {
      id: 1,
      name: 'Badam',
      rate: 250,
    },
    {
      id: 2,
      name: 'Grapes',
      rate: 250,
    },
    {
      id: 3,
      name: 'Nuts',
      rate: 250,
    },
    {
      id: 4,
      name: 'Nuts',
      rate: 250,
    },
    {
      id: 5,
      name: 'grapes',
      rate: 250,
    },
    {
      id: 6,
      name: 'test',
      rate: 250,
    },
  ]);

 

  const renderItem = item => (
  //   <TouchableOpacity
  //   style={{
  //     marginRight: 10,
  //     marginLeft:10,
  //     width: '45%',
  //     backgroundColor: 'white',
  //     marginBottom: 0,
  //     marginTop:10,
  //     alignItems: 'center',
  //     //padding:10,
  //     borderRadius: 10,
  //     paddingBottom: 20,
  //   }}>
  //   <Image
  //     source={require('../assets/ACI_1.jpeg')}
  //     style={{
  //       height: 130,
  //       width: '90%',
  //       resizeMode: 'stretch',
  //       borderRadius: 5,
  //       marginTop: 10,
  //     }}
  //   />
  //   <View style={{alignItems: 'center', padding: 10}}>
  //     <Text
  //       style={{
  //         fontSize: 16,
  //         color: 'black',
  //         fontWeight: '400',
  //         fontFamily: primaryFontfamily,
  //       }}>
  //       {item.name}
  //     </Text>

  //     <ItemDetails title={'100 gms'} price={100} />
  //     <ItemDetails title={'250 gms'} price={200} />
  //     <ItemDetails title={'500 gms'} price={400} />
  //     <ItemDetails title={'1 KG'} price={1000} />
  //   </View>
  //   <TouchableOpacity
  //     onPress={() => setViewModal(true)}
  //     style={{
  //       backgroundColor: colors.primaryColor,
  //       flexDirection: 'row',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       paddingLeft: 8,
  //       paddingRight: 8,
  //       paddingTop: 4,
  //       paddingBottom: 4,
  //       borderRadius: 10,
  //     }}>
  //     <Text
  //       style={{
  //         marginLeft: 4,
  //         marginRight: 4,
  //         fontFamily: primaryFontfamily,
  //         color: 'white',
  //         fontSize: 12,
  //       }}>
  //       Add to Cart{' '}
  //     </Text>
  //     <FontAwesome name="cart-plus" size={22} color="white" />
  //   </TouchableOpacity>
  // </TouchableOpacity>
  <ItemView item={item} MoveToCartOnpress={()=>setViewModal(true)}/>
  );
  return (
    <View style={{flex: 1, backgroundColor: 'Platinum'}}>
      <View
        onPress={() => navigation.navigate('Search')}
        style={{
          marginTop: 20,
          marginLeft: 10,
          marginRight: 10,
          backgroundColor: colors.primaryColor, //'white',
          // padding: 10,
          borderRadius: 125,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          placeholder="Search here.."
          style={{
            color: 'white',
            fontSize: 12,
            marginLeft: 15,
            width: '85%',
            fontFamily: secondaryFontfamily,
          }}
        />
        <TouchableOpacity style={{position: 'absolute', right: 20}}>
          <FontAwesome name="search" size={18} />
        </TouchableOpacity>
      </View>
      <View style={{height:12}}/>
      <View style={{flex:1,width:'100%'}}>
        <FlatList data={ItemList} 
        numColumns={2}
        renderItem={({item}) => renderItem(item)} />
      </View>
      <View style={{height:20}}/>

      <Modal
        animationType="fade"
        transparent={true}
        visible={ViewModal}
        onRequestClose={() => setViewModal(false)}>
        <TouchableOpacity
          onPress={() => setViewModal(false)}
          style={{
            flex: 1,
            //alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 5,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              // paddingBottom: 20,
              marginLeft: 10,
              marginRight: 10,
              //justifyContent: 'center',
            }}>
            <View>
              <Text style={styles.title}>Choose the Weight</Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <TouchableOpacity style={styles.weightView}>
                  <Text style={styles.weightText}>100gm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.weightView,
                    ActiveWeight == '250gm' && {
                      backgroundColor: colors.primaryColor,
                    },
                  ]}>
                  <Text
                    style={
                      styles.weightText &&
                      ActiveWeight == '250gm' && {color: 'white'}
                    }>
                    250gm
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.weightView}>
                  <Text style={styles.weightText}>500gm</Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.weightView}>
                  <Text style={styles.weightText}>1 kg</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => setViewModal(true)}
                style={{
                  backgroundColor: colors.primaryColor,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // paddingLeft: 8,
                  paddingRight: 28,
                  paddingTop: 4,
                  paddingBottom: 4,
                  borderRadius: 10,
                  marginRight: 30,
                }}>
                <Text
                  style={{
                    marginLeft: 20,
                    marginRight: 10,
                    fontFamily: primaryFontfamily,
                    color: 'white',
                    fontSize: 12,
                  }}>
                  Move to Cart{' '}
                </Text>
                <FontAwesome name="cart-plus" size={22} color="white" />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  position: 'absolute',
                  right: 0,
                }}>
                <Text style={styles.weightText}>Price : </Text>
                <Text
                  style={[
                    styles.weightText,
                    {color: colors.primaryColor, fontSize: 12},
                  ]}>
                  Rs.1000
                </Text>
              </View>
            </View>

            <View style={{position: 'absolute', right: 20}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '400',
                  color: 'black',
                  fontFamily: primaryFontfamily,
                  marginRight: 5,
                  marginTop: 20,
                }}>
                {'Badam'}
              </Text>
              <Image
                source={require('../assets/ACI_1.jpeg')}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 10,
                  marginTop: 5,
                }}></Image>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.primaryColor,
                    padding: 5,
                    borderRadius: 15,
                    // borderTopLeftRadius:10,borderTopRightRadius:8,
                    // borderBottomLeftRadius:8,borderBottomRightRadius:10
                  }}>
                  <FontAwesome name="plus" color="white" size={10} />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    marginLeft: 10,
                    marginRight: 10,
                    color: 'black',
                    fontFamily: LightFontfamily,
                  }}>
                  1
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.primaryColor,
                    padding: 5,
                    borderRadius: 15,
                    // borderTopLeftRadius:10,borderTopRightRadius:8,
                    // borderBottomLeftRadius:8,borderBottomRightRadius:10
                  }}>
                  <FontAwesome name="minus" color="white" size={10} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default Search

const styles = StyleSheet.create({
  weightText: {
    fontSize: 12,
    color: 'black',
    fontFamily: secondaryFontfamily,
  },
  title: {
    fontSize: 14,
    fontFamily: LightFontfamily,
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