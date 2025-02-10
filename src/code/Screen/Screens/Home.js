import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {
  HeadingFontFamily,
  LightFontfamily,
  colors,
  primaryFontfamily,
  secondaryFontfamily,
} from '../Configuration';

const Home = ({navigation}) => {
  const [ViewModal, setViewModal] = useState(false);
  const [ActiveWeight,setActiveWeight] = useState("250gm")
  const [hideSeparatePart, setHideSeparatePart] = useState(false);
  
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
  ]);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // You can adjust the threshold value according to your UI
    const threshold = 100; // For example, hide the separate part when scrolled 100 units

    if (offsetY > threshold) {
      setHideSeparatePart(true);
    } else {
      setHideSeparatePart(false);
    }
  };

  const ItemDetails = ({title, price}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            fontFamily: 'Montserrat-Medium',
            color: 'black',
          }}>
          {title}:{' '}
        </Text>
        <Text
          style={{
            fontSize: 14,
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
    <View style={{flex: 1}}>
      <View
        style={{
          height: !hideSeparatePart ? '25%' : '12%',
          justifyContent: 'space-evenly',
          //backgroundColor: 'lightyellow',
          backgroundColor: colors.primaryColor,
          padding: 10,
          paddingBottom: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        {!hideSeparatePart && (
          <View>
            <Text style={[styles.slogan, {marginTop: 20}]}>Discover the</Text>
            <Text style={styles.slogan}>healthy with us!</Text>
            <TouchableOpacity
            onPress={()=>navigation.navigate("Search")}
              style={{
                position: 'absolute',
                right: 20,
                top: 20,
              }}>
              <FontAwesome name="search" size={24} color={'lightskyblue'} />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate('Category')}
          style={{
            marginTop: 20,
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 15,
          }}>
          <Text
            style={{
              fontFamily: secondaryFontfamily,
              fontSize: 14,
              color: 'gray',
              fontWeight: '200',
            }}>
            Category
          </Text>
          <Text
            style={{
              fontFamily: secondaryFontfamily,
              fontSize: 16,
              fontWeight: '600',
              color: 'black',
            }}>
            All
          </Text>
          <View style={{position: 'absolute', bottom: 10, right: 20}}>
            <FontAwesome name="filter" size={24} color={'lightblue'} />
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 20,
          marginLeft: 20,
          height: !hideSeparatePart ? '75%' : '90%',
        }}>
        <FlatList
          data={ItemList}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                marginRight: 20,
                width: '45%',
                backgroundColor: 'white',
                marginBottom: 20,
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
                    fontFamily: primaryFontfamily,
                  }}>
                  {item.name}
                </Text>
                
                <ItemDetails title={'100 gms'} price={100} />
                <ItemDetails title={'250 gms'} price={200} />
                <ItemDetails title={'500 gms'} price={400} />
                <ItemDetails title={'1 KG'} price={1000} />
              </View>
              <TouchableOpacity
                onPress={() => setViewModal(true)}
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
                    fontFamily: primaryFontfamily,
                    color: 'white',
                    fontSize: 12,
                  }}>
                  Add to Cart{' '}
                </Text>
                <FontAwesome name="cart-plus" size={22} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
        <View style={{height: 30}}></View>
      </View>

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
                    ActiveWeight == '250gm' && {backgroundColor: colors.primaryColor},
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
                  style={[styles.weightText, {color: colors.primaryColor, fontSize: 12}]}>
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
};

export default Home;

const styles = StyleSheet.create({
  slogan: {
    fontSize: 30,
    fontWeight: '600',
    //color: 'black',
    color:'white',
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
    padding: 10,
    backgroundColor: 'white',
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 15,
  },
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
});
