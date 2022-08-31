import React from 'react';
import { View, Image } from 'react-native';
import { NavigationContainer, getPathFromState } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import useAuth from '../contexts/auth';
import { NotifyProvider } from '../contexts/notify';

import LandingPage from '../screens/Landing';
import Invoices from '../screens/Invoices';
import Clints from '../screens/clients';
import Payments from '../screens/payments';
import PaymentHistory from '../screens/historyPayments';
import Settings from '../screens/settings';

import Theme from '../../theme';
import Rotta from '../assets/img/rotta.png';

import Loading from '../screens/loading';
import Login from '../screens/Login';
import ConnectionError from '../screens/connectionError';
import Comprovante from '../screens/historyPayments/comprovante';
import PaymentComplete from '../screens/Landing/PaymentComplete';

const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 500,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const opt = {
  transitionSpec: {
    open: config,
    close: config,
  },
  gestureEnabled: true

}

const Fallback = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Theme.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Image
        style={{
          width: 155,
          height: 40
        }}
        source={Rotta} />
    </View>
  )
}

const Routes = () => {
  const { isAuthenticated, networkErro } = useAuth();
  const config2 = {
    screens: {
      ...networkErro ?
        { ConnectionError: "/forca-vendas" } :
        {
          LandingPage: {
            path: '/admin/:rest',
            exact: false
          }
        }
    }
  }

  if (isAuthenticated) {
    return (
      <NotifyProvider>
        <NavigationContainer
          fallback={<Fallback />}
          linking={{
            prefixes: ["https://app.rottamobile.com.br"],
            config: { ...config2, initialRouteName: networkErro ? 'ConnectionError' : 'LandingPage' },
            getPathFromState(state, config) {
              let path = getPathFromState(state, config);
              const index = path.indexOf("?")
              if (index >= 0) {
                path = path.substr(0, index);
              }
              return path;
            }

          }}
        >
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              cardStyle: { backgroundColor: 'transparent' },
              presentation: 'transparentModal',
              gestureEnabled: true,
              gestureResponseDistance: 200,
              gestureDirection: 'horizontal',

            }}
            initialRouteName='LandingPage' >
            <Stack.Screen name={'LandingPage'} component={LandingPage} options={opt} />
            <Stack.Screen name={'Clints'} component={Clints} options={opt} />
            <Stack.Screen name={'Invoices'} component={Invoices} options={opt} />
            <Stack.Screen name={'Payments'} component={Payments} options={opt} />
            <Stack.Screen name={'PaymentHistory'} component={PaymentHistory} options={opt} />
            <Stack.Screen name={'Settings'} component={Settings} options={opt} />
            <Stack.Screen name={'ConnectionError'} component={ConnectionError} options={opt} />

            <Stack.Screen name={'Comprovante'} component={Comprovante}
              options={{ ...opt, cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS, gestureEnabled: false, }} />
            <Stack.Screen name={'PaymentComplete'} component={PaymentComplete}
              options={{ ...opt, cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS, gestureEnabled: false, }} />

          </Stack.Navigator>
        </NavigationContainer>
      </NotifyProvider>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen options={{ animationEnabled: false }} name={'Loading'} component={Loading} />
        <Stack.Screen options={{ animationEnabled: false }} name={'Login'} component={Login} />
        <Stack.Screen options={{ animationEnabled: false }} name={'ConnectionError'} component={ConnectionError} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes;
