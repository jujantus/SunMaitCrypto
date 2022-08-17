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
import listenerMiddleware from './middleware';

const rootReducer = combineReducers({
  [STATE_MODULES.AUTH]: authReducer,
  [STATE_MODULES.COINS]: coinsReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
    middlewares.push(listenerMiddleware.middleware);
    return middlewares;
  },
});

const persistor = persistStore(store);

export {store, persistor};
