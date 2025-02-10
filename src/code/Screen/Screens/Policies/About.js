import { StyleSheet, Text, View ,ScrollView,TouchableOpacity,TextInput, SafeAreaView, Platform} from 'react-native'
import React from 'react'
import {colors, primaryFontfamily, secondaryFontfamily} from '../../Configuration';
import Icon from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

const About = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <View
          style={{
            marginTop: Platform.OS == 'ios' ? 0 : 30,
            flexDirection: 'row',
            width: '100%',
          }}>
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
                fontWeight: '600',
                fontFamily: primaryFontfamily,
              }}>
              Contact Us
            </Text>
          </View>
        </View>
        <View style={{marginTop: 20, marginLeft: 20, marginRight: 20}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginBottom: 40}}>
            <View style={{backgroundColor: 'white'}}>
              <View style={{marginLeft: 10, marginBottom: 10}}>
                <Text style={[styles.phonemail, {color: 'gray'}]}>Phone:</Text>
                <Text style={styles.phonemail}>+91 89392 66555</Text>
                <Text style={styles.phonemail}>+91 98414 18761</Text>
                <Text style={styles.phonemail}>+91 98411 82818</Text>
                <Text style={[styles.phonemail, {color: 'gray'}]}>Email:</Text>
                <Text style={styles.phonemail}>agrochakra@gmail.com</Text>
                <Text style={[styles.phonemail, {color: 'gray'}]}>Website</Text>
                <Text style={styles.phonemail}>www.acinuts.com</Text>
              </View>
            </View>
            <View style={{backgroundColor: 'white', marginTop: 20}}>
              <View style={{marginLeft: 20, marginBottom: 20}}>
                <Text style={[styles.phonemail, {color: 'gray'}]}>
                  Sales & Distribution Office:
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Entypo
                    name="dot-single"
                    size={32}
                    color={colors.primaryColor}
                    style={{marginTop: 5}}
                  />
                  <Text style={styles.phonemail}>No. G/A-184,</Text>
                </View>
                <Text style={[styles.phonemail, {marginLeft: 30}]}>
                  Whole sale food grain market,
                </Text>
                <Text style={[styles.phonemail, {marginLeft: 30}]}>
                  Koyambedu, Chennai,
                </Text>
                <Text style={[styles.phonemail, {marginLeft: 30}]}>
                  Tamil Nadu-600092
                </Text>

                <View style={{borderTopWidth: 1, width: '95%', marginTop: 20}}>
                  <Text style={[styles.phonemail, {color: 'gray'}]}>
                    Processing Unit:
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Entypo
                      name="dot-single"
                      size={32}
                      color={colors.primaryColor}
                      style={{marginTop: 5}}
                    />
                    <Text style={styles.phonemail}>56, Kambar Street,</Text>
                  </View>
                  <Text style={[styles.phonemail, {marginLeft: 30}]}>
                    Manadikuppam,Panruti TK,
                  </Text>
                  <Text style={[styles.phonemail, {marginLeft: 30}]}>
                    Cuddalore Dist,
                  </Text>
                  <Text style={[styles.phonemail, {marginLeft: 30}]}>
                    Tamil Nadu-607805
                  </Text>
                </View>
                {/*
              <View style={{borderTopWidth: 1, width: '95%', marginTop: 20}}>
                <Text style={[styles.phonemail, {color: 'gray'}]}>
                  Packing Unit:
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Entypo
                    name="dot-single"
                    size={32}
                    color={colors.primaryColor}
                    style={{marginTop: 5}}
                  />
                  <Text style={styles.phonemail}>No. 6/52, 12th Street,</Text>
                </View>
                <Text style={[styles.phonemail, {marginLeft: 30}]}>
                Astalakshmi Nagar,
                </Text>
                <Text style={[styles.phonemail, {marginLeft: 30}]}>
                Alapakkam, Chennai-600095
                </Text>
              </View>
              */}
              </View>
            </View>
            {/*
          <View style={{backgroundColor: 'white', marginTop: 20}}>
            <View style={{marginLeft: 20, marginBottom: 20, marginTop: 20}}>
              <View
                style={{
                  height: 40,
                  width: '95%',
                  borderWidth: 1,
                  borderColor: 'gray',
                }}>
                <TextInput
                  placeholder="Your Name"
                  placeholderTextColor={'black'}
                  style={{marginLeft: 10}}
                />
              </View>
              <View
                style={{
                  height: 40,
                  width: '95%',
                  borderWidth: 1,
                  borderColor: 'gray',
                  marginTop: 20,
                }}>
                <TextInput
                  placeholder="Your Email"
                  placeholderTextColor={'black'}
                  style={{marginLeft: 10}}
                />
              </View>
              <View
                style={{
                  height: 40,
                  width: '95%',
                  borderWidth: 1,
                  borderColor: 'gray',
                  marginTop: 20,
                }}>
                <TextInput
                  placeholder="Subject"
                  placeholderTextColor={'black'}
                  style={{marginLeft: 10}}
                />
              </View>
              <View
                style={{
                  height: 100,
                  width: '95%',
                  borderWidth: 1,
                  borderColor: 'gray',
                  marginTop: 20,
                }}>
                <TextInput
                  placeholder="Message"
                  placeholderTextColor={'black'}
                  style={{marginLeft: 10}}
                />
              </View>
            </View>
            <TouchableOpacity
              style={{
                height: 40,
                width: '50%',
                backgroundColor: colors.primaryColor,
                marginLeft: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Send Message</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 30}} />
            */}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default About

const styles = StyleSheet.create({
    phonemail:{
        color:'black',fontSize: 14,marginTop:10,
              fontFamily: secondaryFontfamily
    }
})