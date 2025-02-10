import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

const PaytmPaymentScreen = () => {
    return <WebView source={{ uri: 'https://paytm.business/link/onlinePayment?linkName=Test&linkId=LL_708464463' }} style={{ flex: 1 }} />;

}

export default PaytmPaymentScreen

const styles = StyleSheet.create({})