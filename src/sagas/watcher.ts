import { takeLatest } from 'redux-saga/effects';
import { loadConfigSaga } from './configSaga';
import { getExchangeRateSaga } from './exchangeSaga';
import { LOAD_CONFIG_REQUEST, GET_EXCHANGE_RATE_REQUEST } from '../constants/actionTypes';


export function* watchLoadConfig() {
  yield takeLatest(LOAD_CONFIG_REQUEST, loadConfigSaga);
}

export function* watchGetExchangeRate() {
  yield takeLatest(GET_EXCHANGE_RATE_REQUEST, getExchangeRateSaga);
}