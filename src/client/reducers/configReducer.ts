import { Reducer } from 'redux';
import { 
  LOAD_CONFIG_REQUEST, 
  LOAD_CONFIG_SUCCESS, 
  LOAD_CONFIG_ERROR,
  UPDATE_CONFIG_REQUEST,
  UPDATE_CONFIG_SUCCESS,
  UPDATE_CONFIG_ERROR
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

    case LOAD_CONFIG_REQUEST: 
      return { ...state, loading: true }

    case LOAD_CONFIG_SUCCESS: 
      return { ...state, loading: false, ...action.payload, timestamp: Date.now() }

    case LOAD_CONFIG_ERROR: 
      return { ...state, loading: false, errors: action.payload, timestamp: Date.now() }
  
    case UPDATE_CONFIG_REQUEST:
      return { ...state, loading: true }
    
    case UPDATE_CONFIG_SUCCESS: 
      return { ...state, loading: false, ...action.payload, timestamp: Date.now() }
    
    case UPDATE_CONFIG_ERROR:
      return { ...state, loading: false, errors: action.payload, timestamp: Date.now() }
    
    default: 
      return state
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as configReducer };