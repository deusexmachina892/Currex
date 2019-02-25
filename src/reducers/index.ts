import { combineReducers } from 'redux';
import { exchangeRateReducer } from './exchangeRateReducer';
import { configReducer } from './configReducer';
import { currencyReducer } from './currencyReducer';

export default combineReducers({
  config: configReducer,
  currencies: currencyReducer,
  exchangeRate: exchangeRateReducer
});
