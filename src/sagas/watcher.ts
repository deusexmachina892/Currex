import { takeLatest, takeEvery } from 'redux-saga/effects';
import { loadConfigSaga, updateConfigSaga } from './configSaga';
import { orchestrateGetExchangeRateSaga, getExchangeRateSaga } from './exchangeSaga';
import { loadCurrenciesSaga, updateCurrencyStockSaga } from './currencySaga';
import { 
  LOAD_CONFIG_REQUEST, 
  LOAD_CURRENCIES_REQUEST,
  ORCHESTRATE_GET_EXCHANGE_RATE_REQUEST,
  GET_EXCHANGE_RATE_REQUEST, 
  UPDATE_CONFIG_REQUEST, 
  UPDATE_CURRENCY_STOCK_REQUEST 
  } from '../constants/actionTypes';


export function* watchLoadConfig() {
  yield takeLatest(LOAD_CONFIG_REQUEST, loadConfigSaga);
}

export function* watchLoadCurrencies(){
  yield takeLatest(LOAD_CURRENCIES_REQUEST, loadCurrenciesSaga);
}

export function* watchUpdateConfig(){
  yield takeLatest(UPDATE_CONFIG_REQUEST, updateConfigSaga);
}

export function* watchGetExchangeRate() {
  yield takeEvery(GET_EXCHANGE_RATE_REQUEST, getExchangeRateSaga);
}

export function* watchOrchestrateGetExchangeRate() {
  yield takeEvery(ORCHESTRATE_GET_EXCHANGE_RATE_REQUEST, orchestrateGetExchangeRateSaga);
}

export function* watchCurrencyStockUpdate(){
  yield takeEvery(UPDATE_CURRENCY_STOCK_REQUEST, updateCurrencyStockSaga);
}
