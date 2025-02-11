import React from 'react';
import {Text, View} from 'react-native';
import Appnavigation from './code/navigation/Appnavigation';
import {MyProvider} from './Context/MyContext';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <MyProvider>
        <Appnavigation />
      </MyProvider>
    </View>
  );
};

export default App;

//sss
