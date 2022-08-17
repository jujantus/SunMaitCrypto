import {createListenerMiddleware} from '@reduxjs/toolkit';
import {lessThanTenMinutes, lessThanTwoMinutes} from '../common/utils';
import {logIn} from './auth';
import {setActiveId} from './coins/coinDetail';
import {getCoinDetailById, getCoinsList} from './coins/thunks';

const coinListListener = createListenerMiddleware();

const coinDetailListener = createListenerMiddleware();

let timeout;

coinListListener.startListening({
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

coinDetailListener.startListening({
  actionCreator: setActiveId,
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState();
    listenerApi.dispatch(getCoinDetailById(state.coins?.detail?.activeId));
  },
});

coinDetailListener.startListening({
  actionCreator: getCoinDetailById.fulfilled,
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState();
    if (
      state.coins?.detail?.numberOfRequests > 4 ||
      !state.coins?.detail?.activeId
    ) {
      return coinDetailListener.clearListeners();
    }
    timeout = setTimeout(() => {
      listenerApi.dispatch(getCoinDetailById(state.coins?.detail?.activeId));
      clearTimeout(timeout);
    }, 30000);
  },
});

export {coinDetailListener, coinListListener};
