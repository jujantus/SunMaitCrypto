import {combineReducers} from '@reduxjs/toolkit';

import {STATE_MODULES} from '../constants';

import coinList from './coinList';
import coinDetail from './coinDetail';

const coins = combineReducers({
  [STATE_MODULES.COIN_LIST]: coinList,
  [STATE_MODULES.COIN_DETAIL]: coinDetail,
});

export default coins;
