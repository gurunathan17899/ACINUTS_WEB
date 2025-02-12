import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Launch from '../Screen/Launch';
import SignIn from '../Screen/Authentication/SignIn';
import Signup from '../Screen/Signup';
import AllCategories from '../Screen/AllCategories';
import Dashboard from '../Screen/Dashboard';
import Search from '../Screen/Search';
import CategoryItemList from '../Screen/CategoryItemList';
import ItemDetails from '../Screen/ItemDetails';
import Cart from '../Screen/Cart';
import MyOrders from '../Screen/Myorders';
import PlaceOrder from '../Screen/PlaceOrder';
import Profile from '../Screen/Profile';

const Stack = createNativeStackNavigator();

const Appnavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Launch"
          component={Launch}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Dashboard"
          component={AllCategories}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="CategoryItemList"
          component={CategoryItemList}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ItemDetails"
          component={ItemDetails}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="MyOrders"
          component={MyOrders}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Buynow"
          component={PlaceOrder}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Appnavigation;
