import { takeLatest } from 'redux-saga/effects';
import { getCurrencyRateSaga } from './currencySaga';
import { GET_CURRENCY_DATA_REQUEST } from '../constants/actionTypes';

// Watches for SEARCH_MEDIA_REQUEST action type asynchronously
export default function* watchGetCurrencyData() {
  yield takeLatest(GET_CURRENCY_DATA_REQUEST, getCurrencyRateSaga);
}