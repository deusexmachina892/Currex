import { all, put, call } from 'redux-saga/effects';
import { loadConfig } from '../Api/api';
import { LOAD_CONFIG_SUCCESS, LOAD_CONFIG_ERROR } from '../constants/actionTypes';


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

