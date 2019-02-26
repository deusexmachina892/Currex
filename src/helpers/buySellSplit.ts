import mapValues from 'lodash.mapvalues';
// splits rate into buy and sell as per margin
export const buySellSplit = (rates: object, margin: number): object => {
    if(typeof(rates) === 'object'){
        return mapValues(rates, value => ({ fetched: value, buy: (value * (1+ (margin/100))), sell: ( value * (1-(margin/100))) }));
    }
    return rates;
}
