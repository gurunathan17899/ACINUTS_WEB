import { StyleSheet, Text, View ,ScrollView,TouchableOpacity,TextInput, SafeAreaView, Platform} from 'react-native'
import React from 'react'
import {
  colors,
  primaryFontfamily,
  secondaryFontfamily,
} from '../../../Configuration';

//import Entypo from 'react-native-vector-icons/Entypo';

const About = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.primaryColor}}>
      <View
        style={{
          flex: 1,
          padding: 16,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            width: '100%',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
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
            <View style={{}}>
              <View style={{marginLeft: 10, marginBottom: 10}}>
                <Text style={[styles.heading]}>Phone:</Text>
                <Text style={styles.phonemail}>+91 89392 66555</Text>
                <Text style={styles.phonemail}>+91 98414 18761</Text>
                <Text style={styles.phonemail}>+91 98411 82818</Text>
                <Text style={[styles.heading]}>Email:</Text>
                <Text style={styles.phonemail}>agrochakra@gmail.com</Text>
                <Text style={[styles.heading]}>Website</Text>
                <Text style={styles.phonemail}>www.acinuts.com</Text>
              </View>
            </View>
            <View style={{marginTop: 0}}>
              <View style={{marginLeft: 10, marginBottom: 20}}>
                <Text style={[styles.heading]}>
                  Sales & Distribution Office:
                </Text>
                <View style={{}}>
                  {/*
                  <Entypo
                    name="dot-single"
                    size={32}
                    color={colors.primaryColor}
                    style={{marginTop: 5}}
                  />
                  */}
                  <Text style={styles.phonemail}>
                    No. G/A-184, Whole sale food grain market,
                  </Text>
                  <Text style={[styles.phonemail, {marginLeft: 0}]}>
                    Koyambedu, Chennai,Tamil Nadu-600092
                  </Text>
                </View>

                <View style={{width: '95%', marginTop: 20}}>
                  <Text style={[styles.heading]}>Processing Unit:</Text>
                  <View style={{flexDirection: 'row'}}>
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
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default About

const styles = StyleSheet.create({
  phonemail: {
    color: 'black',
    fontSize: 14,
    marginTop: 10,
    fontFamily: secondaryFontfamily,
  },
  heading: {
    color: colors.primaryColor,
    fontSize: 16,
    fontFamily: primaryFontfamily,
    fontWeight: '600',
    marginTop: 16,
  },
});