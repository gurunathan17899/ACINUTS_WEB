import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../Configuration';
import {
  primaryFontfamily,
  secondaryFontfamily,  
} from '../Configuration';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
//import { AddItemToCartList } from '../Network/API';
//import { showMessage } from 'react-native-flash-message';
//import { MyContext } from '../Context/MyContext';
import { useContext } from 'react';
//import FastImage from 'react-native-fast-image';

const ItemDetails = ({navigation,route}) => {
  //const {UserDetails,Token} = useContext(MyContext)
  const data = route.params.Item  
  const [selectedQty, setSelectedQty] = useState(1);
  const [ActiveWeight, setActiveWeight] = useState(route.params.Item?.rate[0].CategoryName);
  const [ViewModal, setViewModal] = useState(false);

  const QtyList = [
    {id: 1, label: 'One', value: 1},
    {id: 2, label: 'Two', value: 2},
    {id: 3, label: 'Three', value: 3},
    {id: 4, label: 'Four', value: 4},
    {id: 5, label: 'Five', value: 5},
    {id: 6, label: 'Six', value: 6},
    {id: 7, label: 'Seven', value: 7},
    {id: 8, label: 'Eight', value: 8},
    {id: 9, label: 'Nine', value: 9},
    {id: 10, label: 'Ten', value: 10},    
  ];

  const getPrice = uom => {
    const rateItem = data.rate.find(item => item.CategoryName === uom);
    return rateItem ? rateItem.price: null;
  };

  const CustomQtySelection=()=>{
    if(selectedQty >50){
      // showMessage({
      //   message: "Enter Less than 50 QTY.",
      //   //description: "Password must be at least 4 characters long.",
      //   type: "danger",
      // });
      alert("Enter less than 50 QTY.")
    }else{
      setViewModal(false);
    }
  }

  const AddItemToCart = ()=>{
    if(UserDetails?.username != 'guest'){
    AddItemToCartList(Token,data.itemcode,ActiveWeight,selectedQty,getPrice(ActiveWeight))
    .then(res => {
      console.log(
        'Add item cart list response',
        JSON.stringify(res),
      );
      if (res?.data.issuccess == true) {
        // showMessage({
        //   message: "Item added in cart successfully.",
        //   //description: "Password must be at least 4 characters long.",
        //   type: "success",
        // });
        alert("Item added in cart successfully.")
        setTimeout(() => {
          navigation.goBack()  
        }, 250);
        
      } else if(res?.data.issuccess  == false){
        console.log("res"+JSON.stringify(res))
        // showMessage({
        //   message: res.data.message,
        //   //description: "Password must be at least 4 characters long.",
        //   type: "danger",
        // });
        alert(res.data.message)
      }
    })
    .catch(error => {
          console.error('Error occurred:', error);
      console.log(
        'problem in fetch data for AddItemToCartList ',
      );
      showMessage({
        message: "Item Not Added. Please try again later.",
        //description: "Password must be at least 4 characters long.",
        type: "danger",
      });      
    });
  }else{
    showMessage({
      message: 'Please sign-up to continue shopping.',
      type: 'info',
    });
    navigation.navigate('Signup');
  }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'gray'}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {data.imageurl == '' || data.imageurl == null ? (
          <View
            style={{
              height: '50%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="image-off"
              color={'grey'}
              size={100}
            />
          </View>
        ) : (
          // <Image
          //   style={{
          //     height: '50%',
          //     width: '100%',
          //     resizeMode: 'cover',
          //     //resizeMode:'contain'
          //   }}
          //   source={{uri: data.imageurl}}
          // />
          <Image
            style={{
              height: '50%',
              width: '100%',
              //resizeMode: 'contain',
            }}
            source={{
              uri: data.imageurl,
              
            }}
            //resizeMode={FastImage.resizeMode.stretch}
          />
        )}

        <ScrollView>
          <View style={{alignItems: 'center', backgroundColor: 'white'}}>
            <Text
              style={{
                fontFamily: primaryFontfamily,
                fontSize: 22,
                color: colors.primaryColor,
                marginTop: 20,
              }}>
              {data.itemname}
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontFamily: primaryFontfamily,
                marginTop: 10,
                color: colors.primaryColor,
              }}>
              ₹ {getPrice(ActiveWeight) * selectedQty}
            </Text>
          </View>

          <View style={{marginTop: 20, marginLeft: 16, marginRight: 16}}>
            <Text style={styles.title}>Choose the Weight:</Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={data.rate}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.weightView,
                      ActiveWeight === item.CategoryName && {
                        backgroundColor: colors.primaryColor,
                      },
                    ]}
                    onPress={() => setActiveWeight(item.CategoryName)}>
                    <Text
                      style={[
                        styles.weightText,
                        {
                          color:
                            ActiveWeight === item.CategoryName
                              ? 'white'
                              : 'black',
                        },
                      ]}>
                      {item.CategoryName}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              {/* <TouchableOpacity
            style={[
              styles.weightView,
              ActiveWeight === '250gm' && {
                backgroundColor: colors.primaryColor,
              },
            ]}
            onPress={() => setActiveWeight('250gm')}>
            <Text style={styles.weightText}>250gm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.weightView,
              ActiveWeight === '500gm' && {
                backgroundColor: colors.primaryColor,
              },
            ]}
            onPress={() => setActiveWeight('500gm')}>
            <Text style={styles.weightText}>500gm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.weightView,
              ActiveWeight === '1kg' && {
                backgroundColor: colors.primaryColor,
              },
            ]}
            onPress={() => setActiveWeight('1kg')}>
            <Text style={styles.weightText}>1 kg</Text>
          </TouchableOpacity> */}
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              marginLeft: 16,
              marginRight: 16,
            }}>
            <Text style={styles.title}>Choose the QTY:</Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={QtyList}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.weightView,
                      selectedQty === item.value && {
                        backgroundColor: colors.primaryColor,
                      },
                    ]}
                    onPress={() => setSelectedQty(item.value)}>
                    <Text
                      style={[
                        styles.weightText,
                        {
                          color: selectedQty === item.value ? 'white' : 'black',
                        },
                      ]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>

          <View
            style={{
              width: '100%',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => AddItemToCart()}
              style={{
                height: 40,
                width: '90%',
                //marginLeft:24,marginRight:24,
                //width:'90%',
                backgroundColor: colors.primaryColor,
                marginTop: 10,
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
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/*
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 10,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => AddItemToCart()}
            style={{
              height: 40,
              width: '90%',
              //marginLeft:24,marginRight:24,
              //width:'90%',
              backgroundColor: colors.primaryColor,
              marginTop: 10,
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
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
        */}

        <TouchableOpacity
          style={{position: 'absolute', top: 20, left: 20}}
          onPress={() => navigation.goBack()}>
          {/*
          <FontAwesome
            name="chevron-circle-left"
            color={colors.primaryColor}
            size={28}
          />
          */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  slogan: {
    fontSize: 30,
    fontWeight: '600',
    //color: 'black',
    color: 'white',
    fontFamily: 'Montserrat-Bold',
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
    padding: 16,
    backgroundColor: 'white',
    marginRight: 20,
    marginBottom: 10,
    borderRadius: 15,
    marginLeft:4,
  },
  weightText: {
    fontSize: 12,
    fontFamily: secondaryFontfamily,
  },
  title: {
    fontSize: 14,
    fontFamily: secondaryFontfamily,
    color: 'black',
  },
});
