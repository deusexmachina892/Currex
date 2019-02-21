import { combineReducers } from 'redux';
import { exchangeRateReducer } from './exchangeRateReducer';
import { configReducer } from './configReducer';

export default combineReducers({
  config: configReducer,
  exchangeRate: exchangeRateReducer
});
