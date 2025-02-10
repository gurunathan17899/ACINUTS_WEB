import {
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {colors, primaryFontfamily, secondaryFontfamily} from '../Configuration';
import IonIcons from "react-native-vector-icons/Ionicons"


const Category = ({navigation}) => {

  const [selectedCategory,setSelectedCategory] = useState("All")  
  const [CategoryList, setCategoryList] = useState([
    {id: 1, name: 'All'},
    {id: 2, name: 'ALMOND'},
    {id: 3, name: 'Berries'},
    {id: 4, name: 'CANDY'},
    {id: 5, name: 'CASHEWS'},
    {id: 6, name: 'COMBO'},
    {id: 7, name: 'DATES'},
    {id: 8, name: 'FIG'},
    {id: 9, name: 'GIFT BOXES'},
    {id: 10, name: 'Honey'},
    {id: 11, name: 'MILLETS'},
    {id: 12, name: 'NUTS'},
    {id: 13, name: 'Others'},
    {id: 14, name: 'Palm Products'},
    {id: 15, name: 'Pista'},
    {id: 16, name: 'RAISINS'},
    {id: 17, name: 'SAFFRON'},
    {id: 18, name: 'SEEDS'},
    {id: 19, name: 'SPICES'},
    {id: 20, name: 'Walnut'},
  ]);

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerStyle: {
          borderBottomWidth: 0,
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

        headerTitle: () => (
          <Text
            style={{
              fontWeight: '600',
              color: 'white',
              fontSize: 20,
              fontFamily: primaryFontfamily,
            }}>
            Category List
          </Text>
        ),
      });
    }, [navigation]),
  );

  return (
    <View style={{flex: 1, paddingTop: 20}}>
      <FlatList
        data={CategoryList}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
          onPress={()=>navigation.navigate("CategoryItemList",{category: item.name})}
            style={{
              marginLeft: 20,
              marginRight: 20,
              backgroundColor: 'white',
              marginBottom: 20,
              borderRadius: 10,
              padding: 10,
              flexDirection: 'row',
            }}>
            <View>
              <Image
                source={require('../assets/ACI_1.jpeg')}
                style={{height: 50, width: 50}}
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 20,
              }}>
              <Text
                style={{
                  fontFamily: secondaryFontfamily,
                  fontWeight: '600',
                  color: 'black',
                }}>
                {item.name}
              </Text>
            </View>
            {/*item.name == selectedCategory &&
            <View style={{position:'absolute',right:20,justifyContent:'center',alignItems:'center',top:20}}>
                <IonIcons name="checkmark-circle-sharp" color={"green"} size={22}/>
              </View>*/}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({});
