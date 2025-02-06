import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Launch from '../Screen/Launch';
import SignIn from '../Screen/SignIn';
import Signup from '../Screen/Signup';
import AllCategories from '../Screen/AllCategories';
import Dashboard from '../Screen/Dashboard';
import Search from '../Screen/Search';

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
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Appnavigation;
