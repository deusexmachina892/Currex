import { Store, createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { History } from 'history';
import createSagaMiddleware from 'redux-saga';

// Import the state interface and our combined reducers/sagas.
import rootReducer from '../reducers';
import rootSaga from '../sagas';

export default function configureStore(
    history: History,
    initialState = {}
  ): Store {
    // create the composing function for our middlewares
    const composeEnhancers = composeWithDevTools({})
    // create the redux-saga middleware
    const sagaMiddleware = createSagaMiddleware()
  
    // We'll create our store with the combined reducers/sagas, and the initial Redux state that
    // we'll be passing from our entry point.
    const store = createStore(
     rootReducer,
      initialState,
      composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
    )
  
    // Don't forget to run the root saga, and return the store object.
    sagaMiddleware.run(rootSaga);
    return store;
  }

