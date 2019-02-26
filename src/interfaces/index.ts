export interface ConfigProps{
    loading: boolean,
    base: string,
    margin: any,
    commissionPct: any,
    surcharge: any,
    minCommission: any,
    refresh_rate: any,
    timestamp: TimeRanges,
    errors?: string,
    success?:boolean
};


export interface CurrencyProps{
    loading: boolean,
    data: {[x: string]: { [x: string]: any}},
    errors?: string
};

export interface ExchangeRateProps{
    rates: {[x: string]: { [x:string]: number, }},
    loading: boolean,
    timestamp: TimeRanges
    errors?: string,
};