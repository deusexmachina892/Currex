import { takeLatest, takeEvery } from 'redux-saga/effects';
import { loadConfigSaga, updateConfigSaga } from './configSaga';
import { getExchangeRateSaga } from './exchangeSaga';
import { LOAD_CONFIG_REQUEST, GET_EXCHANGE_RATE_REQUEST, UPDATE_CONFIG_REQUEST } from '../constants/actionTypes';


export function* watchLoadConfig() {
  yield takeLatest(LOAD_CONFIG_REQUEST, loadConfigSaga);
}


export function* watchUpdateConfig(){
  yield takeLatest(UPDATE_CONFIG_REQUEST, updateConfigSaga);
}

export function* watchGetExchangeRate() {
  yield takeLatest(GET_EXCHANGE_RATE_REQUEST, getExchangeRateSaga);
}
