import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {LightFontfamily, colors, secondaryFontfamily} from '../Configuration';
import {DeleteCartItem, GetUserCartList} from '../../Network/API';
//import LoaderKit from 'react-native-loader-kit'
import {useFocusEffect} from '@react-navigation/native';
import {MyContext} from '../../Context/MyContext';
import {useContext} from 'react';
import HeaderComponent from '../../Components/HeaderComponent';

const Cart = ({navigation}) => {
  const {Token} = useContext(MyContext);
  const [showLoader, setShowLoader] = useState(true);
  const handlePress = (itemcode, qty, uom) => {
    const updatedData = ItemList.map(item =>
      item.itemcode === itemcode && item.selectedCategory === uom
        ? {...item, qty: qty + 1}
        : item,
    );
    setItemList(updatedData);
  };
  const [SomeItemDeleted, setSomeItemDeleted] = useState(true);
  const [selectedItem, setSelectedItem] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleMinus = (itemcode, qty, uom) => {
    if (qty === 1) {
      // Show alert if quantity is about to reach zero
      Alert.alert(
        'Delete Item',
        'Do you want to delete this item?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              // Remove the item from the backend and the local state
              DeleteItemFromCart(itemcode, uom);
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      // Update quantity if it's greater than 1
      const updatedminus = ItemList.map(item =>
        item.itemcode === itemcode && item.selectedCategory === uom
          ? {...item, qty: qty - 1}
          : item,
      );
      setItemList(updatedminus);
    }
  };

  const calculateTotalPrice = () => {
    return ItemList.reduce((total, item) => {
      return total + item.price * item.qty;
    }, 0);
  };

  const DeleteItemFromCart = (itemcode, uom) => {
    //navigation.navigate('Buynow')
    DeleteCartItem(Token, itemcode, uom)
      .then(res => {
        console.log('Delete cart list response', JSON.stringify(res));
        if (res.data.issuccess == true) {
          //alert("item removed success")
          setItemList([]);
          showMessage({
            message: 'Item Remove Successfully.',
            //description: "Password must be at least 4 characters long.",
            type: 'warning',
          });
          setSomeItemDeleted(true);
          setShowLoader(true);
          setTimeout(() => {
            GetUserCartList(Token).then(res => {
              console.log('User cart list items', JSON.stringify(res));

              if (res.data !== undefined) {
                setItemList(res.data.Items);
                setShowLoader(false);
              } else {
                setItemList([]);
                setShowLoader(false);
              }
            });
          }, 100);
        }
      })
      .catch(error => {
        console.error('Error occurred:', error);
        console.log('problem in fetch data for getProductItemDetails ');
      });
  };

  const [ItemList, setItemList] = useState([]);
  const hasFetchedData = useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      setShowLoader(true);

      const fetchData = async () => {
        try {
          const res = await GetUserCartList(Token);
          console.log('User cart list items', JSON.stringify(res));
          if (isActive) {
            if (res.data !== undefined) {
              setItemList(res.data.Items);
              setShowLoader(false);
            } else {
              setItemList([]);
              setShowLoader(false);
            }
          }
        } catch (error) {
          console.error('Error occurred:', error);
          console.log('Problem in fetching data for getProductItemDetails');
          setShowLoader(false);
        }
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, [setSomeItemDeleted]),
  );

  return showLoader == true ? (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderComponent navigation={navigation} activeScreen={'Cart'} />

      <View
        style={{alignItems: 'center', justifyContent: 'center', height: '90%'}}>
        {/*
        <LoaderKit
          style={{width: 50, height: 50}}
          name={'BallBeat'} // Optional: see list of animations below
          color={colors.primaryColor} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
        />*/}
      </View>
    </View>
  ) : ItemList?.length == 0 && showLoader == false ? (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <HeaderComponent navigation={navigation} activeScreen={'Cart'} />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/*
          <Feather name="shopping-cart" size={50} color={colors.primaryColor} />
          */}
            <Image
              //source={require('../../assets/app_icons/cart11.png')}
              source={require('../Assets/app_icons/cart11.png')}
              style={{height: 300, width: 250}}
            />

            <Text
              style={{
                fontFamily: secondaryFontfamily,
                color: colors.primaryColor,
                marginTop: -50,
                fontSize: 16,
                fontWeight: '600',
              }}>
              Your cart is empty
            </Text>

            <Text
              style={{
                marginTop: 16,
                fontFamily: secondaryFontfamily,
                marginHorizontal: 16,
                fontSize: 12,
              }}
              numberOfLines={2}>
              Looks like you haven't added anything to your cart yet
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: 12,
              marginTop: 16,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primaryColor,
                padding: 10,
                borderRadius: 10,
                paddingLeft: 40,
                paddingRight: 40,
              }}
              onPress={() => navigation.goBack()}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: secondaryFontfamily,
                  fontWeight: '600',
                }}>
                Add Items
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <HeaderComponent navigation={navigation} activeScreen={'Cart'} />
        <View style={{alignItems: 'center', marginTop: 16, marginBottom: 16}}>
          <Text style={{fontSize: 22, color: 'black', fontWeight: '600'}}>
            Your Cart
          </Text>
        </View>
        <View style={{flexDirection: 'row', padding: 16}}>
          <View
            style={{
              marginTop: 16,
              paddingTop: 10,
              width: '85%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                borderBottomWidth: 0.01,
                borderBottomColor: 'gray',
                marginLeft: 16,
                marginBottom: 16,
                paddingBottom: 12,
              }}>
              <View style={{width: '40%'}}>
                <Text style={styles.heading}>Product</Text>
              </View>
              <View style={{width: '20%'}}>
                <Text style={styles.heading}>Price (Per Qty)</Text>
              </View>
              <View style={{width: '20%', alignItems: 'center'}}>
                <Text style={styles.heading}>Quantity</Text>
              </View>
              <View style={{width: '15%', alignItems: 'flex-end'}}>
                <Text style={styles.heading}>Total</Text>
              </View>
            </View>
            <FlatList
              data={ItemList}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 12,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '40%',
                      marginLeft: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{uri: item.imageurl}}
                      resizeMode="contain"
                      style={{
                        height: 60,
                        width: 100,
                      }}></Image>
                    <Text>{item.itemname}</Text>
                  </View>
                  <View style={{width: '20%'}}>
                    <Text style={styles.heading}>Rs.{item.price}</Text>
                  </View>

                  <View
                    style={{
                      width: '20%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'lightgray',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 4,
                        borderRadius: 8,
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          handlePress(
                            item.itemcode,
                            item.qty,
                            item.selectedCategory,
                          )
                        }
                        style={{width: 25}}>
                        <Text>+</Text>
                      </TouchableOpacity>
                      <View style={{width: 30}}>
                        <Text>{item.qty}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          handleMinus(
                            item.itemcode,
                            item.qty,
                            item.selectedCategory,
                          )
                        }
                        style={{width: 10}}>
                        <Text>-</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{width: '15%', alignItems: 'flex-end'}}>
                    <Text style={styles.heading}>Rs.{item.price}</Text>
                  </View>
                </View>
              )}
            />
          </View>
          <View
            style={{
              width: '20%',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'lightgray',
                marginLeft: 20,
                height: 150,
                padding: 8,
                marginRight: 20,
                width: 200,
              }}>
              <View
                style={{borderBottomColor: 'white', borderBottomWidth: 0.001}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'black',
                    fontWeight: '600',
                    marginBottom: 8,
                  }}>
                  Order Summary
                </Text>
              </View>
              <View
                style={{
                  paddingVertical: 16,
                  borderBottomColor: 'white',
                  borderBottomWidth: 0.001,
                }}>
                <Text style={{fontSize: 12, fontWeight: '200', color: 'gray'}}>
                  Total Items: {ItemList?.length}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '200',
                    color: 'gray',
                    marginTop: 8,
                  }}>
                  Sub total: Rs.
                  {ItemList?.length > 0 ? calculateTotalPrice() : 0}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  calculateTotalPrice() < 1000
                    ? showModal()
                    : navigation.navigate('Buynow', {
                        total: calculateTotalPrice(),
                        item: ItemList?.length,
                        items: ItemList,
                      });
                }}
                style={{
                  backgroundColor: 'green',
                  padding: 8,
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontSize: 8, fontWeight: '400'}}>
                  CHECKOUT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/*
        <View
          style={{
            // position: 'absolute',
            //bottom: 15,
            borderTopWidth: 0.4,
            width: '100%',
            marginLeft: 10,
            marginRight: 10,
            height: '8%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,

            // flexDirection: 'row',
            //alignItems:'flex-end'
          }}>
          <View
            style={{
              width: '100%',
              // position: 'absolute',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: 'black',
                  //marginLeft: 200,
                }}>
                Total:
              </Text>

              <View style={{}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: colors.primaryColor,
                  }}>
                  {`   `}Rs.{ItemList?.length > 0 ? calculateTotalPrice() : 0}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                calculateTotalPrice() < 1000
                  ? showModal()
                  : navigation.navigate('Buynow', {
                      total: calculateTotalPrice(),
                      item: ItemList?.length,
                      items: ItemList,
                    });
              }}
              style={{
                // height: 40,
                width: '40%',
                padding: 10,
                backgroundColor: colors.primaryColor,
                marginTop: 0,
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
                Check Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          // /onRequestClose={closeModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={{position: 'absolute', right: 0}}
                onPress={() => {
                  navigation.navigate('Buynow', {
                    total: calculateTotalPrice(),
                    item: ItemList?.length,
                    items: ItemList,
                  });
                  closeModal();
                }}>
                {/*
                <IonIcons
                  name="close-circle-sharp"
                  color={colors.primaryColor}
                  size={24}
                />
                */}
              </TouchableOpacity>

              <Text style={styles.modalMessage}>
                Enjoy Free Delivery on orders over ₹1000! Want to add more items
                to unlock this offer?
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cancelbutton}
                  onPress={() => {
                    navigation.navigate('Buynow', {
                      total: calculateTotalPrice(),
                      item: ItemList?.length,
                      items: ItemList,
                    });
                    closeModal();
                  }}>
                  <Text style={styles.cancelText}>No</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    closeModal();
                    navigation.goBack();
                  }}>
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    //width: 300,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: secondaryFontfamily,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    //backgroundColor: '#2196F3',
    backgroundColor: colors.primaryColor,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  cancelbutton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    //backgroundColor: '#2196F3',
    backgroundColor: 'white',
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: secondaryFontfamily,
  },
  cancelText: {
    color: 'black',
    fontSize: 14,
    fontFamily: secondaryFontfamily,
  },
  heading: {
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
  },
});
