import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  colors,
  primaryFontfamily,
  secondaryFontfamily,
} from '../../Configuration';
import Entypo from 'react-native-vector-icons/Entypo';
import {GetUserShippingAddress, deleteShippingAddress} from '../../Network/API';
import {useContext} from 'react';
import {MyContext} from '../../Context/MyContext';
import {showMessage} from 'react-native-flash-message';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AddressInfo = ({navigation}) => {
  const {UserShippingAddress, UserDetails, setUserShippingAddress, Token} =
    useContext(MyContext);
  const [shippingAddress, setShippingAddress] = useState(UserShippingAddress);
  const [visibleMenuId, setVisibleMenuId] = useState(null);

  const handleDelete = Address_Code => {
    Alert.alert('Delete Item', 'sure you want to delete this Address?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'OK',
        onPress: () => {
          deleteAPICall(Address_Code);
        },
      },
    ]);
  };

  const deleteAPICall = Address_Code => {
    console.log('Address code:' + Address_Code);
    deleteShippingAddress(Token, Address_Code)
      .then(res => {
        console.log('Delete shipping address response', JSON.stringify(res));
        if (res?.data.issuccess == true) {
          showMessage({
            message: 'Address Deleted Successfully.',
            type: 'success',
            duration: 1000,
          });
          setUserShippingAddress([]);
        } else {
          console.log('res' + JSON.stringify(res));
          showMessage({
            message: res.data.message,
            type: 'danger',
            duration: 1000,
          });
        }
      })
      .catch(error => {
        console.error('Error occurred:', error);
        console.log('problem in fetch data for AddItemToCartList ');
        showMessage({
          message: 'Something went wrong. Please try again later.',
          type: 'danger',
          duration: 1000,
        });
      });
  };

  useEffect(() => {
    GetUserShippingAddress(Token)
      .then(res => {
        console.log('User Shipping address list', JSON.stringify(res));
        if (res.data !== undefined) {
          setShippingAddress(res.data.data);
        } else {
          setShippingAddress([]);
        }
      })
      .catch(error => {
        console.error('Error occurred:', error);
        console.log('Problem in fetch data for GetUserShippingAddress');
      });
  }, [UserShippingAddress]);

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerStyle: {
          borderBottomWidth: 0,
          alignItems: 'center',
          shadowColor:
            Platform.OS === 'lightgrey' ? 'lightgrey' : 'transparent',
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
        headerLeft: () =>
          Platform.OS == 'ios' && (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{marginRight: 10}}>
                <FontAwesome name="angle-left" size={33} color="white" />
              </TouchableOpacity>
            </View>
          ),
        headerTitle: () => (
          <Text
            style={{
              fontWeight: '600',
              color: 'white',
              fontSize: 20,
              fontFamily: primaryFontfamily,
            }}>
            Shipping Addresses
          </Text>
        ),
      });
    }, [navigation]),
  );

  const toggleMenu = id => {
    if (visibleMenuId === id) {
      setVisibleMenuId(null);
    } else {
      setVisibleMenuId(id);
    }
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{marginTop: 40, marginLeft: 20, marginBottom: 20}}>
        <Text
          style={{fontFamily: primaryFontfamily, color: 'black', fontSize: 16}}>
          Shipping Address
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ShippingAddress', {item: {}})}
          style={{position: 'absolute', right: 20, flexDirection: 'row'}}>
          <Entypo name="squared-plus" size={20} color={colors.primaryColor} />
          <Text
            style={{
              fontFamily: secondaryFontfamily,
              color: colors.primaryColor,
              marginLeft: 5,
            }}>
            Add
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: '100%',
          marginLeft: 0,
          marginRight: 20,
          marginBottom: 100,
        }}>
        <FlatList
          data={shippingAddress}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingLeft: 20, paddingRight: 20}}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <View style={styles.actionsContainer}>
                <Text style={styles.itemText}>{item.user_name}</Text>
                {/*
                <TouchableOpacity
                  style={styles.actionButton}
                  // onPress={() => { setSelectedItem(item); setModalVisible(true); }}
                  onPress={() => {
                    console.log('item id:' + item.Address_Code);
                    toggleMenu(item.Address_Code);
                  }}>
                  <Entypo
                    name="dots-three-vertical"
                    size={16}
                    color={colors.primaryColor}
                  />
                </TouchableOpacity>
                */}
                {/*visibleMenuId === item.Address_Code && (
                  <View style={styles.menuContainer}>
                    <TouchableOpacity
                      style={styles.menuOption}
                      onPress={() => {
                        setVisibleMenuId(null);
                        navigation.navigate('ShippingAddress', {item: item});
                      }}>
                      <Text style={styles.menuOptionText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.menuOption}
                      onPress={() => {
                        setVisibleMenuId(null);
                        handleDelete(item.Address_Code);
                      }}>
                      <Text style={styles.menuOptionText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )*/}
              </View>
              <Text style={styles.addressText}>
                {`${item.house_no}, ${item.street}, ${item.city}, ${item.landmark},${item.District}, ${item.state} - ${item.pincode}`}
              </Text>
              <Text style={styles.phoneText}>Phone: {item.Contact_NO}</Text>

              <View
                style={{
                  //alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  marginTop: 16,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ShippingAddress', {item: item});
                  }}
                  style={{
                    backgroundColor: colors.primaryColor,
                    padding: 10,
                    borderRadius: 12,
                    marginRight: 8,
                    width: 75,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: primaryFontfamily,
                      fontSize: 14,
                    }}>
                    Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleDelete(item.Address_Code);
                  }}
                  style={{
                    backgroundColor: colors.primaryColor,
                    padding: 10,
                    borderRadius: 12,
                    marginRight: 8,
                    width: 75,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: primaryFontfamily,
                      fontSize: 14,
                    }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {/* <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => { setModalVisible(false); navigation.navigate('ShippingAddress', { item: selectedItem }); }}
            >
              <Text style={styles.modalOptionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => { handleDelete(selectedItem.id); }}
            >
              <Text style={styles.modalOptionText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalOptionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

export default AddressInfo;

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    paddingBottom: 20,
    borderRadius: 15,
    shadowColor: colors.primaryColor,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    position: 'relative',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    marginRight: 10,
  },
  itemText: {
    color: 'black',
    marginLeft: 10,
    marginTop: 5,
    marginRight: 10,
    fontFamily: secondaryFontfamily,
  },
  addressText: {
    color: 'gray',
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    fontFamily: secondaryFontfamily,
  },
  phoneText: {
    color: 'gray',
    marginLeft: 10,
    marginRight: 10,
    fontFamily: secondaryFontfamily,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalOptionText: {
    fontSize: 18,
    color: colors.primaryColor,
    fontFamily: primaryFontfamily,
  },
  menuContainer: {
    width: 75,
    position: 'absolute',
    top: 30,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1,
  },
  menuOption: {
    padding: 5,
  },
  menuOptionText: {
    color: colors.primaryColor,
    fontFamily: primaryFontfamily,
  },
});
