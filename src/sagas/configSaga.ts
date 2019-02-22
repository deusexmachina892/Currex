import { all, put, call } from 'redux-saga/effects';
import pick from 'lodash.pick';
import mapValues from 'lodash.mapvalues';
import method from 'lodash.method';
import { loadConfig, updateConfig } from '../Api/api';
import { LOAD_CONFIG_SUCCESS, LOAD_CONFIG_ERROR, UPDATE_CONFIG_SUCCESS, UPDATE_CONFIG_ERROR } from '../constants/actionTypes';


// Responsible for searching media library, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.

export function* loadConfigSaga(){
    try {
      const config = yield call(loadConfig);
      yield put({ type: LOAD_CONFIG_SUCCESS, payload: config })
      
    } catch(error){
        yield[
            put({ type: LOAD_CONFIG_ERROR, payload: error})
        ]
    }
}

export function* updateConfigSaga(action){
    try {
     const { payload } = action;
      let config = pick(payload, Object.keys(payload).filter(item => typeof(payload[item]) === 'string')
      );
      config = mapValues(config, (value) => Number(value));
      yield put({ type: UPDATE_CONFIG_SUCCESS, payload: config })
      
    } catch(error){
        yield[
            put({ type: UPDATE_CONFIG_ERROR, payload: error})
        ]
    }
}


