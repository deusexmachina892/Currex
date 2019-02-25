
import { Reducer } from 'redux';
import { 
    LOAD_CURRENCIES_REQUEST,
    LOAD_CURRENCIES_SUCCESS,
    LOAD_CURRENCIES_ERROR,
    UPDATE_CURRENCY_STOCK_REQUEST, 
    UPDATE_CURRENCY_STOCK_SUCCESS, 
    UPDATE_CURRENCY_STOCK_ERROR
} from '../constants/actionTypes';

// Type-safe initialState!
const initialState = {
  errors: undefined,
  loading: false
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CURRENCIES_REQUEST: 
      return { ...state, loading: true }

    case LOAD_CURRENCIES_SUCCESS: 
      return { ...state, loading: false,  data: action.payload, timestamp: Date.now() }
    
    case LOAD_CURRENCIES_ERROR: 
      return { ...state, loading: false, errors: action.payload, timestamp: Date.now() }
    case UPDATE_CURRENCY_STOCK_REQUEST: 
      return { ...state, loading: true }

    case UPDATE_CURRENCY_STOCK_SUCCESS: 
      return { ...state, loading: false,  data: action.payload, errors: undefined, timestamp: Date.now() }
    
    case UPDATE_CURRENCY_STOCK_ERROR: 
      return { ...state, loading: false, errors: action.payload, timestamp: Date.now() }
    
    default: 
      return state
    
  }
}


// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as currencyReducer };