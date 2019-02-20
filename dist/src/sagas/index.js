"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const watcher_1 = require("./watcher");
// Here, we register our watcher saga(s) and export as a single generator 
// function (startForeman) as our root Saga.
function* rootSaga() {
    yield effects_1.fork(watcher_1.default);
}
exports.default = rootSaga;
//# sourceMappingURL=index.js.map