import {createListenerMiddleware} from '@reduxjs/toolkit';
import {lessThanTenMinutes} from '../common/utils';
import {logIn} from './auth';
import {clearId, setActiveId} from './coins/coinDetail';
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
  actionCreator: clearId,
  effect: async () => {
    clearTimeout(timeout);
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
      return;
    }
    timeout = setTimeout(() => {
      listenerApi.dispatch(getCoinDetailById(state.coins?.detail?.activeId));
      clearTimeout(timeout);
    }, 30000);
  },
});

export {coinDetailListener, coinListListener};
