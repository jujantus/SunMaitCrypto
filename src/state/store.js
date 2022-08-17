import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {STATE_MODULES} from './constants';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './auth';
import coinsReducer from './coins';
import {coinListListener, coinDetailListener} from './middleware';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [STATE_MODULES.COINS],
};

const coinsPersistConfig = {
  key: STATE_MODULES.COINS,
  storage: AsyncStorage,
  blacklist: [STATE_MODULES.COIN_DETAIL],
};

const rootReducer = combineReducers({
  [STATE_MODULES.AUTH]: authReducer,
  [STATE_MODULES.COINS]: persistReducer(coinsPersistConfig, coinsReducer),
});

const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedRootReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
    middlewares.push(coinListListener.middleware);
    middlewares.push(coinDetailListener.middleware);
    return middlewares;
  },
});

const persistor = persistStore(store);

export {store, persistor};
