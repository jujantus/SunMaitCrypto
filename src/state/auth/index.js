import {createSlice} from '@reduxjs/toolkit';
import {STATE_MODULES} from '../constants';

const initialState = {
  userName: '',
};

export const authSlice = createSlice({
  name: STATE_MODULES.AUTH,
  initialState,
  reducers: {
    logIn: (state, action) => {
      return {userName: action.payload};
    },
    logOut: () => initialState,
  },
});

export const {logIn, logOut} = authSlice.actions;

export default authSlice.reducer;
