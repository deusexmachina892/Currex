import { action } from 'typesafe-actions';
import { LOAD_CONFIG_REQUEST, GET_EXCHANGE_RATE_REQUEST } from '../constants/actionTypes';

export const getExchangeRates = (payload) => {
    return action(GET_EXCHANGE_RATE_REQUEST, payload);
}

export const loadConfig  = () => {
    return action(LOAD_CONFIG_REQUEST);
}