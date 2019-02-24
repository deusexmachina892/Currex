
import { Reducer } from 'redux';
import isEqual from 'lodash.isequal';
import { GET_EXCHANGE_RATE_REQUEST, GET_EXCHANGE_RATE_SUCCESS, GET_EXCHANGE_RATE_ERROR } from '../constants/actionTypes';
import { rateStochastics } from '../helpers/rateStochastics';
import { buySellSplit } from '../helpers/buySellSplit';

// Type-safe initialState!
const initialState = {
  rates: {},
  errors: undefined,
  loading: false
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXCHANGE_RATE_REQUEST: 
      return { ...state, loading: true }

    case GET_EXCHANGE_RATE_SUCCESS: 
      const { rates, margin } = action.payload;
      const ratesOfCurrencies = rates.rates;
      const ratesStochastics  = isEqual(state.rates, ratesOfCurrencies)?ratesOfCurrencies:rateStochastics(ratesOfCurrencies);
      const ratesForStore = buySellSplit(ratesStochastics, margin)
      return { ...state, loading: false, rates: ratesForStore, timestamp: Date.now() }
    
    case GET_EXCHANGE_RATE_ERROR: 
      return { ...state, loading: false, errors: action.payload, timestamp: Date.now() }
    
    default: 
      return state
    
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as exchangeRateReducer };