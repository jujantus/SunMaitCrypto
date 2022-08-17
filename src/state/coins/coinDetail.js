import {createSlice} from '@reduxjs/toolkit';
import {STATE_MODULES} from '../constants';
import {getCoinDetailById} from './thunks';

const initialState = {
  detail: null,
  loading: false,
  error: null,
  lastRequestTimestamp: null,
  activeId: null,
  numberOfRequests: 0,
};

export const coinDetailSlice = createSlice({
  name: STATE_MODULES.COIN_DETAIL,
  initialState,
  reducers: {
    setActiveId: (state, action) => {
      return {...initialState, activeId: action.payload};
    },
    clearId: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getCoinDetailById.pending, (state, action) => {
        if (state.loading) {
          return;
        }
        state.loading = true;
      })
      .addCase(getCoinDetailById.rejected, (state, action) => {
        if (!state.loading) {
          return;
        }
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getCoinDetailById.fulfilled, (state, action) => {
        if (!state.loading) {
          return;
        }
        state.loading = false;
        state.detail = action.payload[0];
        state.numberOfRequests = state.numberOfRequests + 1;
        state.lastRequestTimestamp = Date.now();
      });
  },
});

export const {setActiveId, clearId} = coinDetailSlice.actions;

export default coinDetailSlice.reducer;
