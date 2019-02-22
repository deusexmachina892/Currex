import axios from 'axios';
import { API_KEY } from '../constants/apiKey';



/**
 * Load initial Config at App start
 */

export const loadConfig = () => {
    const INITIAL_DATA_ENDPOINT = '/config';
    return axios.get(INITIAL_DATA_ENDPOINT)
            .then(res => res.data);
}

/**
 * Update Config while app is running
 */
export const updateConfig = () => {

}

/**
 * 
* Description [Access Shutterstock search endpoint for short videos]
* @params { String } searchQuery
* @return { Array } 
*/
export const getExchangeRates = async (payload) => {
    const { base, currencies } = payload;
    const currencyString = Object.keys(currencies).filter(currency => currency !== 'USD').join(',');
    const CURREX_API_ENDPOINT = `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currencyString}`;
    //Make request
    return axios.get(CURREX_API_ENDPOINT)
    .then((res) => res.data);
};