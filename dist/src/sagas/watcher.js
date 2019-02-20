"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const currencySaga_1 = require("./currencySaga");
const actionTypes_1 = require("../constants/actionTypes");
// Watches for SEARCH_MEDIA_REQUEST action type asynchronously
function* watchGetCurrencyData() {
    yield effects_1.takeLatest(actionTypes_1.GET_CURRENCY_DATA_REQUEST, currencySaga_1.getCurrencyRateSaga);
}
exports.default = watchGetCurrencyData;
//# sourceMappingURL=watcher.js.map