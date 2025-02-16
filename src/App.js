import React from 'react';
import {Text, View} from 'react-native';
import Appnavigation from './code/navigation/Appnavigation';
import {MyProvider} from './Context/MyContext';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  return (
    <View style={{flex: 1}}>
      <MyProvider>
        <Appnavigation />
        <ToastContainer />
      </MyProvider>
    </View>
  );
};

export default App;

//sss
