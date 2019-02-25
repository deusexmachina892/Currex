import { call, put } from 'redux-saga/effects';
import isEmpty from 'lodash.isempty';
import includes from 'lodash.includes';
import { loadCurrencies } from '../Api/api';
import { 
    LOAD_CURRENCIES_SUCCESS,
    LOAD_CURRENCIES_ERROR,
    UPDATE_CURRENCY_STOCK_SUCCESS, 
    UPDATE_CURRENCY_STOCK_ERROR
    } from '../constants/actionTypes';


// Responsible for searching media library, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.

export function* loadCurrenciesSaga(){
    try{
        const currencies = yield call(loadCurrencies);
        yield put({ type: LOAD_CURRENCIES_SUCCESS, payload: currencies.currencies })
    } catch(error){
        yield put({ type: LOAD_CURRENCIES_ERROR, payload: error})
    }
}

export function* updateCurrencyStockSaga(action){
    try {
        const { payload } = action;
        const { base, currencies, currency, currencyAmount, type, value } = payload;
        if(!isEmpty(payload)){
            if(Object.keys(currencies).length > 0 && base && includes(Object.keys(currencies), base, 0, 0)){
                // updates

                // check whether value is less than stock value for base currency
                if ( type==='Sell' && Number(value) > currencies[base].stock ) {
                    const error = `Sorry! We don\'t have the requested amount of ${base} in stock`;
                    throw new Error(error);
                }
                // check whethter currency amount is less than stock value for current currency
                if ( type==='Buy' && Number(currencyAmount) > currencies[currency].stock) {
                    const error = `Sorry! We don\'t have the requested amount of ${currency} in stock`;
                    throw new Error(error);
                }
                // check if buy or sell
                if (type === 'Buy'){
                    // if buy, then increase base and decrese current
                    currencies[base].stock = currencies[base].stock + Number(value);
                    currencies[currency].stock = currencies[currency].stock - Number(currencyAmount);
                } else {
                    // if sell, decrease base and increase current
                    currencies[base].stock = currencies[base].stock - Number(value);
                    currencies[currency].stock = currencies[currency].stock + Number(currencyAmount);
                }
            }
        }
        
       yield put({ type: UPDATE_CURRENCY_STOCK_SUCCESS, payload: currencies });
      
    } catch(error){
        yield put({ type: UPDATE_CURRENCY_STOCK_ERROR, payload: error.message})
    }
}

