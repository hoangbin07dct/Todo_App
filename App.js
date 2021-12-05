import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import RouterNative from './routers/Index';
import store from './Redux/Store';

// StatusBar.setHidden(true);
const App = () => {
  return (
    <Provider store={store}>
      <RouterNative />
    </Provider>
  );
};

export default App;
