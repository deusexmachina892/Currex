"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const api_1 = require("../Api/api");
const actionTypes_1 = require("../constants/actionTypes");
// Responsible for searching media library, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.
function* getCurrencyRateSaga() {
    try {
        const currencyData = yield effects_1.call(api_1.getCurrencyData);
        yield effects_1.put({ type: actionTypes_1.GET_CURRENCY_DATA_SUCCESS, payload: currencyData });
    }
    catch (error) {
        yield [
            effects_1.put({ type: actionTypes_1.GET_CURRENCY_DATA_ERROR, payload: error })
        ];
    }
}
exports.getCurrencyRateSaga = getCurrencyRateSaga;
//# sourceMappingURL=currencySaga.js.map