import { all, fork } from 'redux-saga/effects';
import { watchLoadConfig, watchLoadCurrencies, watchGetExchangeRate, watchUpdateConfig, watchCurrencyStockUpdate } from './watcher';

// Here, we register our watcher saga(s) and export as a single generator 
// function (startForeman) as our root Saga.
export default function* rootSaga() {
  yield all([
    fork(watchLoadConfig),
    fork(watchLoadCurrencies),
    fork(watchUpdateConfig),
    fork(watchGetExchangeRate),
    fork(watchCurrencyStockUpdate)
  ]);
}