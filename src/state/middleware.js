import {createListenerMiddleware} from '@reduxjs/toolkit';
import {lessThanTenMinutes, lessThanTwoMinutes} from '../common/utils';
import {logIn} from './auth';
import {setActiveId} from './coins/coinDetail';
import {getCoinDetailById, getCoinsList} from './coins/thunks';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: logIn,
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState();
    if (
      !state.coins?.list?.loading &&
      state.coins?.list?.lastRequestTimestamp &&
      lessThanTenMinutes(state.coins.list.lastRequestTimestamp)
    ) {
      return;
    }
    listenerApi.dispatch(getCoinsList());
  },
});

listenerMiddleware.startListening({
  actionCreator: setActiveId,
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState();
    if (
      state.coins?.detail?.lastRequestTimestamp &&
      lessThanTwoMinutes(state.coins.list.lastRequestTimestamp)
    ) {
      return;
    }
    listenerApi.dispatch(getCoinDetailById(state.coins?.detail?.activeId));
  },
});

listenerMiddleware.startListening({
  actionCreator: getCoinDetailById.fulfilled,
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState();
    if (state.coins?.detail?.numberOfRequests > 4) {
      return;
    }
    setTimeout(() => {
      listenerApi.dispatch(getCoinDetailById(state.coins?.detail?.activeId));
    }, 30000);
  },
});

export default listenerMiddleware;
