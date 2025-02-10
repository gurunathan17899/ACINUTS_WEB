import React, { useContext, useState, useCallback, useRef } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Modal, TouchableWithoutFeedback, Alert, TextInput } from 'react-native';
import { LightFontfamily, colors, primaryFontfamily, secondaryFontfamily } from '../Configuration';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useFocusEffect } from '@react-navigation/native';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { CancelOrder, getUserOrders } from '../Network/API';
import { convertToCustomDateFormat } from '../Helper/utils';
import { MyContext } from '../Context/MyContext';
import LoaderKit from 'react-native-loader-kit';
import { showMessage } from 'react-native-flash-message';

const OrderHistory = ({ navigation }) => {
  const { UserDetails,Token} = useContext(MyContext);
  const [showLoader, setShowLoader] = useState(true);
  const [Data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedReason, setSelectedReason] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState("");

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchData = async () => {
        try {
          const res = await getUserOrders(Token);
          if (isActive) {
            if (res.data !== undefined) {
              setData(res.data.data);
              setShowLoader(false);
            } else {
              setData([]);
              setShowLoader(false);
            }
          }
        } catch (error) {
          setData([]);
          console.error('Error occurred:', error);
        }
      };
      fetchData();
      return () => {
        isActive = false;
      };
    }, [UserDetails.user_id])
  );
  
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
            Your orders
          </Text>
        ),
      });
    }, [navigation]),
  );

  const handleCancelOrder = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleSubmitCancellation = () => {
    CancelOrder(UserDetails.user_id,selectedOrder.Order_ID)
    .then(res => {
      console.log(
        'Cancel order response',
        JSON.stringify(res),
      );
      if (res.data.data == 1) {
        showMessage({
          message: "Cancellation Requested, Your order cancellation has been requested.",
          //description: "Password must be at least 4 characters long.",
          type: "success",
        });
        setIsModalVisible(false);
       
        
      } else{
        console.log("res"+JSON.stringify(res))
        showMessage({
          message: res.data.message,
          //description: "Password must be at least 4 characters long.",
          type: "danger",
        });
        setIsModalVisible(false);
      }
    })
    .catch(error => {
          console.error('Error occurred:', error);
      console.log(
        'problem in fetch data for cancelorder ',
      );
      showMessage({
        message: "Please try again later.",
        //description: "Password must be at least 4 characters long.",
        type: "danger",
      });
      setIsModalVisible(false);
    });

    
    //Alert.alert('Cancellation Requested', 'Your order cancellation has been requested.');
  };

  return (
    <View style={{ flex: 1 , }}>
      {showLoader ? (
        <View style={styles.loaderContainer}>
          <LoaderKit style={styles.loader} name={'BallBeat'} color={colors.primaryColor} />
        </View>
      ) : Data.length === 0 ? (
        <View style={styles.noOrdersContainer}>
          <Entypo name="emoji-sad" size={50} color={colors.primaryColor} />
          <Text style={styles.noOrdersText}>No Orders Found</Text>
        </View>
      ) : (
        <View style={{ marginBottom: 0 }}>
          <FlatList
            data={Data}
            renderItem={({ item }) => (
              <View style={styles.orderContainer}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderId}>Order ID: {item.Order_ID}</Text>
                  <View style={styles.orderAmountContainer}>
                    <Text style={styles.orderAmount}>₹ {item.Total_Amount}</Text>
                  </View>
                </View>
                <View style={styles.orderDateContainer}>
                  <Text style={styles.orderDate}>{convertToCustomDateFormat(item.Order_Date)}</Text>
                </View>
                <View style={styles.orderDetailsContainer}>
                  <View style={styles.detailRow}>
                    <EvilIcons name="location" color={colors.primaryColor} size={22} />
                    <Text style={styles.detailText}>{item.address}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MaterialIcons name="delivery-dining" color={colors.primaryColor} size={22} />
                    <Text style={styles.detailText}>{item.Delivery_Status} - ({item.Expected_Delivery_Date})</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MaterialIcons name="payment" color={colors.primaryColor} size={22} />
                    <Text style={styles.detailText}>{item.payment_method}</Text>
                  </View>
                </View>
                <View style={styles.orderActions}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('OrderedItemList', { items: item.items, order: item })}
                    style={styles.actionButton}>
                    <Text style={styles.actionText}>View Items ({item.items.length})</Text>
                  </TouchableOpacity>
                  {(item.Delivery_Status == "Pending" && item.payment_method !== "UPI Payment" ) ?
                  <TouchableOpacity
                    onPress={() => handleCancelOrder(item)}
                    style={styles.actionButton}>
                    <Text style={styles.actionText}>Cancel Order</Text>
                  </TouchableOpacity>:<View/>
            }
                </View>
              </View>
            )}
          />
        </View>
      )}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Reason For Cancellation</Text>
          {["I want to change the payment option", "I want to change the delivery address", "I was hoping for a shorter delivery time", "My reasons are not listed here", "I want to change the contact details"].map((reason, index) => (
            <TouchableOpacity
              key={index}
              style={styles.radioContainer}
              onPress={() => setSelectedReason(reason)}>
              <View style={[styles.radioCircle, selectedReason === reason && { backgroundColor: colors.primaryColor }]}>
                {selectedReason === reason && <View style={styles.selectedRadio} />}
              </View>
              <Text style={[styles.radioText, selectedReason === reason && { color: colors.primaryColor }]}>{reason}</Text>
            </TouchableOpacity>
          ))}
          {selectedReason && (
            <TextInput
              style={styles.additionalInput}
              placeholder="Please provide more details"
              value={additionalInfo}
              onChangeText={setAdditionalInfo}
            />
          )}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitCancellation}>
            <Text style={styles.submitButtonText}>Submit Request</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 50,
    height: 50,
  },
  noOrdersContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  noOrdersText: {
    fontFamily: secondaryFontfamily,
    color: 'black',
    marginTop: 0,
    marginLeft: 10,
    fontSize:12
  },
  orderContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  orderId: {
    color: 'black',
    fontFamily: secondaryFontfamily,
    fontSize: 16,
  },
  orderAmountContainer: {
    position: 'absolute',
    right: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderAmount: {
    color: 'black',
    fontFamily: secondaryFontfamily,
    fontSize: 16,
  },
  orderDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  orderDate: {
    fontFamily: LightFontfamily,
    color: 'black',
  },
  orderDetailsContainer: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    marginRight: 10,
    marginBottom: 5,
  },
  detailText: {
    fontFamily: LightFontfamily,
    color: 'black',
    marginTop: 5,
    fontSize: 12,
    marginLeft: 10,
  },
  orderActions: {
    flexDirection: 'row',
    marginBottom: 5,
    //justifyContent: 'space-between',
    //justifyContent:'space-evenly',
    flexDirection: 'row-reverse',
    marginTop: 10,
  },
  actionButton: {
    width: '40%',
    borderColor: 'gray',
    borderWidth: 0.3,
    alignItems: 'center',
    padding: 10,
  },
  actionText: {
    fontFamily: primaryFontfamily,
    fontSize: 14,
    color: colors.primaryColor,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: primaryFontfamily,
    fontSize: 18,
    marginBottom: 20,
    color: colors.primaryColor,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadio: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primaryColor,
  },
  radioText: {
    fontFamily: secondaryFontfamily,
    fontSize: 16,
    color: 'black',
  },
  additionalInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    fontFamily: secondaryFontfamily,
    fontSize: 16,
    color: 'black',
  },
  submitButton: {
    backgroundColor: colors.primaryColor,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    fontFamily: primaryFontfamily,
    fontSize: 16,
    color: 'white',
  },
});

export default OrderHistory;
