import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchCoinDetailById, fetchCoinsList} from '../../api/utils';
import {COINS_ACTIONS, STATE_MODULES} from '../constants';

export const getCoinsList = createAsyncThunk(
  `${STATE_MODULES.COIN_LIST}/${COINS_ACTIONS.GET_COINS_LIST}`,
  async (_, thunkAPI) => {
    try {
      const coinsList = await fetchCoinsList();
      return coinsList;
    } catch (error) {
      console.error(error);
    }
  },
);

export const getCoinDetailById = createAsyncThunk(
  `${STATE_MODULES.COIN_DETAIL}/${COINS_ACTIONS.GET_COIN_DETAIL}`,
  async (id, thunkAPI) => {
    try {
      const coinDetail = await fetchCoinDetailById(id);
      return coinDetail;
    } catch (error) {
      console.error(error);
    }
  },
);
