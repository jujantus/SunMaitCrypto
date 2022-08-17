import React from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/state/store';
import {NavigationContainer} from '@react-navigation/native';

import {PersistGate} from 'redux-persist/lib/integration/react';
import {RootNavigator} from './src/navigation/RootNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
