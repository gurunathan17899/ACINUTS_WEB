import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
  SafeAreaView,
  Linking,
  Modal
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {primaryFontfamily, secondaryFontfamily} from '../Configuration';
import {colors} from '../Configuration';
//import Dots from 'react-native-dots-pagination';
//import Entypo from 'react-native-vector-icons/Entypo';
import {useWindowDimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { MyContext } from '../../Context/MyContext';
import {useContext} from 'react';
import {getPaytmToken, GetUserShippingAddress, saveOrder} from "../../Network/API";
//import {showMessage} from 'react-native-flash-message';
import {getFutureDateInCustomFormat} from '../../Helper/utils';

//import LoaderKit from 'react-native-loader-kit';
//import {initWithParams} from 'react-native-upi-payments';
import { ServerURL } from '../../Network/Config';
import axios from 'axios';

const PlaceOrder = ({navigation, route}) => {
  const {total} = route.params;
  const {item} = route.params;
  const [ActivePaymentMethod, setActivePaymentMethod] = useState('');
  const {width, height} = useWindowDimensions();
  const [activePageIndex, setActivePageIndex] = useState(0); // State to store the index of the active page
  const {UserShippingAddress, UserDetails} = useContext(MyContext);
  const [shipingAddress, setShippingAddress] = useState(UserShippingAddress);
  const [activeShippingCode, setActiveShippingCode] = useState(0);
  const {setUserOrders, Token} = useContext(MyContext);
  const [viewLoader, setViewLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [DeliveryCharge, setDeliveryCharge] = useState(0);
  const [isfirstorder, setisfirstorder] = useState(false);
  const [totalBillAmt, setTotalBillAmt] = useState(total + DeliveryCharge);
  const [upiLink,setUpiLink] = useState("")
  const [upilinkID,setUPILinkID] = useState("")

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const ValidateAddress = () => {
    if (activeShippingCode == 0 && shipingAddress.length > 0) {
      showMessage({
        message: 'Please select the address.',
        autoHide: 1000,
        type: 'danger',
      });
    } else if (shipingAddress.length == 0) {
      showMessage({
        message: 'Please select the address.',
        autoHide: 1000,
        type: 'danger',
      });
    } else if (ActivePaymentMethod == '') {
      showMessage({
        message: 'Please select the Payment Method.',
        autoHide: 1000,
        type: 'danger',
      });
    } else {
      showModal();
    }
  };

  const Expected_Delivery_Date = getFutureDateInCustomFormat();

  const DeliveryChargeCalculation = (
    shippinaddresses,
    activeAddressCode,
    isfirstorder,
  ) => {
    if (total > 1000) {
      setDeliveryCharge(0);
      //setTotalBillAmt(total - (isfirstorder == true? Math.round((total*20)/100):0))
      setTotalBillAmt(total);
    } else {
      console.log('test:' + JSON.stringify(shippinaddresses));
      const ActiveAddress = shippinaddresses.filter(
        address => address.Address_Code == activeAddressCode,
      );

      console.log(
        'Active dist:' + ActiveAddress[0]?.District + ' ' + activeAddressCode,
      );
      let totalWeightInGrams = 0;
      route.params.items.forEach(item => {
        const category = item.selectedCategory;
        const qty = item.qty;
        const [value, unit] = category.split(' ');
        let weightInGrams = parseFloat(value); // Convert the numeric value to a number
        // If unit is kg, convert to grams
        if (unit === 'kg') {
          weightInGrams *= 1000;
        }
        totalWeightInGrams += weightInGrams * qty;
      });
      console.log(
        'totalWeightInGrams:' +
          totalWeightInGrams +
          ' ' +
          JSON.stringify(ActiveAddress),
      );
      if (ActiveAddress[0]?.District == 'Chennai') {
        setDeliveryCharge(50);
        //setTotalBillAmt(total+50-(isfirstorder == true? Math.round(total*20/100):0))
        setTotalBillAmt(total + 50);
      } else {
        const CalculatedAmt = Math.round((totalWeightInGrams / 1000) * 70);
        setDeliveryCharge(CalculatedAmt > 70 ? CalculatedAmt : 70);
        //setTotalBillAmt(total + Math.round(CalculatedAmt>70?CalculatedAmt:70) -(isfirstorder == true? Math.round((total*20)/100):0)
        setTotalBillAmt(
          total + Math.round(CalculatedAmt > 70 ? CalculatedAmt : 70),
        );
      }
    }
  };

  const PlaceOrder_API = remarks => {
    console.log('here');
    const ActiveAddress = shipingAddress.filter(
      address => address.Address_Code == activeShippingCode,
    );

    const address = `${ActiveAddress[0]?.user_name} ${ActiveAddress[0]?.house_no}, ${ActiveAddress[0]?.street}, ${ActiveAddress[0]?.city},${ActiveAddress[0]?.landmark},${ActiveAddress[0]?.District},${ActiveAddress[0]?.state} - ${ActiveAddress[0]?.pincode} `;

    saveOrder(
      Token,
      activeShippingCode,
      totalBillAmt,
      Expected_Delivery_Date,
      ActivePaymentMethod,
      'Pending',
      route.params.items,
      remarks,
      address,
      ActiveAddress[0].Contact_NO,
      DeliveryCharge,
      total,
    )
      .then(res => {
        console.log('Place order response', JSON.stringify(res));
        if (res.data.data == 1) {
          setUserOrders([]);
          setViewLoader(false);
          navigation.navigate('OrderConfirmed', {
            total: totalBillAmt,
            Address: address,
          });
        } else {
          showMessage({
            message:
              'Order not placed. Something went wrong. Please try-again later.',
            autoHide: 1000,
            type: 'danger',
          });
        }
      })
      .catch(error => {
        setViewLoader(false);
        console.error('Error occurred:', error);
        console.log('problem in fetch data for getProductItemDetails ');
      });
  };

  useEffect(() => {
    console.log('EDD' + Expected_Delivery_Date);

    GetUserShippingAddress(Token)
      .then(res => {
        if (res.data !== undefined) {
          setShippingAddress(res.data.data);
          console.log('shipping data:' + JSON.stringify(res.data));
          setActiveShippingCode(res.data.data[0].Address_Code);
          setisfirstorder(res.data.firstorderofferavailable);
          //setTimeout(() => {
          DeliveryChargeCalculation(
            res.data.data,
            res.data.data[0].Address_Code,
            res.data.firstorderofferavailable,
          );
          //}, 3000);
          //setActiveShippingCode(res.data.data.length+1)
        } else {
          setItemList([]);
        }
      })
      .catch(error => {
        console.error('Error occurred:', error);
        console.log('problem in fetch data for GetUserShippingAddress ');
      });
  }, [UserShippingAddress]);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const pollPaymentStatus = async (linkId) => {
    console.log("Acive link check"+linkId)
    let maxAttempts = 4; // Maximum number of polling attempts
    const pollingInterval = 15000; // 20 seconds delay between attempts
    let alertShown = false; // Flag to ensure the alert is shown only once

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      if (alertShown == false) {
        try {
          const response = await axios.post(`${ServerURL}/fetch-transaction`, {
            linkId: linkId,
          });

          // Logging the response for debugging
          console.log('Polling response:', JSON.stringify(response));

          // Check if the response indicates a successful transaction
          if (response.data?.body?.orders[0]?.orderStatus === 'SUCCESS') {
            console.log('Transaction verified:', JSON.stringify(response.data));
            alertShown = true;
            // Proceed with placing the order
            console.log("response.data.body.orders[0].orderId"+response.data.body.orders[0].orderId)
            PlaceOrder_API(response.data.body.orders[0].orderId);
            setViewLoader(false);
            return; // Exit the function once the transaction is verified
          } else if (response.data?.status === 'failure') {
            // Handle transaction failure
            console.log('Transaction Failed');
            setViewLoader(false);
            alertShown = true;
            Alert.alert(
              'Transaction Failed',
              'Your payment transaction was not successful.',
            );
            return; // Exit the function if the transaction failed
          } else {
            console.log('Transaction not yet verified');
          }
        } catch (error) {
          // Handle the error
          console.error('Error verifying transaction:', error);
        }

        // Wait before retrying
        if (attempt < maxAttempts) {
          await delay(pollingInterval); // Wait before the next attempt
        }
      }

      // Show the alert if not already shown
      if (!alertShown && viewLoader) {
        alertShown = true;
        console.log('Polling stopped after maximum attempts');
        Alert.alert(
          'We have not received any payment from you!',
          'If money was debited, please contact customer care.',
        );
        setViewLoader(false);
      }
    }
  };



  const UPIPayment = async () => {
    if (Platform.OS == 'android') {
      setViewLoader(true);

      initWithParams({
        amount: totalBillAmt,
        receiverUpi: 'paytm-56898617@ptybl',
        currency: 'INR', //optional
      })
        .then(result => {
          console.log('Payment successful', JSON.stringify(result));
          const keyValuePairs = result.split('&');
          const data = {};
          keyValuePairs.forEach(pair => {
            const [key, value] = pair.split('=');
            data[key] = value || '';
          });
          console.log('res' + JSON.stringify(data) + ' ' + data.Status);
          if (data.Status == 'SUCCESS') {
            //alert("success")
            PlaceOrder_API(data.txnId);
          }
        })
        .catch(e => {
          setViewLoader(false);
          showMessage({
            message: 'Something went wrong.',
            autoHide: 1000,
            type: 'danger',
          });
          console.log('error', JSON.stringify(e));
        });
    } else {
      //fetchToken();
      try {
        const response = await axios.post(`${ServerURL}/create-upi-link`, {
          amount: totalBillAmt //--need to change in release
        });
        console.log('respose:' + JSON.stringify(response));
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        const data = response.data;
        const upiLink = data.body.longUrl; // Adjust based on your API response structure
        console.log('upi link', JSON.stringify(upiLink));
        setUpiLink(upiLink);
        setUPILinkID(data.body.linkId);
        // Open the UPI app
        if (upiLink !== undefined) {
          await Linking.openURL(upiLink);
          setViewLoader(true)
          setTimeout(() => {
            pollPaymentStatus(data.body.linkId);            
          }, 30000);
          console.log('Active link id:' + data.body.linkId);
          //navigation.navigate("Payment")
        } else {
          Alert.alert('Error', 'UPI link not found');
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'Failed to create UPI link');
      }
    }
  };

  function generateOrderId() {
    const prefix = 'ACINUTS';
    const randomNumber = Math.floor(Math.random() * 10000) + 1; // generates a random number between 1 and 9999
    return prefix + randomNumber.toString().padStart(4, '0'); // ensures the number has 4 digits
  }

  const fetchToken = async () => {
    try {
      const res = await getPaytmToken();
      const orderId = generateOrderId();
      const urlScheme = '';

      console.log('res.data?.body?.accessToken' + res.data?.body?.txnToken);
      if (res.data !== undefined) {
        //         const paytmUPIURL = `https://securegw-stage.paytm.in/theia/api/v1/showPaymentPage?mid=YOUR_MID&orderId=ORDER_ID&txnToken=${txnToken}`;
        //         Linking.openURL(paytmUPIURL).catch((err) =>
        //   console.error("Failed to redirect to UPI App:", err)
        // );
        // AllInOneSDKManager.startTransaction(
        //   orderId,
        //   PAYTM_UPI_MID,
        //   res.data?.body?.txnToken,
        //   1.0,
        //   `www.omgtechminds.com/${orderId}`,
        //   false,
        //   true,
        //   ""
        // )
        //   .then(result => {
        //     console.log('result', result);
        //     //alert(result.response);
        //     if (result?.ORDERID !== undefined) {
        //       PlaceOrder_API(result?.ORDERID);
        //     } else {
        //       showMessage({
        //         type: 'warning',
        //         message: result.response,
        //       });
        //     }
        //   })
        //   .catch(err => {
        //     showMessage({message: err, type: 'danger'});
        //   });
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const handleScrollEnd = event => {
    // Calculate the index of the active page based on the scroll position and item width
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const activeIndex = Math.floor(contentOffset / viewSize);
    setActivePageIndex(activeIndex);
  };

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerStyle: {
          borderBottomWidth: 0,
          alignItems: 'center',
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

        headerTitle: () => (
          <Text
            style={{
              fontWeight: '600',
              color: 'white',
              fontSize: 20,
              fontFamily: primaryFontfamily,
            }}>
            Place Order
          </Text>
        ),
      });      
    }, [navigation]),
  );



  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{marginTop: 40, marginLeft: 20}}>
          <Text
            style={{
              fontFamily: primaryFontfamily,
              color: 'black',
              fontSize: 16,
            }}>
            Shipping Address
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ShippingAddress', {item: {}})}
            style={{position: 'absolute', right: 20, flexDirection: 'row'}}>
            {/*
            <Entypo name="squared-plus" size={20} color={colors.primaryColor} />
            */}
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

        {shipingAddress.length > 0 ? (
          <View style={{width: '100%', marginLeft: 0, marginRight: 20}}>
            <FlatList
              horizontal
              data={shipingAddress}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleScrollEnd}
              contentContainerStyle={{paddingLeft: 20, paddingRight: 20}}
              renderItem={({item}) => (
                <View
                  style={{
                    //marginLeft: 20,
                    marginRight: 20,
                    //marginTop: 20,
                    width: width - 20,
                    paddingRight: 20,
                  }}>
                  <View
                    style={{
                      marginTop: 20,
                      backgroundColor: 'white',
                      paddingBottom: 20,
                      borderRadius: 15,
                      shadowColor: colors.primaryColor,
                      shadowOffset: {
                        width: 0,
                        height: 5,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                      marginBottom: 10,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          color: 'black',
                          marginLeft: 10,
                          marginTop: 10,
                          marginRight: 4,
                          fontFamily: secondaryFontfamily,
                        }}>
                        {item.user_name}
                      </Text>
                      <TouchableOpacity
                        style={{marginTop: 8}}
                        onPress={() =>
                          navigation.navigate('ShippingAddress', {item: item})
                        }>
                          {/*
                        <MaterialIcons
                          name="edit"
                          color={colors.primaryColor}
                          size={18}
                        />
                        */}
                      </TouchableOpacity>
                    </View>
                    <Text
                      numberOfLines={2}
                      style={{
                        color: 'gray',
                        marginLeft: 10,
                        marginTop: 10,
                        marginRight: 10,
                        fontFamily: secondaryFontfamily,
                      }}>
                      {`${item.house_no},${item.street},${item.city},${item.landmark}, ${item.District}, ${item.state} - ${item.pincode} `}
                    </Text>
                    <Text
                      style={{
                        color: 'gray',
                        marginLeft: 10,
                        marginTop: 10,
                        marginRight: 10,
                        fontFamily: secondaryFontfamily,
                      }}>
                      Phone: {item.Contact_NO}{' '}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        setActiveShippingCode(item.Address_Code);
                        DeliveryChargeCalculation(
                          shipingAddress,
                          item.Address_Code,
                          isfirstorder,
                        );
                      }}
                      style={{position: 'absolute', top: 10, right: 10}}>
                        {/*
                      <MaterialCommunityIcons
                        name={
                          item.Address_Code == activeShippingCode
                            ? 'checkbox-marked'
                            : 'checkbox-blank-outline'
                        }
                        color={colors.primaryColor}
                        size={22}
                      />
                      */}
                    </TouchableOpacity>
                    {/*
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ShippingAddress', {item: item})
                    }
                    style={{
                      top: 10,
                      position: 'absolute',
                      paddingLeft: '68%',
                      alignItems: 'flex-end',
                      marginLeft: '15%',
                    }}>
                    <MaterialCommunityIcons
                      name="pencil"
                      color={colors.primaryColor}
                      size={22}
                    />
                  </TouchableOpacity>
                  */}
                  </View>
                </View>
              )}
            />
            <View style={{marginTop: 10}}>
              {/*
              <Dots
                length={shipingAddress.length}
                active={activePageIndex}
                activeColor={colors.primaryColor}
              />
              */}
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('ShippingAddress')}
            style={{
              backgroundColor: 'white',
              padding: 40,
              marginRight: 20,
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 20,
              borderRadius: 15,
              shadowColor: colors.primaryColor,
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              // flexDirection: 'row',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {/*
              <Entypo
                name="squared-plus"
                size={32}
                color={colors.primaryColor}
              />
              */}
              <Text
                style={{
                  fontFamily: secondaryFontfamily,
                  marginTop: 10,
                  marginLeft: 20,
                  color: 'gray',
                  fontSize: 14,
                }}>
                Click here to Add new shipping address
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <View
          style={{
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
          }}>
          <Text
            style={{
              fontFamily: secondaryFontfamily,
              color: 'black',
              fontSize: 14,
            }}>
            Payment Method
          </Text>

          {/*
          <TextInput
          placeholder="Enter upi id"
          onChangeText={text => setupi(text)}
          style={{backgroundColor: 'green'}}
        />
          <TouchableOpacity
            style={{position: 'absolute', right: 0, flexDirection: 'row'}}>
            <Entypo name="plus" size={20} color={colors.primaryColor} />
            <Text
              style={{
                fontFamily: secondaryFontfamily,
                color: colors.primaryColor,
                fontSize: 13,
              }}>
              Add New
            </Text>
          </TouchableOpacity>
            */}

          <TouchableOpacity
            onPress={() => setActivePaymentMethod('COD')}
            style={{
              marginTop: 20,

              height: 35,
              width: '100%',
              borderRadius: 10,

              justifyContent: 'center',
              backgroundColor: 'white',
              shadowColor: 'black',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: '10%', alignItems: 'center'}}>
                {/*
                <MaterialCommunityIcons
                  name="cash"
                  size={24}
                  color={colors.primaryColor}
                  style={{marginLeft: 10}}
                />
                */}
              </View>

              <Text
                style={{
                  fontFamily: secondaryFontfamily,
                  color: 'black',
                  marginLeft: 10,
                  fontSize: 14,
                }}>
                Cash On Delivery
              </Text>
              {ActivePaymentMethod === 'COD' && (
                <View style={{position: 'absolute', right: 10}}>
                  {/*
                  <AntDesign
                    name="checkcircle"
                    size={20}
                    color={colors.primaryColor}
                  />
                  */}
                </View>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActivePaymentMethod('UPI Payment')}
            style={{
              marginTop: 20,

              height: 35,
              width: '100%',
              borderRadius: 10,
              justifyContent: 'center',
              //alignItems:'center',
              backgroundColor: 'white',
              shadowColor: 'black',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: '10%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {/*
                <FontAwesome
                  name="credit-card-alt"
                  size={14}
                  color={colors.primaryColor}
                  style={{marginLeft: 10}}
                />
                */}
              </View>
              <Text
                style={{
                  fontFamily: secondaryFontfamily,
                  color: 'black',
                  marginLeft: 10,
                  fontSize: 14,
                }}>
                {Platform.OS == 'android'
                  ? 'UPI Payment'
                  : 'UPI / Card / Net Banking'}
              </Text>
            </View>
            {ActivePaymentMethod === 'UPI Payment' && (
              <View style={{position: 'absolute', right: 10}}>
                {/*
                <AntDesign
                  name="checkcircle"
                  size={20}
                  color={colors.primaryColor}
                />
                */}
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 40,
            marginLeft: 30,
            marginRight: 30,
            width: '90%',
          }}>
          <View style={{}}>
            <Text
              style={{
                fontFamily: secondaryFontfamily,
                color: 'gray',
                fontSize: 14,
              }}>
              Total No of Items:
            </Text>

            <View style={{position: 'absolute', right: 20}}>
              <Text
                style={{
                  fontFamily: secondaryFontfamily,
                  color: 'black',
                  fontSize: 14,
                }}>
                {item}
              </Text>
            </View>
          </View>

          <View style={{}}>
            <Text
              style={{
                fontFamily: secondaryFontfamily,
                fontSize: 14,
                color: 'gray',
              }}>
              Expected Delivery Date:
            </Text>

            <View style={{position: 'absolute', right: 20}}>
              <Text
                style={{
                  fontFamily: secondaryFontfamily,
                  fontSize: 14,
                  color: 'black',
                }}>
                {Expected_Delivery_Date}
              </Text>
            </View>
          </View>

          <View style={{}}>
            <Text
              style={{
                fontFamily: secondaryFontfamily,
                fontSize: 14,
                color: 'gray',
              }}>
              Bill Amount
            </Text>

            <View style={{position: 'absolute', right: 20}}>
              <Text
                style={{
                  fontFamily: secondaryFontfamily,
                  fontSize: 14,
                  color: 'black',
                }}>
                {/*total > 1000 ? 'Free' : item < 3 ? 'Rs.40' : 'Rs.70'*/}
                Rs. {total}
              </Text>
            </View>
          </View>

          <View style={{}}>
            <Text
              style={{
                fontFamily: secondaryFontfamily,
                fontSize: 14,
                color: 'gray',
              }}>
              Delivery Charge
            </Text>

            <View style={{position: 'absolute', right: 20}}>
              <Text
                style={{
                  fontFamily: secondaryFontfamily,
                  fontSize: 14,
                  color: 'black',
                }}>
                {/*total > 1000 ? 'Free' : item < 3 ? 'Rs.40' : 'Rs.70'*/}
                {DeliveryCharge == 0 ? 'Free' : `Rs. ${DeliveryCharge}`}
              </Text>
            </View>
          </View>

          {/*isfirstorder == true &&      
        <View style={{}}>
          <Text
            style={{
              fontFamily: secondaryFontfamily,
              fontSize: 14,
              color: 'gray',
            }}>
            Offer Applied
          </Text>

          <View style={{position: 'absolute', right: 20}}>
            <Text
              style={{
                fontFamily: secondaryFontfamily,
                fontSize: 14,
                color: 'red',
              }}>              
              Rs. -{Math.round(total * 20/100)}
            </Text>
          </View>
        
        </View>
     */}

          <View style={{width: '100%'}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={
                  () => ValidateAddress()
                  // navigation.navigate('OrderConfirmed')
                }
                style={{
                  height: 40,
                  width: '60%',
                  backgroundColor: colors.primaryColor,
                  marginTop: 20,
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
                  {ActivePaymentMethod == 'UPI Payment' ? 'Pay' : 'Place Order'}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  height: 30,
                  width: '35%',
                  marginRight: 20,

                  marginTop: 20,
                  borderRadius: 20,
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 24,
                    fontFamily: secondaryFontfamily,
                  }}>
                  Rs. {totalBillAmt}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Modal visible={viewLoader} transaparent={true}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              //backgroundColor: 'red',
            }}>
              {/*
            <LoaderKit
              style={{width: 50, height: 50}}
              name={'BallSpinFadeLoader'} // Optional: see list of animations below
              color={colors.primaryColor} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
            />
            */}

            <View
              style={{
                marginTop: 40,
                height: 50,
                width: '90%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 16,
                padding: 4,
              }}>
              <Text
                numberOfLines={0}
                style={{
                  fontFamily: primaryFontfamily,
                  color: 'white',
                  fontSize: 16,
                }}>
                Do not press the back button if you have completed the payment.
              </Text>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          // /onRequestClose={closeModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalMessage}>
                Are you sure you want to confirm this order?
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cancelbutton}
                  onPress={closeModal}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    console.log('Order confirmed');
                    ActivePaymentMethod == 'UPI Payment'
                      ? UPIPayment()
                      : PlaceOrder_API('COD');
                    closeModal();
                  }}>
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgba(0,0,0,0.5)',
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
});
