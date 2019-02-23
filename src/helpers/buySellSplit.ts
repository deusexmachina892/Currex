import mapValues from 'lodash.mapvalues';
export const buySellSplit = (rates, margin) => {
    if(typeof(rates) === 'object'){
        return mapValues(rates, value => ({ fetched: value, buy: (value * (1+ (margin/100))), sell: ( value * (1-(margin/100))) }));
    }
    return rates;
}
