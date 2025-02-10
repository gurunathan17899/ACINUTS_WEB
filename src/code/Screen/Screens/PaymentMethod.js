import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {colors, primaryFontfamily, secondaryFontfamily} from '../Configuration';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';




const PaymentMethod = ({navigation}) => {
  // const [primarycolor, setPrimaryColor] = useState('darkblue')
  
  const [Discount,setDiscount ] = useState(0)
//   const Pay = () =>{
//     RNUpiPayment.initializePayment(
//         {
//           vpa: 'john@upi', // or can be john@ybl or mobileNo@upi
//           payeeName: 'John Doe',
//           amount: '1',
//           transactionRef: 'aasf-332-aoei-fn',
//         },
//         successCallback,
//         failureCallback
//       );

//       function successCallback(data) {
//         console.log(data);
//       }
      
//       function failureCallback(data) {
//         console.log(data);
//               }
// }

const UPIPayment = ()=>{
  // initiateTransaction({
  //   upi: 'gurunathans17899@okaxis', // Required
  //   transactionId: 'transaction_id', // Required
  //   currency: 'INR', // Currency Code (Required)
  //   merchantCategoryCode: 'Merchant Category Code', // Four digit Code. (Required)
  //   payeeName: 'Name of the Payee', // Required
  //   amount: '1', // Amount must be in String and must be greater than 1.00 (Required)
  //   note: 'test', // Additional Notes or description (Optional)
  // })
  //   .then(res => {
  //     console.log(res, 'RESPONSE');
  //   })
  //   .catch(e => {
  //     console.log(e.message, 'ERROR');
  //   });
}


  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: 20, flexDirection: 'row', width: '100%'}}>
        <View
          style={{
            //height: '100%',
            width: '20%',
            //backgroundColor: "#3498db",

            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={32} color={colors.primaryColor} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '60%',
          }}>
          <Text
            style={{
              color: colors.primaryColor,
              fontSize: 20,

              fontFamily: primaryFontfamily,
            }}>
            Payment Method
          </Text>
        </View>
      </View>

      <View style={{marginTop: 20, marginLeft: 30, marginRight: 30}}>
        {/*
        <Text
          style={{
            color: 'black',
            fontFamily: secondaryFontfamily,
            fontSize: 14,
          }}>
          Deliver to
        </Text>

        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Entypo name="location-pin" size={20} color="black" />
          <Text
            style={{
              color: colors.primaryColor,
              fontFamily: secondaryFontfamily,
              fontSize: 13,
            }}>
            New street,chidambaram
          </Text>
        </View>

          */}

        <View
          style={{
            marginTop: 20,
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

          <View
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
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '10%', alignItems: 'center'}}>
                <MaterialCommunityIcons
                  name="cash"
                  size={24}
                  color={colors.primaryColor}
                  style={{marginLeft: 10}}
                />
              </View>

              <Text
                style={{
                  fontFamily: secondaryFontfamily,
                  color: 'black',
                  marginLeft: 10,
                  fontSize: 13,
                }}>
                Cash On Delivery
              </Text>
            </View>
          </View>
          <TouchableOpacity
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
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '10%', alignItems: 'center'}}>
                <FontAwesome
                  name="credit-card-alt"
                  size={14}
                  color={colors.primaryColor}
                  style={{marginLeft: 10}}
                />
              </View>
              <Text
                style={{
                  fontFamily: secondaryFontfamily,
                  color: 'black',
                  marginLeft: 10,
                  fontSize: 13,
                }}>
                UPI Payment
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/*
        <View
          style={{
            marginTop: 40,
          }}>
          <Text
            style={{
              fontFamily: secondaryFontfamily,
              color: 'black',
              fontSize:14
            }}>
            Offers
          </Text>

          <TouchableOpacity
            style={{position: 'absolute', right: 0,flexDirection: 'row'}}>
            <Entypo name="plus" size={20} color={colors.primaryColor} />
            <Text
              style={{
                fontFamily:secondaryFontfamily,
                color: colors.primaryColor,
                fontSize:13
              }}>
              Add New
            </Text>
          </TouchableOpacity>
          <View
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
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '10%', alignItems: 'center',justifyContent:'center'}}>
                <FontAwesome
                  name="percent"
                  size={14}
                  color={colors.primaryColor}
                  style={{marginLeft: 10}}
                />
              </View>
              <Text
                style={{
                  fontFamily: secondaryFontfamily,
                  color:colors.primaryColor,
                  marginLeft: 10,
                  fontSize: 14,
                }}>
                50 off
              </Text>
            </View>
          </View>
        </View>
              */}
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
            Sub Total
          </Text>

          <View style={{position: 'absolute', right: 20}}>
            <Text
              style={{
                fontFamily: secondaryFontfamily,
                color: 'black',
                fontSize: 14,
              }}>
              Rs. 890
            </Text>
          </View>
        </View>

        {Discount != 0 && (
          <View style={{}}>
            <Text
              style={{
                fontFamily: secondaryFontfamily,
                fontSize: 14,
                color: 'gray',
              }}>
              Discount
            </Text>

            <View style={{position: 'absolute', right: 20}}>
              <Text
                style={{
                  fontFamily: secondaryFontfamily,
                  fontSize: 14,
                  color: 'red',
                }}>
                -Rs. 50
              </Text>
            </View>
          </View>
        )}

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
              Rs. 40
            </Text>
          </View>
        </View>

        <View style={{width: '100%'}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={
                () => UPIPayment()
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
                Pay
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
                Rs. 800
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({});
