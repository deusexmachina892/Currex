import { all, put, call } from 'redux-saga/effects';
import { getExchangeRates } from '../Api/api';
import { GET_EXCHANGE_RATE_SUCCESS, GET_EXCHANGE_RATE_ERROR } from '../constants/actionTypes';


// Responsible for searching media library, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.

export function* getExchangeRateSaga(action){
    try {
        const exchangeRates = yield call(getExchangeRates, action.payload);
      yield put({ type: GET_EXCHANGE_RATE_SUCCESS, payload: exchangeRates })
      
    } catch(error){
        yield[
            put({ type: GET_EXCHANGE_RATE_ERROR, payload: error})
        ]
    }
}

