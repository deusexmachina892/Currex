import { all, put, call } from 'redux-saga/effects';
import { getCurrencyData } from '../Api/api';
import { GET_CURRENCY_DATA_SUCCESS, GET_CURRENCY_DATA_ERROR } from '../constants/actionTypes';


// Responsible for searching media library, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.

export function* getCurrencyRateSaga(){
    try {
        const currencyData = yield call(getCurrencyData);
      yield put({ type: GET_CURRENCY_DATA_SUCCESS, payload: currencyData})
      
    } catch(error){
        yield[
            put({ type: GET_CURRENCY_DATA_ERROR, payload: error})
        ]
    }
}

