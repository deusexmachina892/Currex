import { action } from 'typesafe-actions';
import { 
    LOAD_CONFIG_REQUEST,
    LOAD_CURRENCIES_REQUEST,
    GET_EXCHANGE_RATE_REQUEST, 
    UPDATE_CONFIG_REQUEST, 
    UPDATE_CURRENCY_STOCK_REQUEST
   } from '../constants/actionTypes';

export const getExchangeRates = (payload) => {
    return action(GET_EXCHANGE_RATE_REQUEST, payload);
}

export const loadConfig  = () => {
    return action(LOAD_CONFIG_REQUEST);
}

export const loadCurrencies  = () => {
    return action(LOAD_CURRENCIES_REQUEST);
}

export const updateConfig = (payload) => {
    return action(UPDATE_CONFIG_REQUEST, payload);
}

export const updateCurrencyStock = (payload) => {
    return action(UPDATE_CURRENCY_STOCK_REQUEST, payload);
}