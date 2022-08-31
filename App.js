/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Dimensions,
  StatusBar,
  View
} from 'react-native';
import { AuthProvider } from './src/contexts/auth';
import { PaymentProvider } from './src/contexts/payments';
import Routes from './src/navigation';

const App = () => {

  return (
    <AuthProvider>
      <PaymentProvider>
        <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={'transparent'} />
          <Routes />
      </PaymentProvider>
    </AuthProvider>
  );
};

export default App;
