import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../view/LoginScreen';
import CryptoList from '../view/CryptoListScreen';
import CryptoChart from '../view/CryptoChartScreen';
import {useSelector} from 'react-redux';
import {ROUTES} from './routes';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const userName = useSelector(state => state.auth?.userName);
  return (
    <Stack.Navigator>
      {userName ? (
        <>
          <Stack.Screen name={ROUTES.CRYPTO_LIST} component={CryptoList} />
          <Stack.Screen name={ROUTES.CRYPTO_CHART} component={CryptoChart} />
        </>
      ) : (
        <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      )}
    </Stack.Navigator>
  );
};
