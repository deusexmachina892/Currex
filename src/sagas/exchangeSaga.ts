import { all, put, call, takeLatest } from 'redux-saga/effects';
import { getExchangeRatesFromApi } from '../Api/api';

import { GET_EXCHANGE_RATE_SUCCESS, GET_EXCHANGE_RATE_ERROR, UPDATE_CONFIG_SUCCESS, GET_EXCHANGE_RATE_REQUEST } from '../constants/actionTypes';


// Responsible for searching media library, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.

export function* orchestrateGetExchangeRateSaga(action){
    try{
        if(action.payload.refresh_rate > 0){
            var timer = setInterval(() => {
               var { base, currencies, margin, getExchangeRates, updateRateInfo } = action.payload;
                getExchangeRates({ base, currencies, margin });
             }, action.payload.refresh_rate);
       }

        const timerUpdate = yield takeLatest(UPDATE_CONFIG_SUCCESS, (actionFromUpdateConfig)=>{
            // timer disabled if refresh rate is 0
            if(actionFromUpdateConfig['payload'].refresh_rate || Number(actionFromUpdateConfig['payload'].refresh_rate) === 0){
                clearInterval(timer);
            }
        })
    } catch (error){
        yield put({ type: GET_EXCHANGE_RATE_ERROR, payload: error.message});
    }
}

export function* getExchangeRateSaga(action){
    try {
       const { margin } = action.payload;
       const exchangeRates = yield call(getExchangeRatesFromApi, action.payload);
      yield put({ type: GET_EXCHANGE_RATE_SUCCESS, payload: { rates: exchangeRates, margin } });
    } catch(error){
        yield put({ type: GET_EXCHANGE_RATE_ERROR, payload: error.message});  
    }
}

