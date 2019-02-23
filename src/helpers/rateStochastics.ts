import mapValues from 'lodash.mapvalues';
export const rateStochastics = (data) => {
    if(typeof(data) === 'object') {
        const operation = Math.random() < 0.5? '+':'-';
        const factor = Math.random()*(0.02 - 0.01)*0.01;
        const factOperation = operation === '+'? (1+factor):(1-factor);
        return mapValues(data, val => val*factOperation);
    }
    return data;
}