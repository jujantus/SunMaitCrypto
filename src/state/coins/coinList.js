import {createSlice} from '@reduxjs/toolkit';
import {STATE_MODULES} from '../constants';
import {getCoinsList} from './thunks';

const initialState = {
  data: [],
  loading: false,
  error: null,
  lastRequestTimestamp: null,
};

const coinListSlice = createSlice({
  name: STATE_MODULES.COIN_LIST,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCoinsList.pending, (state, action) => {
        if (state.loading) {
          return;
        }
        state.loading = true;
      })
      .addCase(getCoinsList.rejected, (state, action) => {
        if (!state.loading) {
          return;
        }
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getCoinsList.fulfilled, (state, action) => {
        if (!state.loading) {
          return;
        }
        state.loading = false;
        state.data = action.payload.data;
        state.lastRequestTimestamp = Date.now();
      });
  },
});

export default coinListSlice.reducer;
