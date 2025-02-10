import { FlatList, StyleSheet, Text, TouchableOpacity, View,Linking, Modal,TouchableWithoutFeedback,TextInput, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import { LightFontfamily, colors, primaryFontfamily, secondaryFontfamily } from '../Configuration';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { useFocusEffect } from '@react-navigation/native';
import { convertToCustomDateFormat } from '../Helper/utils';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { showMessage } from 'react-native-flash-message';
import { CancelOrder } from '../Network/API';
import { MyContext } from '../Context/MyContext';


const OrderedItemList = ({navigation,route}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);  
  const [selectedReason, setSelectedReason] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const {Token} = useContext(MyContext)

  const order_DTL =route.params.order;  
  console.log("order_DTL:"+JSON.stringify(order_DTL))

  const handleCancelOrder = order => {   
    setIsModalVisible(true);
  };

  const handleSubmitCancellation = () => {
    const cancellation_Reason = `${selectedReason} - ${additionalInfo}`;
    if(selectedReason!=null && additionalInfo !== ""){

    
    CancelOrder(
      Token,
      route.params.order.Order_ID,
      cancellation_Reason,
    )
      .then(res => {
        if (res.data.data === 1) {
          showMessage({
            message:
              'Cancellation Requested, Your order cancellation has been requested.',
            type: 'success',
          });
          setIsModalVisible(false);
        } else {
          showMessage({
            message: res.data.message,
            type: 'danger',
          });
          setIsModalVisible(false);
        }
      })
      .catch(error => {
        console.error('Error occurred:', error);
        showMessage({
          message: 'Please try again later.',
          type: 'danger',
        });
        setIsModalVisible(false);
      });
    }else if(selectedReason == null){
      showMessage({
        message: 'Please select the reason',
        type: 'danger',
        duration: 1000,
      });
    }else if(additionalInfo == ""){
      showMessage({
        message: 'Please provide me more details.',
        type: 'danger',
        duration: 1000,
      });
    }    
  };
   
  const createPDF = async data => {
    // Generate HTML content dynamically based on data
    const generateHTML = items => {
      const rows = items
        .map(
          (item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${item.itemname}</td>
            <td style="text-align: right;">${item.Rate}</td>
            <td style="text-align: center;">${item.QTY}</td>
            <td style="text-align: right;">${(item.Rate * item.QTY).toFixed(2)}</td>
            <td style="text-align: right;">0.00</td>
            <td style="text-align: right;">${((item.Rate * item.QTY) + (item.Tax || 0.00)).toFixed(2)}</td>
          </tr>
        `
        )
        .join('');
  
      return `<!DOCTYPE html>
      <html>
      <head>
          <title>ACI TRADERS Invoice</title>
          <meta charset="utf-8">
          <style>
              body {
                  font-family: Arial, sans-serif;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  min-height: 95vh;
                  background-color: #f5f5f5;
              }
              .document-container {
                  max-width: 750px;
                  margin: 20px;
                  padding: 20px;
                  border: 2px solid black;
                  border-radius: 10px;
                  background-color: white;
                  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);        
              }
              table, th, td {
                  border: 1px solid black;
                  border-collapse: collapse;
                  padding: 5px;
              }
              .header-container {
                  margin-bottom: 20px;
              }
              .company-details-table {
                  width: 100%;
                  border: none;
              }
              .company-details-table td {
                  border: none;
              }
              .company-name {
                  font-size: 18px;
                  font-weight: bold;
                  font-family: Merriweather, sans-serif;
              }
              .company-info {
                  font-size: 16px;
                  text-align: left;
                  margin-left: 20px;
                  line-height: 1.4;
                  padding-left: 40px;
                  font-weight: normal;
              }
              .amt-section {
                  text-align: right;
                  margin-top: 20px;
              }
              .amt-section h3 {
                  font-weight: bold;
              }
          </style>
      </head>
      <body>
          <div class="document-container">
              <div class="header-container">
                  <table class="company-details-table">
                      <tr>
                          <td class="company-name">
                          <img src="https://www.acinuts.com/images/aci_logo.png" 
                            alt="Company Logo" 
                             width="100" height="100" 
                             style="vertical-align: middle; margin-right: 5px;"/>
                              <p>ACI TRADERS</p>
                              <p>GSTN: 33CDCPD0996B1Z2</p>
                          </td>
                          <td class="company-info">
                              Agro Chakra International<br>
                              ACI TRADERS<br>
                              No. 275, Astalakshmi Nagar, <br>
                              Alapakkam, Chennai- 600 095<br>
                              Phone: +91 8939664422 / +91 8939383940<br>
                              E-mail: agrochakra@gmail.com<br>
                              Website: www.acinuts.com
                          </td>
                      </tr>
                  </table>
              </div>
  
              <h3>Customer / Invoice Details</h3>
              <table style="width: 100%;">
                  <tr>
                      <td><strong>Customer Name</strong></td>
                      <td>${order_DTL.address.split(' ')[0]}</td>
                      <td><strong>Invoice Number</strong></td>
                      <td>${order_DTL.Order_ID}</td>
                  </tr>
                  <tr>
                      <td><strong>Customer Number</strong></td>
                      <td>${order_DTL.contactno}</td>
                      <td><strong>Invoice Date</strong></td>
                      <td>${order_DTL.Order_Date}</td>
                  </tr>
                  <tr>
                      <td><strong>Customer Address</strong></td>
                      <td colspan="3">${order_DTL.address}</td>
                  </tr>
                  <tr>
                      <td><strong>Invoice Amount</strong></td>
                      <td>Rs. ${order_DTL.Total_Amount}</td>
                      <td><strong>Order Type</strong></td>
                      <td>Online</td>
                  </tr>
                  <tr>
                      <td><strong>Invoice Payment Type</strong></td>
                      <td>${order_DTL.payment_method}</td>
                      <td></td>
                      <td></td>
                  </tr>
              </table>
  
              <h3>Product Details</h3>
              <table style="width: 100%;">
                  <tr>
                      <th>S No</th>
                      <th>Product Name</th>
                      <th>Unit Cost</th>
                      <th>Qty</th>
                      <th>Sub Total</th>
                      <th>Tax</th>
                      <th>Sub Total with Tax</th>
                  </tr>
                  ${rows}
                  <tr>
                      <td colspan="4" style="text-align: right;"><strong>Delivery Charge</strong></td>
                      <td style="text-align: right;"></td>
                      <td style="text-align: right;"></td>
                      <td style="text-align: right;">${order_DTL.DeliveryCharge}</td>
                  </tr>
                  <tr>
                      <td colspan="4" style="text-align: right;"><strong>Discount (-)</strong></td>
                      <td style="text-align: right;"></td>
                      <td style="text-align: right;"></td>
                      <td style="text-align: right;">0.00</td>
                  </tr>
                  <tr>
                      <td colspan="4" style="text-align: right;"><strong>Total</strong></td>
                      <td style="text-align: right;"></td>
                      <td style="text-align: right;"></td>
                      <td style="text-align: right;">${order_DTL.Total_Amount}</td>
                  </tr>
              </table>
  
              <h3>Remarks / Notes (For ACI Traders): </h3>
  
              <h3>Declaration:</h3>
              <ol>
                  <li>This invoice shows the actual price of the goods described and that all particulars are true.</li>
                  <li>All disputes subject to Chennai jurisdiction.</li>
              </ol>
  
              <div style="text-align: right;">
                  <p>Authorized Signatory</p>
              </div>
          </div>
      </body>
      </html>`;
    };
  
    // HTML content based on passed data
    const htmlContent = generateHTML(data);
  
    let options = {
      html: htmlContent,
      fileName: 'ACI_Invoice',
      directory: RNFS.DownloadDirectoryPath,
    };
  
    try {
      let file = await RNHTMLtoPDF.convert(options);
      console.log('PDF file path:', file.filePath);
  
      const exists = await RNFS.exists(file.filePath);
      if (exists) {
        FileViewer.open(file.filePath)
          .then(() => console.log('File opened successfully'))
          .catch(err => console.error('Error opening file:', err));
      } else {
        console.error('File does not exist:', file.filePath);
        Alert.alert('File Error', 'The file does not exist.');
      }
    } catch (err) {
      console.error('Error generating PDF:', err);
      Alert.alert('Error', 'Failed to generate PDF.');
    }
  };
  

    console.log("route param:"+JSON.stringify(route.params))
    const handleDialPress = () => {
        const phoneNumber = '+91 9841418761'; // Replace with the phone number you want to dial
        Linking.openURL(`tel:${phoneNumber}`);
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
            headerLeft: () => Platform.OS =="ios" &&(
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
                Order No #{route.params.order.Order_ID}
              </Text>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={()=>createPDF(route.params.items)}
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <FontAwesome name="share-square-o" size={20} color={"white"}/>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: secondaryFontfamily,
                    color: 'white',
                    marginRight:0
                  }}>
                  PDF
                </Text>
              </TouchableOpacity>
            ),
          });
        }, [navigation]),
      );

  return (
    <View style={{flex: 1}}>
      <View
        style={{
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
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: secondaryFontfamily,
              fontSize: 16,
            }}>
            {convertToCustomDateFormat(route.params.order.Order_Date)}
          </Text>
          <View
            style={{
              position: 'absolute',
              right: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: secondaryFontfamily,
                fontSize: 16,
              }}>
              ₹ {route.params.order.Total_Amount}
            </Text>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              marginRight: 10,
              marginBottom: 10,
            }}>
            <View style={{marginTop: 5}}>
              <EvilIcons
                name="location"
                color={colors.primaryColor}
                size={22}
              />
            </View>
            <Text
              style={{
                fontFamily: LightFontfamily,
                color: 'black',
                marginTop: 5,
                fontSize: 12,
                marginLeft: 10,
              }}>
              {route.params.order.address}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginRight: 10,
              marginBottom: 10,
            }}>
            <View style={{marginTop: 2}}>
              <FontAwesome name="phone" color={colors.primaryColor} size={22} />
            </View>
            <Text
              style={{
                fontFamily: LightFontfamily,
                color: 'black',
                marginTop: 5,
                fontSize: 12,
                marginLeft: 10,
              }}>
              {order_DTL.contactno}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginRight: 10,
              marginBottom: 10,
            }}>
            <View style={{marginTop: 4, justifyContent: 'center'}}>
              <MaterialIcons
                name="delivery-dining"
                color={colors.primaryColor}
                size={22}
              />
            </View>
            {route.params.order.Delivery_Status == 'Cancelled' ? (
              <Text
                style={{
                  fontFamily: LightFontfamily,
                  color: 'black',
                  marginTop: 5,
                  fontSize: 12,
                  marginLeft: 10,
                }}>
                {route.params.order.Delivery_Status}
              </Text>
            ) : (
              <Text
                style={{
                  fontFamily: LightFontfamily,
                  color: 'black',
                  marginTop: 5,
                  fontSize: 12,
                  marginLeft: 10,
                }}>
                {route.params.order.Delivery_Status} - (Expected Delivery:{' '}
                {route.params.order.Expected_Delivery_Date})
              </Text>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginRight: 10,
              marginBottom: 10,
            }}>
            <View style={{marginTop: 4, justifyContent: 'center'}}>
              <MaterialIcons
                name="payment"
                color={colors.primaryColor}
                size={22}
              />
            </View>
            <Text
              style={{
                fontFamily: LightFontfamily,
                color: 'black',
                marginTop: 8,
                fontSize: 12,
                marginLeft: 10,
              }}>
              {route.params.order.payment_method}
            </Text>
          </View>
        </View>

        {route.params.order.Delivery_Status !== 'Cancelled' &&
          route.params.order.Delivery_Status != 'InProgress' && (
            <View style={{flexDirection: 'row-reverse'}}>
              <TouchableOpacity
                onPress={() => handleCancelOrder()}
                style={{borderWidth: 0.4, padding: 10, borderRadius: 10}}>
                <Text
                  style={{
                    fontFamily: secondaryFontfamily,
                    color: colors.primaryColor,
                    fontSize: 12,
                  }}>
                  Cancel Order
                </Text>
              </TouchableOpacity>
            </View>
          )}
      </View>

      <View
        style={
          route.params.items.length > 8
            ? styles.FlatListView
            : styles.OptionalFlatlist
        }>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{width: '38%', marginLeft: 10, marginTop: 10}}>
            <Text
              style={{
                color: colors.primaryColor,
                fontFamily: secondaryFontfamily,
                fontSize: 14,
              }}>
              NAME
            </Text>
          </View>
          <View
            style={{
              width: '20%',
              marginLeft: 10,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.primaryColor,
                fontFamily: secondaryFontfamily,
                fontSize: 14,
              }}>
              UOM
            </Text>
          </View>
          <View style={{marginLeft: 10, marginTop: 10}}>
            <Text
              style={{
                color: colors.primaryColor,
                fontFamily: secondaryFontfamily,
                fontSize: 14,
              }}>
              QTY
            </Text>
          </View>
          <View style={{marginTop: 10, position: 'absolute', right: 10}}>
            <Text
              style={{
                color: colors.primaryColor,
                fontFamily: secondaryFontfamily,
                fontSize: 14,
              }}>
              PRICE (₹)
            </Text>
          </View>
        </View>

        <FlatList
          data={route.params.items}
          //keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <View style={{marginLeft: 10, marginTop: 0, width: '38%'}}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: secondaryFontfamily,
                    fontSize: 13,
                    paddingRight: 15,
                    // fontWeight:'400'
                  }}>
                  {item.itemname}
                </Text>
              </View>
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 0,
                  width: '20%',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: secondaryFontfamily,
                    fontSize: 13,
                  }}>
                  {item.UOM}
                </Text>
              </View>
              <View style={{marginTop: 0, width: '15%', alignItems: 'center'}}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: secondaryFontfamily,
                    fontSize: 13,
                  }}>
                  {item.QTY}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 0,
                  position: 'absolute',
                  right: 10,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: secondaryFontfamily,
                    fontSize: 14,
                  }}>
                  {item.Rate}
                </Text>
              </View>
            </View>
          )}
        />
        <View
          style={{
            backgroundColor: colors.primaryColor,
            marginTop: 10,
            marginBottom: 0,
            paddingVertical: 10,
            alignItems: 'flex-end',
            paddingRight: 16,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: secondaryFontfamily,
              color: 'white',
              marginTop: 4,
            }}>
            Total Item Net Amount: ₹{order_DTL.Bill_Amount}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: secondaryFontfamily,
              color: 'white',
              marginTop: 4,
            }}>
            Delivery Charge: ₹{order_DTL.DeliveryCharge}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: secondaryFontfamily,
              color: 'white',
              marginTop: 4,
            }}>
            Total Bill Amount: ₹{order_DTL.Total_Amount}
          </Text>
        </View>
      </View>
      {/*
      <View style={{position: 'absolute', bottom: 10, width: '100%'}}>
        <TouchableOpacity
          onPress={() => handleDialPress()}
          style={{
            //alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
            padding: 15,
            backgroundColor: colors.primaryColor,
            borderRadius: 15,
            flexDirection: 'row',
          }}>
          <MaterialIcons name="phone" size={22} color={'white'} />
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              marginLeft: 10,
              fontFamily: secondaryFontfamily,
            }}>
            Call Support{' '}
          </Text>
        </TouchableOpacity>
      </View>
      */}

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
          {[
            'I want to change the payment option',
            'I want to change the delivery address',
            'I was hoping for a shorter delivery time',
            'My reasons are not listed here',
            'I want to change the contact details',
          ].map((reason, index) => (
            <TouchableOpacity
              key={index}
              style={styles.radioContainer}
              onPress={() => setSelectedReason(reason)}>
              <View
                style={[
                  styles.radioCircle,
                  selectedReason === reason && {
                    backgroundColor: colors.primaryColor,
                  },
                ]}>
                {selectedReason === reason && (
                  <View style={styles.selectedRadio} />
                )}
              </View>
              <Text
                style={[
                  styles.radioText,
                  selectedReason === reason && {color: colors.primaryColor},
                ]}>
                {reason}
              </Text>
            </TouchableOpacity>
          ))}
          {selectedReason && (
            <TextInput
              style={styles.additionalInput}
              placeholder="Please provide more details"
              value={additionalInfo}
              onChangeText={text => setAdditionalInfo(text)}
            />
          )}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => handleSubmitCancellation()}>
            <Text style={styles.submitButtonText}>Submit Request</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default OrderedItemList

const styles = StyleSheet.create({
  FlatListView: {
    height: '60%',
    backgroundColor: 'white',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40,
    //paddingBottom:200,
    //paddingBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  OptionalFlatlist: {
    //height:'60%',
    backgroundColor: 'white',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40,
    //paddingBottom:200,
    //paddingBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 1,
    left: 1,
    right: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontFamily: primaryFontfamily,
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: colors.primaryColor,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.primaryColor,
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  },
  additionalInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: 'black',
    fontFamily: secondaryFontfamily,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: colors.primaryColor,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 0.3,
    alignItems: 'center',
    elevation: 1,
    width: '50%',
  },
  actionText: {
    fontFamily: primaryFontfamily,
    fontSize: 16,
    color: colors.primaryColor,
  },
});
